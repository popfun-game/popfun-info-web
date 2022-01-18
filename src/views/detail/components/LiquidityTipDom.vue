<!-- market 表格title confidence 提示 -->
<template>
    <el-tooltip
        ref="tooltip"
        placement="bottom"
        effect="light"
        popper-class="reset-tooltip"
    >
        <template #content>
            <div class="con">
                <h3 class="font-bold lh22 mb10">
                    {{ t('th_liquidity_tip_title') }}
                </h3>

                <p v-html="t('th_liquidity_tip_con')" />
            </div>
        </template>
        <div class="target">
            {{ t('th_liquidity') }}
        </div>
    </el-tooltip>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
.con {
    max-width: 320px;

    h3 {
        color: var(--text-color-1);
    }

    p {
        color: var(text-color-6);
        word-break: break-word;
    }
}

.target {
    border-bottom: 1px dashed var(--text-color-6);
    display: inline-block;
}
</style>
