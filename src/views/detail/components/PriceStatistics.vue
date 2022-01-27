<!-- 价格统计 -->
<template>
    <div class="wrap">
        <h3 class="font-bold lh22 fz22">
            {{ t('price_statistics', {coin: detail.symbol ? detail.symbol.toUpperCase() : '--'}) }}
        </h3>

        <div
            class="fold-wrap"
            :class="{ 'is-open': state.show_more}"
        >
            <template
                v-for="(item, index) in Object.values(listMap)"
                :key="index"
            >
                <h4 class="font-bold lh22 fz14 flex-row flex-items-center mb6">
                    <i class="title-mark mr6" />
                    {{ item.label }}
                </h4>
                <ul class="mb12">
                    <li
                        v-for="child in item.children"
                        :key="child.label"
                        class="font-bold color-1 flex-row-space-between flex-items-center lh22"
                    >
                        <span
                            class="label fz14 flex-shrink-0 flex-row flex-items-center"
                            :class="child.label_cls ?? 'color-6'"
                        >
                            {{ child.label }}
                            <span
                                v-if="child.tag"
                                class="tag lh22 pl8 pr8 color-1 ml8"
                            >
                                {{ t('24h') }}
                            </span>
                        </span>
                        <div class="text-align-right">
                            <p>{{ child.value2 !== undefined ? child.value+' /' : child.value }}</p>
                            <!-- 涨跌幅 -->
                            <span
                                v-if="child.change !== undefined"
                                class="flex-row-flex-end flex-items-center"
                                :class="{
                                    'color-up': child.change > 0,
                                    'color-down': child.change < 0,
                                }"
                            >
                                <i
                                    class="fz12 mr4"
                                    :class="{
                                        'icon-up': child.change > 0,
                                        'icon-down': child.change < 0,
                                    }"
                                />
                                {{ child.change }}%
                            </span>
                            <span v-if="child.value2 !== undefined">
                                {{ child.value2 }}
                            </span>
                        </div>
                    </li>
                </ul>
            </template>
        </div>

        <button
            type="button"
            class="cursor-pointer font-bold"
            @click="state.show_more = !state.show_more"
        >
            {{ state.show_more ? t('btn_show_less') : t('btn_show_more') }}
        </button>
    </div>
