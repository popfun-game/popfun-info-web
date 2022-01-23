<!-- 分类table -->
<template>
    <section>
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
            @onRetry="methods.getList"
        />

        <div class="pagination flex-row-space-between flex-items-center scroller">
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
import { reactive, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import cTable from '@/components/Table';
import tabs from '@/components/Tabs';
import { api } from '@/config/api';
import { ElMessage } from 'element-plus';

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
        { id: 'Gaming', label: t('menu_game') },
        { id: 'token', label: t('menu_token') },
    ],
    columns: [
        {
            prop: '',
            label: '#',
            width: 50,
            render(h, { $index }) {
                return $index + 1;
            },
        },
        {
            prop: 'coin',
            label: t('th_coin'),
            'min-width': '140px',
            render(h, { row }) {
                return (
                    <router-link class="flex-row flex-items-center" to={replacePath(`/currency/${row.currency}/`)}>
                        <img
                            src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                            alt={row.currency}
                            width="24"
                            height="24"
                        />
                        <span class="mr8 ml4" style="color: var(--text-color-1)">{ row.coin }</span>
                        <span class="text-uppercase color-light">{ row.currency }</span>
                    </router-link>
                );
            },
        },
        {
            prop: 'price',
            align: 'right',
            label: t('th_price'),
        },
        {
            prop: '1h',
            align: 'right',
            label: t('th_1h'),
            render(h, { row }) {
                return (
                    <span class={row['1h'] > 0 ? 'color-up' : 'color-down'}>
                        { row['1h'] > 0 ? `+${row['1h']}` : row['1h'] }%
                    </span>
                );
            },
        },
        {
            prop: '24h',
            align: 'right',
            label: t('th_24h'),
            render(h, { row }) {
                return (
                    <span class={row['24h'] > 0 ? 'color-up' : 'color-down'}>
                        { row['24h'] > 0 ? `+${row['24h']}` : row['24h'] }%
                    </span>
                );
            },
        },
        {
            prop: '7d',
            align: 'right',
            label: t('th_7d'),
            render(h, { row }) {
                return (
                    <span class={row['1h'] > 0 ? 'color-up' : 'color-down'}>
                        { row['1h'] > 0 ? `+${row['1h']}` : row['1h'] }%
                    </span>
                );
            },
        },
        {
            prop: 'vol',
            align: 'right',
            width: 170,
            label: t('th_vol24'),
        },
        {
            prop: 'market',
            align: 'right',
            width: 170,
            label: t('th_mkt_cap'),
            render(h, { row }) {
                return (
                    <div>
                        <p class="text-ellipsis">{ row.market }</p>
                        <p class="color-middle text-ellipsis fz12">
                            { row.market } {row.currency}
                        </p>
                    </div>
                );
            },
        },
        {
            prop: 'last7d',
            align: 'right',
            label: t('th_last_7d'),
        },
    ],
    data: [],
    page: 1,
    pages: {
        current: 1,
        size: 100,
        total: 1,
    },
});

const methods = {
    // 获取列表
    getList() {
        state.loading = true;

        const params = {
            page: state.page,
            limit: state.pages.size,
            cat: state.tab === 'token' ? '' : state.tab,
        };

        api.getCoinRank(params).then((res) => {
            state.loading = false;

            if (res.success) {
                state.pages.current = state.page;
                state.data = res.result;
                state.pages.total = res?.extra?.stats?.fullCount ?? res.result.length;
            } else {
                ElMessage.error(res.message);
            }
        });
    },
    // 切换tab
    changeTab() {

    },
    // 每页显示条目个数修改
    sizeChange(val) {
        state.pages.size = val;
        state.page = 1;
        methods.getList(1);
    },
    // 页码修改
    pageChange(page) {
        if (page === state.page) return;
        state.page = page;

        methods.getList();
    },
};

methods.getList();
</script>
<style lang="scss" scoped>
.menu {
    margin-bottom: 34px;
}

.pagination {
    padding-top: 28px;
}

</style>
