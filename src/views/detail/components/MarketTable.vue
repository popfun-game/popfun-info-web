<!-- 分类table -->
<template>
    <div class="title flex-row-space-between flex-items-center">
        <h3 class="flex-row flex-items-center font-bold fz22 lh22">
            <i class="title-mark mr6" />
            {{ t('market_title', { fullname: detail.name || '--' }) }}
        </h3>

        <router-link
            v-if="showAll"
            :to="replacePath(`/currency/${detail.id}/?tab=market`)"
            class="flex-row flex-items-center font-bold lh22"
        >
            {{ t('see_all_markets') }}
            <el-icon class="ml4">
                <arrow-right />
            </el-icon>
        </router-link>
    </div>

    <c-table
        v-loading="loading"
        :element-loading-text="t('list_loading')"
        :columns="state.columns"
        :data="list"
        @onRetry="emits('onRetry')"
    />

    <div
        v-if="showAll"
        class="flex-row-center"
    >
        <router-link
            :to="replacePath(`/currency/${detail.id}/?tab=market`)"
            class="btn-info flex-row-center flex-items-center font-bold"
        >
            {{ t('see_all_markets') }}
        </router-link>
    </div>
</template>
<script setup>
import {
    defineProps,
    defineEmits,
    reactive,
    computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import cTable from '@/components/Table';
import { ArrowRight } from '@element-plus/icons-vue';
import {
    toFormat, toFixed, div, times,
} from '@/utils/number';
import autoImg from '@/components/AutoImg';
import { getPrecision } from '@/utils/tool';
import confidenceTipDom from './ConfidenceTipDom';

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
    tab: {
        type: String,
        default: '',
    },
});

const emits = defineEmits(['onRetry']);

const { t } = useI18n();

const state = reactive({
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
            prop: 'trade_url',
            label: t('th_exchange'),
            'min-width': '190px',
            render(h, { row }) {
                return (
                    <a
                        class="flex-row flex-items-center"
                        href={row.trade_url}
                        target="_blank"
                        rel="noreferrer nofollow noopener"
                        style="display: inline-flex;"
                    >
                        <autoImg
                            src={row.market?.logo}
                            alt={`${row.market?.name}`}
                            small
                            width="24px"
                            height="24px"
                        />
                        <span class="mr8 ml4" style="color: var(--text-color-1)">{ row.market?.name || '--' }</span>
                    </a>
                );
            },
        },
        {
            prop: 'base',
            label: t('th_pairs'),
            'min-width': '100px',
            render(h, { row }) {
                return <a
                    href={row.trade_url}
                    target="_blank"
                    rel="noreferrer nofollow noopener"
                    class="text-ellipsis"
                >
                    { `${row.base}/${row.target}` }
                </a>;
            },
        },
        {
            prop: 'converted_last',
            align: 'right',
            label: t('th_price'),
            'min-width': '104px',
            formatter(row) {
                return `$${toFormat(row.converted_last?.usd, getPrecision(row.converted_last?.usd))}`;
            },
        },
        {
            prop: 'bid_ask_spread_percentage',
            align: 'right',
            label: t('th_spread'),
            width: 70,
            formatter(row) {
                return `${toFixed(row.bid_ask_spread_percentage, 2)}%`;
            },
        },
        {
            prop: 'cost_to_move_up_usd',
            align: 'right',
            label: `+2% ${t('th_depth')}`,
            'min-width': 150,
            formatter(row) {
                return `$${toFormat(row.cost_to_move_up_usd, 0)}`;
            },
        },
        {
            prop: 'cost_to_move_down_usd',
            align: 'right',
            label: `-2% ${t('th_depth')}`,
            'min-width': 150,
            formatter(row) {
                return `$${toFormat(row.cost_to_move_down_usd, 0)}`;
            },
        },
        {
            prop: 'converted_volume',
            align: 'right',
            label: t('th_vol'),
            'min-width': 150,
            formatter(row) {
                return `$${toFormat(row.converted_volume?.usd, 0)}`;
            },
        },
        {
            prop: 'vol',
            align: 'right',
            label: `${t('th_vol')}%`,
            width: 70,
            formatter(row) {
                const scale = times(div(row.converted_volume?.usd, props.detail.simple_price?.usd_24h_vol || 1), 100);
                return `${toFixed(scale, 2)}%`;
            },
        },
        {
            prop: 'trust_score',
            align: 'right',
            'min-width': 90,
            renderHeader() {
                return (<confidenceTipDom />);
            },
            render(h, { row }) {
                const map = {
                    green: {
                        class: 'tag-high',
                        text: t('tag_high'),
                    },
                    yellow: {
                        class: 'tag-moderate',
                        text: t('tag_moderate'),
                    },
                    red: {
                        class: 'tag-low',
                        text: t('tag_low'),
                    },
                };
                const target = map[row.trust_score] || map.red;
                return (
                    <span
                        class="tag"
                        {...{
                            class: target.class,
                        }}
                    >
                        { target.text }
                    </span>
                );
            },
        },
    ],
});

const list = computed(() => (props.detail.tickers || []).slice(0, props.tab !== 'market' ? 5 : 100));
const showAll = computed(() => props.detail.tickers?.length > 5 && props.tab !== 'market');
</script>
<style lang="scss" scoped>
.title {
    min-height: 30px;
    margin-bottom: 38px;
}

.el-table {
    overflow: initial;

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

            &-moderate {
                background-color: var(--main-color);
            }

            &-low {
                background-color: #e44c32;
            }
        }
    }

    :deep(.el-table__header-wrapper) {
        position: sticky;
        top: 0;
        z-index: 1000;
    }
}

.btn-info {
    min-width: 320px;
    margin-top: 40px;
}
</style>
