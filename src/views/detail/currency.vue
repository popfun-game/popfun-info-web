<template>
    <layout-default :show-footer="false">
        <div class="currency-body flex-1">
            <div class="coin-head pb24 pt16">
                <div class="wrapper">
                    <breadcrumb :list="state.breadcrumb" />

                    <div class="coin-info-wrap flex-row flex-wrap">
                        <coin-info />
                        <coin-tags />
                    </div>

                    <market-cap />
                </div>
            </div>

            <div class="coin-types wrapper flex-row flex-wrap flex-items-center">
                <router-link
                    :to="replacePath(`/currency/${route.params.coin}/`)"
                    :class="{'is-active': !route.params.type}"
                >
                    {{ t('overview') }}
                </router-link>
                <router-link
                    :to="replacePath(`/currency/${route.params.coin}/market`)"
                    :class="{'is-active': !route.params.type === 'market'}"
                >
                    {{ t('market') }}
                </router-link>
            </div>

            <div class="wrapper flex-row flex-wrap">
                <div class="col-l mr16 flex-1">
                    <chart />

                    <!-- 折合 -->
                    <converter />

                    <!-- coin 介绍 -->
                    <coin-introduce />
                </div>
                <div class="col-r flex-1">
                    <!-- 价格列表 -->
                    <price-statistics class="mb16" />

                    <!-- 销售币种列表 -->
                    <trend-list />
                </div>
            </div>

            <div class="wrapper market-table">
                <market-table />
            </div>

            <div
                class="wrapper"
                style="margin-top: 56px;"
            >
                <news />
            </div>
        </div>
    </layout-default>
</template>
<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import layoutDefault from '@/components/layouts/Default';
import breadcrumb from '@/components/Breadcrumb';
import coinInfo from './components/CoinInfo';
import coinTags from './components/CoinTags';
import marketCap from './components/MarketCap';
import chart from './components/Chart';
import priceStatistics from './components/PriceStatistics';
import trendList from './components/TrendList';
import converter from './components/Converter';
import coinIntroduce from './components/CoinIntroduce';
import marketTable from './components/MarketTable';
import news from './components/News';

const route = useRoute();
const { t } = useI18n();
const state = reactive({
    breadcrumb: [
        { path: replacePath('/'), label: t('nav_home') },
        { path: '', label: route.params.coin },
    ],
});
</script>
<style lang="scss" scoped>
.currency-body {
    padding-bottom: 92px;

    .coin-head {
        background: linear-gradient(180deg, #f9fbff 0%, #fff 100%);

        .coin-info-wrap {
            margin-bottom: 40px;
        }
    }

    .coin-types {
        padding: 20px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        a {
            padding: 5px 10px;
            line-height: 22px;
            font-weight: bold;
            font-size: 12px;
            border-radius: 4px;
            margin-right: 12px;
            color: var(--text-color-1);

            &:hover,
            &.is-active {
                color: #fff;
                background-color: var(--main-color);
            }
        }
    }

    .col-r {
        max-width: 360px;
        padding-top: 20px;
    }

    .coin-chart {
        margin-bottom: 52px;
    }

    @media screen and (max-width: 1000px) {
        .col-r,
        .col-l {
            min-width: 100%;
            max-width: max-content;
        }
    }

    .market-table {
        margin-top: 56px;
    }
}
</style>
