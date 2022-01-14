<template>
    <h3
        class="font-bold flex-row-space-between flex-items-center"
        :style="{'margin-top': top, 'margin-bottom': bottom}"
    >
        {{ t('nav_learn') }}
        <router-link
            v-if="url"
            :to="url"
            class="flex-row flex-items-center font-bold"
        >
            {{ t('btn_text_more') }}
            <el-icon
                class="ml4 flex-shrink-0"
                size="12"
                color="var(--main-color)"
            >
                <arrow-right />
            </el-icon>
        </router-link>
    </h3>
</template>
<script setup>
import { defineProps } from 'vue';
import { useI18n } from 'vue-i18n';
import { ArrowRight } from '@element-plus/icons-vue';

defineProps({
    url: {
        type: String,
        default: '',
    },
    top: {
        type: String,
        default: '48px',
    },
    bottom: {
        type: String,
        default: '26px',
    },
});

const { t } = useI18n();
</script>
<style lang="scss" scoped>
h3 {
    font-size: 36px;
    line-height: 47px;
    color: #000;

    a {
        font-size: 16px;
        line-height: 22px;

        .el-icon {
            margin-top: 2px;
        }
    }
}
</style>
