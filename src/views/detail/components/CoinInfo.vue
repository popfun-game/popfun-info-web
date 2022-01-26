<!-- 币种信息 -->
<template>
    <div class="coin-info flex-1">
        <h3 class="flex-row flex-items-center">
            <autoImg
                :src="data.icon"
                width="32px"
                height="32px"
                small
                :alt="data.name"
            />
            <span class="full-name ml8 mr6 font-bold">
                {{ data.name }}
            </span>
            <span class="short-name font-bold text-uppercase"> / {{ data.symbol }} </span>
        </h3>

        <div class="market">
            <div class="flex-row flex-items-center font-bold mb14">
                <span class="convert-u mr6">{{ data.price }}</span>
                <span
                    class="change flex-row flex-items-center"
                    :class="{
                        'color-up': data.is_up,
                        'color-down': data.is_down,
                    }"
                >
                    <i
                        v-if=" data.is_up"
                        class="icon-up mr4 fz12"
                    />
                    <i
                        v-if="data.is_down"
                        class="icon-down"
                    />{{ data.change }}
                </span>
            </div>

            <div class="convert-btc flex-row flex-items-center">
                {{ data.convert_btc }} BTC
                <span
                    v-if="data.percentage_btc !== ''"
                    class="flex-row flex-items-center ml12"
                    :class="{
                        'color-up': data.percentage_btc > 0,
                        'color-down': data.percentage_btc < 0,
                    }"
                >
                    <i class="mr4 fz12" />
                    {{ data.percentage_btc }}%
                </span>
            </div>
            <div class="convert-btc flex-row flex-items-center mb16">
                {{ data.convert_eth }} ETH
                <span
                    v-if="data.percentage_eth !== ''"
                    class="flex-row flex-items-center ml12"
                    :class="{
                        'color-up': data.percentage_eth > 0,
                        'color-down': data.percentage_eth < 0,
                    }"
                >
                    <i class="mr4 fz12" />
                    {{ data.percentage_eth }}%
                </span>
            </div>

            <div class="flex-row flex-items-center lh22">
                <span class="label">{{ t('low') }}：</span>
                <strong>{{ data.low }}</strong>
                <el-progress
                    :percentage="data.percentage"
                    color="var(--main-color)"
                    text-inside
                    :show-text="false"
                />
                <span class="label">{{ t('high') }}：</span>
                <strong class="mr10">{{ data.high }}</strong>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import autoImg from '@/components/AutoImg';
import {
    toFormat, toFixed, minus, div,
} from '@/utils/number';

const props = defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
    loading: {
        type: Boolean,
        default: true,
    },
});

const { t } = useI18n();

const data = computed(() => {
    const { detail } = props;
    const map = {
        icon: '',
        name: detail.name ?? '--',
        symbol: detail.symbol ?? '--',
        price: detail.simple_price?.usd ?? '--',
        change: '',
        low: detail.market_data?.low_24h?.usd ?? '--',
        high: detail.market_data?.high_24h?.usd ?? '--',
        percentage: 0,
        convert_btc: detail.market_data?.current_price?.btc ?? '--',
        convert_eth: detail.market_data?.current_price?.eth ?? '--',
        percentage_btc: detail.market_data?.price_change_percentage_24h_in_currency?.btc ?? '',
        percentage_eth: detail.market_data?.price_change_percentage_24h_in_currency?.eth ?? '',
    };

    if (!props.loading) {
        map.icon = detail.image?.small ? detail.image.small : '--';

        // 24小时涨跌
        const change = detail.simple_price?.usd_24h_change ?? '--';

        if (change !== '--') {
            map.change = `${toFixed(change, 2)}%`;
            map.is_up = toFixed(change, 2) > 0;
            map.is_down = toFixed(change, 2) < 0;
        }

        if (map.low !== '--' && map.high !== '--' && map.price !== '--') {
            map.percentage = toFixed(div(minus(map.price, map.low), minus(map.high, map.low)), 3) * 100;
        }

        map.price = map.price !== '--' ? `$${toFormat(map.price)}` : '--';
        map.low = map.low !== '--' ? `$${toFormat(map.low)}` : '--';
        map.high = map.high !== '--' ? `$${toFormat(map.high)}` : '--';
        map.convert_btc = map.convert_btc !== '--' ? toFormat(Math.abs(map.convert_btc)) : '--';
        map.convert_eth = map.convert_eth !== '--' ? toFormat(Math.abs(map.convert_eth)) : '--';
        map.percentage_btc = map.percentage_btc !== '' ? toFixed(map.percentage_btc, 2) : '';
        map.percentage_eth = map.percentage_eth !== '' ? toFixed(map.percentage_eth, 2) : '';
    }

    return map;
});
</script>
<style lang="scss" scoped>
.coin-info {
    max-width: 906px;
    margin-right: 10px;

    h3 {
        padding-top: 40px;
        padding-bottom: 24px;

        .full-name {
            font-weight: 600;
            font-size: 28px;
            color: var(--text-color-1);
        }

        .short-name {
            color: var(--text-color-6);
        }
    }

    .market {
        .convert-u {
            font-size: 32px;
            color: var(--text-color-1);
        }

        .change {
            font-size: 20px;

            i {
                margin-right: 2px;
            }
        }

        .convert-btc {
            color: var(text-color-6);
            line-height: 22px;
        }

        .label {
            color: var(--text-color-6);
        }

        .el-progress {
            flex: 1;
            margin: 0 10px;
            max-width: 124px;
            min-width: 40px;

            :deep(.el-progress-bar__outer) {
                background-color: #eaeaea;
            }
        }
    }
}
</style>
