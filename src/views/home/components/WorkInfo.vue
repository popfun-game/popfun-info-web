<!-- 工作内容介绍 -->
<template>
    <article>
        <div
            class="title flex-row font-bold"
            :style="{'margin-bottom': show ? '32px' : ''}"
        >
            {{ t('work_info') }}
            <span
                class="btn-more cursor-pointer ml4"
                @click="show = !show"
            >
                {{ t('text_btn_read_more') }}
            </span>
        </div>
        <el-collapse-transition>
            <div
                v-show="show"
                class="text"
                v-html="t('work_info_text')"
            />
        </el-collapse-transition>
        <div
            v-if="show"
            class="btn-less-wrap flex-row"
        >
            <span
                class="btn-less cursor-pointer font-bold"
                @click="show = false"
            >{{ t('text_btn_read_less') }}</span>
        </div>
    </article>
</template>
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const show = ref(false);
</script>
<style lang="scss" scoped>
article {
    margin-top: 56px;

    .title {
        color: val(--text-color-6);
        line-height: 22px;
        padding-bottom: 13px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);

        .btn-more {
            color: var(--main-color);
        }
    }

    :deep(.text) {
        h3 {
            color: var(--text-color-1);
            font-weight: bold;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 10px;
        }

        p {
            margin-bottom: 28px;
            font-size: 12px;
            line-height: 18px;
            color: var(--text-color-6);
        }
    }

    .btn-less-wrap {
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        padding-bottom: 13px;

        .btn-less {
            line-height: 22px;
            color: var(--main-color);
        }
    }
}
</style>