</template>
<script setup>
import { defineProps, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import {
    toFormat, toFixed, div, times,
} from '@/utils/number';
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
const state = reactive({
    show_more: false,
});

const listMap = computed(() => {
    const { detail } = props;
    const { market_data: marketData = {}, yesterday_data: yesterdayData = {} } = detail;
    const fullname = detail.name || '--';
    const [yesterdayOpen, yesterdayHigh, yesterdayLow, yesterdayClose] = yesterdayData.prices || [];
    const {
        [`${detail.id}_-7d`]: history7d = {},
        [`${detail.id}_-30d`]: history30d = {},
        [`${detail.id}_-90d`]: history90d = {},
        [`${detail.id}_-1y`]: history1y = {},
    } = detail.ohlc || {};

    return {
        today: {
            label: t('price_today', { fullname }),
            children: [
                {
                    label: `${fullname} ${t('price')}`,
                    value: detail.simple_price?.usd ? `$${toFormat(detail.simple_price.usd)}` : '--',
                    label_cls: 'color-1',
                },
                {
                    label: t('price_change'),
                    value: marketData.price_change_24h_in_currency?.usd
                        ? `$${toFormat(marketData.price_change_24h_in_currency.usd, getPrecision(marketData.price_change_24h_in_currency.usd))}`
                        : '--',
                    change: toFixed(detail.simple_price?.usd_24h_change, 2),
                    tag: true,
                },
                {
                    label: t('24h_low_high'),
                    value: marketData.low_24h?.usd ? `$${toFormat(marketData.low_24h.usd)}` : '--',
                    value2: marketData.high_24h?.usd ? `$${toFormat(marketData.high_24h.usd)}` : '--',
                },
                {
                    label: t('trading_volume'),
                    value: detail.simple_price?.usd_24h_vol ? `$${toFormat(detail.simple_price.usd_24h_vol, 0)}` : '',
                    tag: true,
                },
                {
                    label: t('vol_market_cap'),
                    value: marketData.total_volume?.usd && marketData.market_cap?.usd
                        ? toFormat(div(marketData.total_volume.usd, marketData.market_cap.usd), 6)
                        : '--',
                },
                {
                    label: t('market_dominance'),
                    value: marketData.market_cap?.usd && detail.global_market_cap?.usd
                        ? `${toFixed(div(marketData.market_cap.usd, detail.global_market_cap.usd) * 100, 2) }%`
                        : '--',
                },
                { label: t('market_rank'), value: detail.market_cap_rank ? `#${detail.market_cap_rank}` : '--' },
            ],
        },
        market_cap: {
            label: `${fullname} ${t('market_cap')}`,
            children: [
                {
                    label: t('market_cap'),
                    value: marketData.market_cap?.usd ? `$${toFormat(marketData.market_cap.usd)}` : '--',
                    change: toFixed(marketData.market_cap_change_percentage_24h, 2),
                },
                {
                    label: t('fd_market_cap'),
                    value: marketData.max_supply
                        ? `$${toFormat(times(detail.simple_price?.usd || 0, marketData.max_supply || 0), 0)}`
                        : '--',
                },
            ],
        },
        yesterday: {
            label: t('price_yesterday', { fullname }),
            children: [
                {
                    label: t('yesterday_lh'),
                    value: yesterdayLow ? `$${toFormat(yesterdayLow, getPrecision(yesterdayLow))}` : '--',
                    value2: yesterdayHigh ? `$${toFormat(yesterdayHigh, getPrecision(yesterdayHigh))}` : '--',
                },
                {
                    label: t('yesterday_oc'),
                    value: yesterdayOpen ? `$${toFormat(yesterdayOpen, getPrecision(yesterdayOpen))}` : '--',
                    value2: yesterdayClose ? `$${toFormat(yesterdayClose, getPrecision(yesterdayClose))}` : '--',
                },
                {
                    label: t('yesterday_mc'),
                    value: yesterdayData.market_caps?.length ? `$${toFormat(yesterdayData.market_caps.slice(-1)[0], 2)}` : '--',
                },
                {
                    label: t('yesterday_vol'),
                    value: yesterdayData.total_volumes?.length ? `$${toFormat(yesterdayData.total_volumes.slice(-1)[0], 2)}` : '--',
                },
            ],
        },
        history: {
            label: t('price_history', { fullname }),
            children: [
                {
                    label: t('7d_lh'),
                    value: history7d.l?.length === 2 ? `$${toFormat(history7d.l[1])}` : '--',
                    value2: history7d.h?.length === 2 ? `$${toFormat(history7d.l[1])}` : '--',
                },
                {
                    label: t('30d_lh'),
                    value: history30d.l?.length === 2 ? `$${toFormat(history30d.l[1])}` : '--',
                    value2: history30d.h?.length === 2 ? `$${toFormat(history30d.l[1])}` : '--',
                },
                {
                    label: t('90d_lh'),
                    value: history90d.l?.length === 2 ? `$${toFormat(history90d.l[1])}` : '--',
                    value2: history90d.h?.length === 2 ? `$${toFormat(history90d.l[1])}` : '--',
                },
                {
                    label: t('52w_lh'),
                    value: history1y.l?.length === 2 ? `$${toFormat(history1y.l[1])}` : '--',
                    value2: history1y.h?.length === 2 ? `$${toFormat(history1y.l[1])}` : '--',
                },
                {
                    label: t('all_time_high'),
                    value: marketData.ath?.usd ? `$${toFormat(marketData.ath.usd)}` : '--',
                    change: toFixed(marketData.ath_change_percentage?.usd, 2),
                },
                {
                    label: t('all_time_low'),
                    value: marketData.atl?.usd ? `$${toFormat(marketData.atl.usd)}` : '--',
                    change: toFixed(marketData.atl_change_percentage?.usd, 2),
                },
                { label: t('coin_roi', { fullname }), change: toFixed(marketData.roi?.percentage, 2) },
            ],
        },
        supply: {
            label: t('coin_supply', { fullname }),
            children: [
                { label: t('circulating_supply'), value: marketData.circulating_supply ? `$${toFormat(marketData.circulating_supply, 0)}` : '--' },
                { label: t('total_supply'), value: marketData.total_supply ? `$${toFormat(marketData.total_supply, 0)}` : '--' },
                { label: t('max_supply'), value: marketData.max_supply ? `$${toFormat(marketData.max_supply, 0)}` : '--' },
            ],
        },
    };
});
</script>
<style lang="scss" scoped>
.wrap {
    background: #f9fbff;
    border-radius: 8px;
    padding: 20px;

    .color-1 {
        color: var(--text-color-1);
    }

    .color-6 {
        color: var(--text-color-6);
    }

    h3 {
        color: var(--text-color-1);
        margin-bottom: 29px;
    }

    h4 {
        color: var(--text-color-9);

        .title-mark {
            background-color: var(--text-color-9);
        }
    }

    ul {
        li {
            min-height: 70px;
            border-top: 1px solid rgba(0, 0, 0, 0.05);

            .tag {
                background: rgba(102, 102, 102, 0.08);
                border-radius: 4px;
            }
        }
    }

    .fold-wrap {
        max-height: 710px;
        overflow: hidden;

        &.is-open {
            max-height: max-content;
        }
    }

    button {
        width: 100%;
        background: rgba(102, 102, 102, 0.08);
        border-radius: 4px;
        height: 40px;
        color: var(--text-color-0);
    }
}
</style>
