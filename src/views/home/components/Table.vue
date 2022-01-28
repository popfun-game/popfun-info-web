<!-- 分类table -->
<template>
    <section class="wrapper">
        <div class="menu flex-row flex-items-center">
            <tabs
                v-model="state.tab"
                :list="state.menu_list"
                @onChange="methods.changeTab"
            />
        </div>

        <c-table
            v-loading="state.loading"
            :columns="state.columns"
            :data="state.data"
            :element-loading-text="t('list_loading')"
            @onRetry="methods.getList()"
        />

        <div
            v-if="state.data.length"
            class="pagination flex-row-space-between flex-items-center scroller"
        >
            {{ t('page_info', { size: state.pages.size, total: state.pages.total }) }}

            <el-pagination
                :current-page="state.page"
                background
                hide-on-single-page
                :page-size="state.pages.size"
                :page-sizes="[100, 50, 20]"
                :total="state.pages.total"
                layout="prev, pager, next, sizes, jumper"
                @size-change="methods.sizeChange"
                @current-change="methods.pageChange"
            />
        </div>
    </section>
</template>
<script setup>
import { reactive, defineProps, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import cTable from '@/components/Table';
import tabs from '@/components/Tabs';
import { api } from '@/config/api';
import { ElMessage } from 'element-plus';
import {
    toFormat,
    toFixed,
    div,
    lt,
} from '@/utils/number';
import ChartLine from '@/components/ChartLine';
import autoImg from '@/components/AutoImg';
import { getPrecision } from '@/utils/tool';

const props = defineProps({
    active: {
        type: String,
        required: true,
    },
});

const { t } = useI18n();
const state = reactive({
    tab: props.active,
    loading: false,
    menu_list: [
        { id: 'gaming', label: t('menu_game') },
        { id: 'token', label: t('menu_token') },
    ],
    columns: [
        {
            prop: '',
            label: '#',
            width: 50,
            render(h, { $index }) {
                return state.pages.size * (state.pages.current - 1) + $index + 1;
            },
        },
        {
            prop: 'name',
            label: t('th_coin'),
            'min-width': '200px',
            render(h, { row }) {
                return (
                    <router-link class="flex-row flex-items-center" style="display: inline-flex;" to={replacePath(`/currency/${row.id}/`)}>
                        <autoImg
                            src={row.image}
                            alt={`${row.name} (${row.symbol?.toUpperCase()})`}
                            small
                            width="24px"
                            height="24px"
                        />
                        <span class="mr8 ml4" style="color: var(--text-color-1)">{ row.name }</span>
                        <span class="text-uppercase color-light">{ row.symbol }</span>
                    </router-link>
                );
            },
        },
        {
            prop: 'current_price',
            align: 'right',
            label: t('th_price'),
            formatter(row) {
                return `$${toFormat(row.current_price, getPrecision(row.current_price))}`;
            },
        },
        {
            prop: 'price_change_percentage_1h_in_currency',
            align: 'right',
            width: 80,
            label: t('th_1h'),
            render(h, { row }) {
                const scale = toFixed(row.price_change_percentage_1h_in_currency, 2);
                return (
                    <span class={scale > 0 ? 'color-up' : 'color-down'}>
                        { scale > 0 ? `+${scale}` : scale }%
                    </span>
                );
            },
        },
        {
            prop: 'price_change_percentage_24h_in_currency',
            align: 'right',
            width: 80,
            label: t('th_24h'),
            render(h, { row }) {
                const scale = toFixed(row.price_change_percentage_24h_in_currency, 2);
                return (
                    <span class={scale > 0 ? 'color-up' : 'color-down'}>
                        { scale > 0 ? `+${scale}` : scale }%
                    </span>
                );
            },
        },
        {
            prop: 'price_change_percentage_7d_in_currency',
            align: 'right',
            width: 80,
            label: t('th_7d'),
            render(h, { row }) {
                const scale = toFixed(row.price_change_percentage_7d_in_currency, 2);
                return (
                    <span class={scale > 0 ? 'color-up' : 'color-down'}>
                        { scale > 0 ? `+${scale}` : scale }%
                    </span>
                );
            },
        },
        {
            prop: 'market_cap',
            align: 'right',
            width: 150,
            label: t('th_mkt_cap'),
            formatter(row) {
                return `$${toFormat(row.market_cap)}`;
            },
        },
        {
            prop: 'total_volume',
            align: 'right',
            width: 190,
            label: t('th_vol24'),
            render(h, { row }) {
                return (
                    <div>
                        <p class="text-ellipsis">${ toFormat(row.total_volume) }</p>
                        <p class="color-middle text-ellipsis fz12 text-uppercase">
                            { toFormat(div(row.total_volume, row.current_price), 2) } {row.symbol}
                        </p>
                    </div>
                );
            },
        },
        {
            prop: 'sparkline_in_7d',
            align: 'right',
            width: 140,
            label: t('th_last_7d'),
            render(h, { row }) {
                const color = lt(row.current_price, row.sparkline_in_7d?.price?.[0]) ? 'var(--color-down)' : 'var(--color-up)';

                return (<ChartLine
                    gradientColor={color}
                    lineColor={color}
                    list={row.sparkline_in_7d?.price}
                />);
            },
        },
    ],
    data: [],
    page: 1,
    pages: {
        current: 1,
        size: 20,
        total: 1,
    },
    timer: null,
});

const methods = {
    // 获取列表
    getList(isLoop) {
        if (!isLoop) state.loading = true;
        if (state.timer) clearTimeout(state.timer);

        const params = {
            page: state.page,
            limit: state.pages.size,
            cat: state.tab === 'token' ? '' : state.tab,
        };

        api.getCoinRank(params).then((res) => {
            if (params.cat === state.tab || (params.cat === '' && state.tab === 'token')) {
                state.loading = false;

                if (res.success) {
                    state.pages.current = state.page;
                    state.data = res.data?.result;
                    state.pages.total = res.data?.extra?.stats?.fullCount ?? res.data?.result.length;

                    if (res.data?.result.length) methods.loop();
                } else {
                    if (state.pages.current === 1 && !state.data.length) {
                        state.data = [];
                    }
                    ElMessage.error(res.message);
                }
            }
        });
    },
    // 切换tab
    changeTab() {
        state.pages.current = 1;
        state.page = 1;
        methods.getList();
    },
    // 每页显示条目个数修改
    sizeChange(val) {
        state.pages.size = val;
        state.page = 1;
        methods.getList();
    },
    // 页码修改
    pageChange(page) {
        if (page === state.page) return;
        state.page = page;

        methods.getList();
    },
    // 轮训
    loop() {
        state.timer = setTimeout(() => {
            methods.getList(true);
        }, 30000);
    },
};

methods.getList();

onBeforeUnmount(() => {
    clearTimeout(state.timer);
});
</script>
<style lang="scss" scoped>

.wrapper {
    overflow: initial;

    :deep(.el-table) {
        overflow: initial;

        .el-table__header-wrapper {
            position: sticky;
            top: 0;
            z-index: 1000;
        }
    }
}

.menu {
    margin-bottom: 34px;
}

.pagination {
    padding-top: 28px;
}

</style>
