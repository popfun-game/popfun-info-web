<template>
    <ul class="market flex-row flex-wrap">
        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-row flex-items-center">
                <span class="label">{{ t('latest_price') }}</span>
                <span class="value ml24">{{ data.price }}</span>
            </div>
            <div class="flex-row flex-items-center mt8">
                <span class="label">{{ t('24h_Turnover') }}</span>
                <span class="value ml24">{{ data.vol24h }}</span>
            </div>
            <div class="flex-row flex-items-center mt8">
                <span class="label">{{ t('token_holders') }}</span>
                <span class="value ml24">{{ data.holders }}</span>
            </div>
        </li>

        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-row flex-items-center">
                <span class="label">{{ t('24h_low') }}</span>
                <span class="value ml24">{{ data.low24 }}</span>
            </div>
            <div class="flex-row flex-items-center mt8">
                <span class="label">{{ t('24h_high') }}</span>
                <span class="value ml24">{{ data.high24 }}</span>
            </div>
        </li>

        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-row flex-items-center">
                <span class="label">{{ t('24h_fluctuation') }}</span>
            </div>
            <div class="flex-row value mt8">
                <span
                    class="flex-row flex-items-center"
                    :class="{
                        'color-up': data.change > 0,
                        'color-down': data.change < 0,
                    }"
                >
                    <i
                        v-if="data.change !== ''"
                        class="mr4 fz12"
                        :class="{
                            'icon-up': data.change > 0,
                            'icon-down': data.change < 0,
                        }"
                    />
                    {{ data.change }}{{ data.change !== '' ? '%' : '--' }}
                </span>
            </div>
        </li>

        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-row flex-items-center">
                <span class="label">{{ t('all_time_high') }}</span>
            </div>
            <div class="flex-row flex-items-center value mt8">
                {{ data.allTimeHigh }}
                <span
                    class="flex-row flex-items-center"
                    :class="{
                        'color-up': data.high_all_time_change > 0,
                        'color-down': data.high_all_time_change < 0,
                    }"
                >
                    <i
                        v-if="data.high_all_time_change !== ''"
                        class="mr4 ml8 fz12"
                        :class="{
                            'icon-up': data.high_all_time_change > 0,
                            'icon-down': data.high_all_time_change < 0,
                        }"
                    />
                    {{ data.high_all_time_change }}{{ data.high_all_time_change !== '' ? '%' : '--' }}
                </span>
            </div>
            <div class="flex-row flex-items-center mt8">
                <span class="label">{{ data.allTimeHighTime }}</span>
            </div>
        </li>

        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-row flex-items-center">
                <span class="label">{{ t('all_time_low') }}</span>
            </div>
            <div class="flex-row flex-items-center value mt8">
                {{ data.allTimeLow }}
                <span
                    class="flex-row flex-items-center"
                    :class="{
                        'color-up': data.low_all_time_change > 0,
                        'color-down': data.low_all_time_change < 0,
                    }"
                >
                    <i
                        v-if="data.low_all_time_change !== ''"
                        class="mr4 ml8 fz12"
                        :class="{
                            'icon-up': data.low_all_time_change > 0,
                            'icon-down': data.low_all_time_change < 0,
                        }"
                    />
                    {{ data.low_all_time_change }}{{ data.low_all_time_change !== '' ? '%' : '--' }}
                </span>
            </div>
            <div class="flex-row flex-items-center mt8">
                <span class="label">{{ data.allTimeLowTime }}</span>
            </div>
        </li>
    </ul>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
    toFixed, toFormat, div, minus,
} from '@/utils/number';
import { formatLocalTime } from '@/utils/day';
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

const data = computed(() => {
    const {
        price,
        priceChange24h,
        vol24h,
        holders,
        low24,
        high24,
        allTimeHigh,
        allTimeHighTime,
        allTimeLow,
        allTimeLowTime,
    } = props.detail.price_info || {};

    const change = price && priceChange24h ? toFixed((priceChange24h / price) * 100, 2) : '';

    const map = {
        price: price ? `$${toFormat(price, getPrecision(price))}` : '--',
        change,
        vol24h: vol24h ? toFormat(vol24h, 0) : '--',
        holders: holders ? toFormat(holders, 0) : '--',
        low24: low24 ? `$${toFormat(low24, getPrecision(low24))}` : '--',
        high24: high24 ? `$${toFormat(high24, getPrecision(high24))}` : '--',
        allTimeHigh: allTimeHigh ? `$${toFormat(allTimeHigh)}` : '--',
        high_all_time_change: toFixed(div(minus(price, allTimeHigh), allTimeHigh), 2),
        allTimeHighTime: allTimeHighTime ? formatLocalTime(allTimeHighTime) : '--',
        allTimeLow: allTimeLow ? `$${toFormat(allTimeLow)}` : '--',
        low_all_time_change: toFixed(div(minus(price, allTimeLow), allTimeLow), 2),
        allTimeLowTime: allTimeLowTime ? formatLocalTime(allTimeLowTime) : '--',
    };

    return map;
});
</script>
<style lang="scss" scoped>
.market {
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    background-color: #f9fbff;
    min-height: 116px;
    padding-bottom: 11px;
    margin-bottom: 48px;

    li {
        padding: 14px;
        min-width: 200px;

        &:not(:last-child) {
            border-right: 1px solid rgba(0, 0, 0, 0.05);
        }
    }

    .label {
        color: var(--text-color-6);
        white-space: nowrap;
        font-size: 12px;
        line-height: 22px;
        font-weight: bold;
    }

    .value {
        color: var(--text-color-1);
        font-size: 14px;
        line-height: 22px;
        font-weight: bold;
    }
}
</style>
