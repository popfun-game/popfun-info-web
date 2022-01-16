<!-- 分类table -->
<template>
    <section>
        <ul class="menu flex-row scroller">
            <li
                v-for="item in state.menu_list"
                :key="item.id"
                class="menu-item font-bold fz12 ts mr12 cursor-pointer"
                :class="{'is-active': item.id === active}"
            >
                {{ item.label }}
            </li>
        </ul>

        <c-table
            :columns="state.columns"
            :data="state.data"
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
import cTable from './Table';

defineProps({
    active: {
        type: String,
        required: true,
    },
});

const { t } = useI18n();

const state = reactive({
    menu_list: [
        { id: 'token', label: t('menu_token') },
        { id: 'game', label: t('menu_game') },
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
            label: t('th_vol'),
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
    data: [
        {
            coin: 'Bitcoin', label: 'bit', market: '$28,047,254,195', currency: 'BTC', '1h': '-0.4', '24h': '12', price: '21312312313', vol: '123123',
        },
        {
            coin: 'Bitcoin', label: 'bit', market: '$28,047,254,195', currency: 'BTC', '1h': '-0.4', '24h': '12',
        },
        {
            coin: 'Bitcoin', label: 'bit', market: '$28,047,254,195', currency: 'BTC', '1h': '-0.4', '24h': '12',
        },
        {
            coin: 'Bitcoin', label: 'bit', market: '$28,047,254,195', currency: 'BTC', '1h': '-0.4', '24h': '12',
        },
    ],
    page: 1,
    pages: {
        current: 1,
        size: 100,
        total: 10000,
    },
});

const methods = {
    // 获取列表
    getList() {

    },
    // 每页显示条目个数修改
    sizeChange(val) {
        state.pages.size = val;
    },
    // 页码修改
    pageChange(page) {
        if (page === state.page) return;
        state.page = page;

        methods.getList();
    },
};
</script>
<style lang="scss" scoped>
.menu {
    margin-bottom: 34px;

    &-item {
        line-height: 22px;
        padding: 5px 10px;
        color: var(--text-color-1);
        border-radius: 4px;

        &:hover,
        &.is-active {
            background-color: var(--main-color);
            color: #fff;
        }
    }
}

.pagination {
    padding-top: 28px;
}

</style>
