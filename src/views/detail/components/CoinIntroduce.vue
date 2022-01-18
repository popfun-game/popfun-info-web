<!-- 币种详情介绍 -->
<template>
    <h2 class="flex-row flex-items-center font-bold fz22 lh22 mb16">
        <i class="title-mark mr6" />
        {{ t('price_live_data', { coin: 'coin' }) }}
    </h2>
    <div
        ref="refDom"
        class="html fz16 mb16"
        :style="{'max-height': state.unfold ? 'initial' : '510px'}"
    >
        The live <b>Bitcoin price today</b> is $42,717.87 USD with a 24-hour trading volume of $19,970,107,522

        If you would like to know where to buy Bitcoin, the top

        <h3>sdfsdfsdfsd</h3>
        <p
            v-for="item in 10"
            :key="item"
        >
            24-hour trading volume of $19,970,107,522<br><br>

            If you would like to know where to buy Bitcoin, the top
        </p>
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
    ref, reactive, watch, defineProps, nextTick,
} from 'vue';
import { useI18n } from 'vue-i18n';
import { CaretBottom, CaretTop } from '@element-plus/icons-vue';

const props = defineProps({
    content: {
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

const methods = {
    // 设置行
    setLine() {
        if (refDom.value) {
            const height = refDom.value.scrollHeight;
            state.show_more = height > 510;
        }
    },
    onFold() {
        state.unfold = !state.unfold;
        methods.setLine();
    },
};

watch(
    () => props.content,
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
    line-height: 28px;
    color: var(--text-color-6);
    max-height: 510px;
    overflow: hidden;
    word-break: break-word;

    :deep(b) {
        color: var(--text-color-1);
    }

    :deep(h3) {
        font-weight: bold;
        font-size: 22px;
        line-height: 22px;
        color: var(--text-color-1);
        padding: 32px 0 16px;
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
