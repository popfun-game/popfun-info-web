<template>
    <ul
        v-for="data in list"
        :key="data.symbol"
        class="market flex-row flex-wrap"
    >
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
                style="height: 49px; object-fit: cover;"
            >
                <img
                    :src="`https://api.pop.fun/api/project/7day?token=${data.symbol}`"
                    style="width: 100%; height: 100%;"
                >
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

const props = defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
});

const { t } = useI18n();

const list = computed(() => {
    const map = {
        symbol: '--',
        price: '--',
        change: '',
        fdv: '--',
        mkp: '--',
        mkp_change: '',
        total_supply: '--',
        circulating_supply: '--',
        kline: [],
    };
    let cache = [];

    if (!props.detail?.tokens?.length) {
        // eslint-disable-next-line
        cache = [map];
    } else {
        cache = props.detail.tokens.map((item) => {
            const {
                price,
                priceChange24h,
                fullyDilutedValuation,
                marketCap,
                marketCapChange24h,
                totalSupply,
                circulatingSupply,
            } = props.detail.price_info?.[item.code] || {};

            const change = price && priceChange24h ? toFixed((priceChange24h / price) * 100, 2) : '';

            return {
                symbol: item.code,
                price: price ? `$${toFormat(price, getPrecision(price))}` : '--',
                change,
                fdv: fullyDilutedValuation ? `$${toFormat(fullyDilutedValuation, 0)}` : '--',
                mkp: marketCap ? `${toFormat(marketCap, 0)}` : '--',
                mkp_change: marketCap && marketCapChange24h ? toFixed((marketCapChange24h / marketCap) * 100, 2) : '',
                total_supply: totalSupply ? toFormat(totalSupply, 0) : '--',
                circulating_supply: circulatingSupply ? toFormat(circulatingSupply, 0) : '--',
                kline: [1, 2],
            };
        });
    }

    return cache;
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
