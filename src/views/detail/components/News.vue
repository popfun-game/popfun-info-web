<!-- 新闻模块 -->

<template>
    <div class="title flex-row-space-between flex-items-center">
        <h3 class="flex-row flex-items-center font-bold fz22 lh22">
            <i class="title-mark mr6" />
            {{ t('news_title', { fullname: '币种全称' }) }}
        </h3>
        <router-link
            :to="replacePath(`/information/`)"
            class="flex-row flex-items-center font-bold lh22"
        >
            {{ t('text_btn_read_more') }}
            <el-icon class="ml4">
                <arrow-right />
            </el-icon>
        </router-link>
    </div>
    <div class="flex-row flex-wrap">
        <div class="col-l flex-1">
            <news-card />
        </div>
        <div class="flex-1">
            <news-card
                v-for="(item, index) in 3"
                :key="item"
                :vertical="false"
                :style="{'margin-top': index !== 0 ? '44px' : ''}"
            />
        </div>
    </div>
    <div class="flex-row-center">
        <router-link
            :to="replacePath(`/information/`)"
            class="button flex-row-center flex-items-center font-bold"
        >
            {{ t('text_btn_read_more') }}
        </router-link>
    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import { ArrowRight } from '@element-plus/icons-vue';
import newsCard from './NewsCard';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
.title {
    margin-bottom: 60px;
}

.col-l {
    max-width: 540px;
    margin-right: 40px;
}

.button {
    min-width: 320px;
    height: 48px;
    padding: 15px;
    border-radius: 4px;
    background-color: rgba(102, 102, 102, 0.08);
    margin-top: 40px;
    color: var(--text-color-0);
}

@media screen and (max-width: 700px) {
    .col-l {
        min-width: 100%;
        margin-bottom: 40px;
    }
}
</style>
