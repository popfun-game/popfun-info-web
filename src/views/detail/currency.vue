<template>
    <layout-default>
        <div class="currency-body flex-1 body-bg">
            <div class="coin-head pb24 pt16">
                <div class="wrapper">
                    <breadcrumb :list="state.breadcrumb" />

                    <div class="coin-info-wrap flex-row flex-wrap">
                        <coin-info
                            :detail="state.detail"
                            :loading="state.loading"
                        />
                        <coin-tags :links="state.detail.links ?? {}" />
                    </div>
                </div>
            </div>

            <div class="wrapper pt20 pb20">
                <tabs
                    v-model="state.tab"
                    :list="state.menu_list"
                    @onChange="methods.changeTab"
                />
            </div>

            <div
                v-if="state.tab !== 'market'"
                class="wrapper flex-row flex-wrap pb24"
            >
                <div class="col-l mr16 flex-1">
                    <chart :detail="state.detail" />

                    <!-- 折合 -->
                    <converter :detail="state.detail" />

                    <!-- coin 介绍 -->
                    <coin-introduce :detail="state.detail" />
                </div>
                <div class="col-r flex-1">
                    <!-- 价格列表 -->
                    <price-statistics
                        class="mb16"
                        :detail="state.detail"
                    />

                    <!-- 销售币种列表 -->
                    <trend-list v-if="false" />
                </div>
            </div>

            <div
                class="wrapper"
                style="overflow: initial;"
            >
                <market-table
                    :tab="state.tab"
                    :detail="state.detail"
                    :loading="state.loading"
                    @onRetry="methods.getDetail(true)"
                />
            </div>

            <div
                class="wrapper"
                style="margin-top: 56px;"
            >
                <news
                    :coin="id"
                    :icon="state.detail.image?.small"
                    :name="state.detail.name"
                />
            </div>
        </div>
    </layout-default>
</template>
<script setup>
import {
    reactive, computed, onBeforeUnmount, watch,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import layoutDefault from '@/components/layouts/Default';
import breadcrumb from '@/components/Breadcrumb';
import { api } from '@/config/api';
import { ElMessage } from 'element-plus';
import tabs from '@/components/Tabs';
import coinInfo from './components/CoinInfo';
import coinTags from './components/CoinTags';
import chart from './components/Chart';
import priceStatistics from './components/PriceStatistics';
import trendList from './components/TrendList';
import converter from './components/Converter';
import coinIntroduce from './components/CoinIntroduce';
import marketTable from './components/MarketTable';
import news from './components/News';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const state = reactive({
    tab: 'overview',
    loading: true,
    detail: {},
    breadcrumb: [
        { path: replacePath('/'), label: t('nav_home') },
        { path: '', label: route.params.coin, class: 'text-capitalize' },
    ],
    menu_list: [
        { id: 'overview', label: t('overview') },
        { id: 'market', label: t('market') },
    ],
    timer: null,
});

const id = computed(() => route.params.coin);

const methods = {
    // 获取详情
    getDetail(init) {
        if (!id.value) return;
        if (init) state.loading = true;

        api.getCoinDetail({ coin: id.value }).then((res) => {
            state.loading = false;

            if (res.success) {
                state.detail = res.data;
            } else {
                ElMessage.error(res.message);
            }
        });
    },
    changeTab(val) {
        router.replace(replacePath(`/currency/${route.params.coin}/?tab=${val}`));
    },
    // 轮训
    loop() {
        state.timer = setTimeout(() => {
            methods.getDetail();
        }, 30000);
    },
};

methods.getDetail(true);

watch(
    () => route.query,
    (val) => {
        state.tab = val.tab ? val.tab : 'overview';
    },
    { deep: true, immediate: true },
);

onBeforeUnmount(() => {
    clearTimeout(state.timer);
});
</script>
<style lang="scss" scoped>
.currency-body {
    padding-bottom: 60px;

    .coin-head {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        .coin-info-wrap {
            margin-bottom: 54px;
        }
    }

    .col-r {
        max-width: 360px;
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
}
</style>
