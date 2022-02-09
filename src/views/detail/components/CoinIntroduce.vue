<!-- 币种详情介绍 -->
<template>
    <h2 class="flex-row flex-items-center font-bold fz22 lh22 mb16">
        <i class="title-mark mr6" />
        {{ t('coin_price_title', { fullname: detail.name }) }}
    </h2>
    <p
        class="lh22"
        v-html="t('coin_price_desc', {...priceDesc})"
    />
    <div
        ref="refDom"
        class="html fz16 mb16"
        :class="{'is-open': state.unfold || !state.show_more}"
    >
        <h3 v-if="!detail.description_more">
            {{ t('what_is_coin', {fullname: detail.name}) }}
        </h3>
        <html-parse :content="detail.description_more || detail.description?.en || '--'" />
    </div>
    <button
        v-if="state.show_more"
        type="button"
        class="cursor-pointer font-bold flex-row flex-items-center"
        @click="methods.onFold"
    >
        {{ state.unfold ? t('text_btn_read_less') : t('text_btn_read_more') }}
        <el-icon class="ml4">
            <caret-top v-if="state.unfold" />
            <caret-bottom v-else />
        </el-icon>
    </button>
</template>
<script setup>
import {
    ref, reactive, watch, defineProps, nextTick, computed,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { CaretBottom, CaretTop } from '@element-plus/icons-vue';
import { toFormat, toFixed } from '@/utils/number';
import htmlParse from '@/components/HtmlParse';

const props = defineProps({
    detail: {
        type: String,
        default: '',
    },
});

const { t } = useI18n();
const refDom = ref(null);
const state = reactive({
    show_more: false,
    unfold: false,
});

const priceDesc = computed(() => {
    const { detail } = props;
    let exchange = '--';
    const change = detail.simple_price?.usd_24h_change || 0;
    const changeCls = change > 0 ? 'color-up' : change < 0 ? 'color-down' : ''; // eslint-disable-line

    if (detail.tickers?.length) {
        const exchangeData = detail.tickers[0];
        exchange = `
            <a
                href="${exchangeData.trade_url ? exchangeData.trade_url : '/'}"
                target="${exchangeData.trade_url ? '_black' : ''}"
                rel="noreferrer nofollow noopener"
            >${exchangeData?.market?.name || '--'}</a>
        `;
    }
    return {
        fullname: detail.name || '--',
        currency: detail.simple_price?.usd ? `<span class="${changeCls} font-bold">$${toFormat(detail.simple_price.usd)}</span>` : '--',
        symbol: detail.symbol || '--',
        vol: detail.simple_price?.usd_24h_vol ? `$${toFormat(detail.simple_price.usd_24h_vol, 0)}` : '--',
        change: change ? `<span class="${changeCls} font-bold">${toFixed(change, 2)}%</span>` : '--',
        circulating: detail.market_data?.circulating_supply ? `$${toFormat(detail.market_data.circulating_supply, 0)}` : '--',
        total: detail.market_data?.total_supply ? `$${toFormat(detail.market_data.total_supply, 0)}` : '--',
        exchange,
    };
});

const methods = {
    // 设置行
    setLine() {
        if (refDom.value) {
            const height = refDom.value.scrollHeight;
            state.show_more = height > 300;
        }
    },
    onFold() {
        state.unfold = !state.unfold;
        methods.setLine();
    },
};

watch(
    () => props.detail.description,
    () => {
        nextTick().then(() => {
            methods.setLine();
        });
    },
    { immediate: true },
);
</script>
<style lang="scss" scoped>
h2 {
    margin-top: 52px;
}

.html {
    position: relative;
    line-height: 28px;
    color: var(--text-color-6);
    max-height: 300px;
    overflow: hidden;
    word-break: break-word;

    &:not(.is-open)::after {
        content: "";
        height: 50px;
        width: 100%;
        bottom: 0;
        position: absolute;
        z-index: 1;
        background: linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
    }

    :deep(b) {
        color: var(--text-color-1);
    }

    h3 {
        font-weight: bold;
        font-size: 22px;
        line-height: 22px;
        color: var(--text-color-1);
        padding: 32px 0 16px;
    }

    &.is-open {
        max-height: initial;
    }
}

button {
    background: rgba(42, 100, 251, 0.08);
    border-radius: 4px;
    height: 40px;
    color: var(--main-color);
    padding: 0 49px;
}
</style>
