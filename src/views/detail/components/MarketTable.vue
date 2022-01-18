<!-- 分类table -->
<template>
    <div class="title flex-row-space-between flex-items-center">
        <h3 class="flex-row flex-items-center font-bold fz22 lh22">
            <i class="title-mark mr6" />
            {{ t('market_title', { fullname: '币种全称' }) }}
        </h3>

        <router-link
            :to="replacePath(`/currency/${coin}/markets/`)"
            class="flex-row flex-items-center font-bold lh22"
        >
            {{ t('see_all_markets') }}
            <el-icon class="ml4">
                <arrow-right />
            </el-icon>
        </router-link>
    </div>

    <c-table
        :columns="state.columns"
        :data="state.data"
    />

    <div class="flex-row-center">
        <router-link
            to=""
            class="button flex-row-center flex-items-center font-bold"
        >
            {{ t('see_all_markets') }}
        </router-link>
    </div>
</template>
<script setup>
import { reactive, defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import cTable from '@/components/Table';
import { ArrowRight } from '@element-plus/icons-vue';
import confidenceTipDom from './ConfidenceTipDom';
import liquidityTipDom from './LiquidityTipDom';

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
            label: t('th_source'),
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
            label: t('th_pairs'),
        },
        {
            prop: 'price',
            align: 'right',
            label: t('th_price'),
        },
        {
            prop: '1h',
            align: 'right',
            label: t('th_depth'),
        },
        {
            prop: '24h',
            align: 'right',
            label: t('th_depth'),
        },
        {
            prop: '7d',
            align: 'right',
            label: t('th_vol'),
        },
        {
            prop: 'vol',
            align: 'right',
            width: 170,
            label: `${t('th_vol')}%`,
        },
        {
            prop: 'market',
            align: 'right',
            width: 170,
            renderHeader() {
                return (<confidenceTipDom />);
            },
            render() {
                return (
                    <span
                        class="tag"
                        {...{
                            class: 'tag-low',
                        }}
                    >
                        { t('tag_low') }
                    </span>
                );
            },
        },
        {
            prop: 'last7d',
            align: 'right',
            label: t('th_liquidity'),
            renderHeader() {
                return (<liquidityTipDom />);
            },
        },
        {
            prop: 'last7d',
            align: 'right',
            label: t('th_updated'),
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
.title {
    min-height: 30px;
    margin-bottom: 38px;
}

.el-table {
    :deep(.cell) {
        .tag {
            border-radius: 4px;
            font-weight: bold;
            font-size: 12px;
            line-height: 22px;
            color: #fff;
            padding: 0 8px;
            display: inline-block;

            &-high {
                background-color: #60c389;
            }

            &-middle {
                background-color: var(--main-color);
            }

            &-low {
                background-color: #e44c32;
            }
        }
    }
}

.button {
    min-width: 320px;
    height: 48px;
    padding: 15px;
    border-radius: 4px;
    background-color: rgba(102, 102, 102, 0.08);
    margin-top: 40px;
    color: var(--text-color-0);
}
</style>
