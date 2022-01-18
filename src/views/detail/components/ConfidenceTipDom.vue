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
                    {{ t('tip_confidence_indicator') }}
                </h3>

                <p v-html="t('th_confidence_tip')" />

                <ul class="flex-row flex-items-center mt12">
                    <li class="flex-1">
                        <p>76-100%</p>
                        <p>{{ t('tag_high') }}</p>
                    </li>
                    <li class="flex-1 ml8 mr8">
                        <p>51-75%</p>
                        <p>{{ t('tag_moderate') }}</p>
                    </li>
                    <li class="flex-1">
                        <p>0-50%</p>
                        <p>{{ t('tag_low') }}</p>
                    </li>
                </ul>
            </div>
        </template>
        <div class="target">
            {{ t('th_confidence') }}
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

    li {
        padding: 4px 12px;
        border-radius: 4px;
        color: #fff;

        p {
            line-height: 18px;
        }

        &:first-child {
            background-color: #60c389;
        }

        &:nth-child(2) {
            background-color: var(--main-color);
        }

        &:nth-child(3) {
            background-color: #e44c32;
        }
    }
}

.target {
    border-bottom: 1px dashed var(--text-color-6);
    display: inline-block;
}
</style>
