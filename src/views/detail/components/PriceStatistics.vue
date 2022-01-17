<!-- 价格统计 -->
<template>
    <div class="wrap">
        <h3 class="font-bold lh22 fz22">
            {{ t('price_statistics') }}
        </h3>

        <div
            class="fold-wrap"
            :class="{ 'is-open': state.show_more}"
        >
            <template
                v-for="(item, index) in Object.values(state.list_map)"
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
                                v-if="child.tag !== undefined"
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
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const state = reactive({
    list_map: {
        today: {
            label: t('price_today', { fullname: '币种全称' }),
            children: [
                { label: `币种全称 ${t('price')}`, value: '$47,857.88', label_cls: 'color-1' },
                {
                    label: t('price_change'), value: '$-1,297.87', change: -0.3, tag: true,
                },
                {
                    label: t('24h_low_high'), value: '$47,857.88', value2: '$77,857.88',
                },
                {
                    label: t('trading_volume'), value: '$47,857.88', change: 0.3, tag: true,
                },
                { label: t('vol_market_cap'), value: '$47,857.88' },
                { label: t('market_dominance'), value: '$47,857.88' },
                { label: t('market_rank'), value: '10' },
            ],
        },
        market_cap: {
            label: `币种全称 ${t('market_cap')}`,
            children: [
                { label: t('market_cap'), value: '$906,192,986,593.91', change: -0.3 },
                { label: t('fd_market_cap'), value: '$1,006,143,789,787.49', change: 10.3 },
            ],
        },
        yesterday: {
            label: t('price_yesterday', { fullname: '币种全称' }),
            children: [
                { label: t('yesterday_lh'), value: '$47,857.88', value2: '$77,857.88' },
                { label: t('yesterday_oc'), value: '$47,857.88', value2: '$77,857.88' },
                { label: t('yesterday_change'), change: 10 },
                { label: t('yesterday_vol'), value: '$1,006,143,789,787.49' },
            ],
        },
        history: {
            label: t('price_history', { fullname: '币种全称' }),
            children: [
                { label: t('7d_lh'), value: '$47,857.88', value2: '$77,857.88' },
                { label: t('30d_lh'), value: '$47,857.88', value2: '$77,857.88' },
                { label: t('90d_lh'), value: '$47,857.88', value2: '$77,857.88' },
                { label: t('52w_lh'), value: '$47,857.88', value2: '$77,857.88' },
                { label: t('all_time_high'), value: '$47,857.88', change: 10000 },
                { label: t('all_time_low'), value: '$47,857.88', change: -10000 },
                { label: t('coin_roi', { fullname: '币种全称' }), change: -10000 },
            ],
        },
        supply: {
            label: t('coin_supply', { fullname: '币种全称' }),
            children: [
                { label: t('circulating_supply'), value: '$1,006,143,789,787.49' },
                { label: t('total_supply'), value: '$1,006,143,789,787.49' },
                { label: t('max_supply'), value: '$1,006,143,789,787.49' },
            ],
        },
    },
    show_more: false,
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
