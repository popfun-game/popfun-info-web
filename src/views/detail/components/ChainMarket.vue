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
                <span class="value ml24">{{ data.tokens }}</span>
            </div>
        </li>

        <li class="pl18 pr18 flex-col flex-1">
            <div class="flex-row flex-items-center">
                <span class="label">{{ t('24h_low') }}</span>
                <span class="value ml24">{{ data.low_24h }}</span>
            </div>
            <div class="flex-row flex-items-center mt8">
                <span class="label">{{ t('24h_high') }}</span>
                <span class="value ml24">{{ data.high_24h }}</span>
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
                        class="mr4 fz12"
                        :class="{
                            'icon-up': data.high_all_time_change > 0,
                            'icon-down': data.high_all_time_change < 0,
                        }"
                    />
                    {{ data.high_all_time_change }}{{ data.high_all_time_change !== '' ? '%' : '--' }}
                </span>
            </div>
            <div class="flex-row flex-items-center mt8">
                <span class="label">{{ data.high_all_time_date }}</span>
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
                        class="mr4 fz12"
                        :class="{
                            'icon-up': data.low_all_time_change > 0,
                            'icon-down': data.low_all_time_change < 0,
                        }"
                    />
                    {{ data.low_all_time_change }}{{ data.low_all_time_change !== '' ? '%' : '--' }}
                </span>
            </div>
            <div class="flex-row flex-items-center mt8">
                <span class="label">{{ data.low_all_time_date }}</span>
            </div>
        </li>
    </ul>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { toFixed, toFormat } from '@/utils/number';
import { formatLocalTime } from '@/utils/day';

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
    const marketData = detail.market_data || {};
    const change = detail.simple_price?.usd_24h_change;

    const map = {
        price: detail.simple_price?.usd ? `$${toFormat(detail.simple_price.usd)}` : '--',
        change: change ? toFixed(detail.simple_price.usd_24h_change, 2) : '',
        low_24h: marketData.low_24h?.usd ? `$${toFormat(marketData.low_24h.usd)}` : '--',
        high_24h: marketData.high_24h?.usd ? `$${toFormat(marketData.high_24h.usd)}` : '--',
        high_all_time: marketData.ath?.usd ? `$${toFormat(marketData.ath.usd)}` : '--',
        high_all_time_change: toFixed(marketData.ath_change_percentage?.usd, 2),
        high_all_time_date: marketData.ath_date?.usd ? formatLocalTime(marketData.ath_date.usd) : '--',
        low_all_time: marketData.atl?.usd ? `$${toFormat(marketData.atl.usd)}` : '--',
        low_all_time_change: toFixed(marketData.atl_change_percentage?.usd, 2),
        low_all_time_date: marketData.atl_date?.usd ? formatLocalTime(marketData.atl_date.usd) : '--',
        vol24h: detail.simple_price?.usd_24h_vol ? `$${toFormat(detail.simple_price.usd_24h_vol, 0)}` : '--',
        tokens: '--',
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
