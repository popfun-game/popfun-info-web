<template>
    <ul class="market flex-row flex-wrap">
        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-col">
                <span class="label fz12 lh22 font-bold">{{ t('token') }}</span>
                <span class="value text-uppercase fz20 lh22 font-bold">{{ data.symbol }}</span>
            </div>
            <div class="flex-col mt24">
                <span class="label fz12 lh22 font-bold">{{ t('total_supply') }}</span>
                <span class="value text-uppercase fz20 lh22 font-bold">{{ data.total_supply }}</span>
            </div>
        </li>
        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-col">
                <span class="label fz12 lh22 font-bold">{{ t('price') }}</span>
                <span class="value text-uppercase fz20 lh22 font-bold flex-row flex-items-center">
                    {{ data.price }}
                    <span
                        v-if="data.change !== ''"
                        class="ml4 fz14"
                        :class="{
                            'color-up': data.change > 0,
                            'color-down': data.change < 0
                        }"
                    >
                        ({{ data.change > 0 ? `+${data.change}` : data.change }}%)
                    </span>
                </span>
            </div>
            <div class="flex-col mt24">
                <span class="label fz12 lh22 font-bold">{{ t('full_diluter_valuation') }}</span>
                <span class="value text-uppercase fz20 lh22 font-bold">{{ data.fdv }}</span>
            </div>
        </li>
        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-col">
                <span class="label fz12 lh22 font-bold">&nbsp;</span>
                <span class="value text-uppercase fz20 lh22 font-bold">&nbsp;</span>
            </div>
            <div class="flex-col mt24">
                <span class="label fz12 lh22 font-bold">{{ t('circulating_supply') }}</span>
                <span class="value text-uppercase fz20 lh22 font-bold">{{ data.circulating_supply }}</span>
            </div>
        </li>
        <li class="pl18 pr18 flex-col flex-1">
            <div
                class="flex-col"
                style="height: 49px;"
            >
                <ChartLine
                    :gradient-color="data.change < 0 ? 'var(--color-down)' : 'var(--color-up)'"
                    :line-color="data.change < 0 ? 'var(--color-down)' : 'var(--color-up)'"
                    :list="data.kline"
                    auto-size
                />
            </div>
            <div class="flex-col mt24">
                <span class="label fz12 lh22 font-bold">{{ t('market_cap') }}</span>
                <span class="value text-uppercase fz20 lh22 font-bold">
                    {{ data.mkp }}
                    <span
                        v-if="data.mkp_change !== ''"
                        class="ml4 fz14"
                        :class="{
                            'color-up': data.mkp_change > 0,
                            'color-down': data.mkp_change < 0
                        }"
                    >
                        ({{ data.mkp_change > 0 ? `+${data.mkp_change}` : data.mkp_change }}%)
                    </span>
                </span>
            </div>
        </li>
    </ul>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { toFixed, toFormat } from '@/utils/number';
import { getPrecision } from '@/utils/tool';
import ChartLine from '@/components/ChartLine';

const props = defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
});

const { t } = useI18n();

const data = computed(() => {
    const { detail } = props;
    const change = detail.simple_price?.usd_24h_change;
    const marketCap = detail.simple_price?.usd_market_cap;
    const fdv = detail?.market_data?.fully_diluted_valuation?.usd;
    const mkpChange = detail?.market_data?.market_cap_change_percentage_24h_in_currency?.usd;

    const map = {
        symbol: detail.symbol ?? '--',
        price: detail.simple_price?.usd ? `$${toFormat(detail.simple_price.usd)}` : '--',
        change: change ? toFixed(detail.simple_price.usd_24h_change, 2) : '',
        fdv: fdv ? `$${toFormat(fdv, getPrecision(fdv))}` : '--',
        mkp: marketCap ? `$${toFormat(marketCap, getPrecision(marketCap))}` : '--',
        mkp_change: mkpChange ? toFixed(mkpChange, 2) : '',
        total_supply: detail.market_data?.total_supply ? `$${toFormat(detail.market_data.total_supply, 0)}` : '--',
        circulating_supply: detail.market_data.circulating_supply ? `$${toFormat(detail.market_data.circulating_supply, 0)}` : '--',
        kline: [1, 2, 3, 4, 5, 10, 1, 2, 6, 20],
    };

    return map;
});
</script>
<style lang="scss" scoped>
.market {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    background-color: #f9fbff;
    min-height: 152px;
    padding: 14px 0;

    li {
        padding: 0 18px;
        min-width: 200px;
    }

    .label {
        color: var(--text-color-6);
        white-space: nowrap;
    }

    .value {
        margin-top: 5px;
        color: var(--text-color-1);
    }
}
</style>
