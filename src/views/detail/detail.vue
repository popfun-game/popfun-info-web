<!-- 资讯和学习详情 -->
<template>
    <layout-default>
        <div
            v-loading="state.loading"
            class="flex-1"
        >
            <div class="wrapper">
                <breadcrumb
                    :list="state.breadcrumb"
                    class="pt16 pb24"
                />

                <template v-if="Object.keys(state.data).length">
                    <h1>{{ state.data.title }}</h1>

                    <div class="flex-row flex-items-center fz16 lh22 mb12 font-bold color-9">
                        {{ state.data.author ? state.data.author?.name : '' }}
                        <i class="icon-time mr4 ml12" />
                        {{ state.data.fetch_at ? fromNow(state.data.fetch_at) : '' }}
                    </div>
                    <div class="auth flex-row fz16 lh22 font-bold color-9">
                        {{ t('created') }}
                        {{ state.data.created_at ? fromNow(state.data.created_at) : '' }},
                        {{ t('last_updated') }}
                        {{ state.data.updated_at ? fromNow(state.data.updated_at) : '' }}
                    </div>
                    <summary v-if="state.data.summary && state.data.type === 'learn'">
                        {{ state.data.summary }}
                    </summary>
                    <img
                        v-if="state.data.img &&state.data.type === 'learn'"
                        :src="state.data.img"
                        :alt="state.data.title"
                    >
                    <html-parse
                        class="html"
                        :content="state.data.html"
                    />
                </template>
                <el-empty
                    v-else-if="!state.loading"
                    :image-size="200"
                />
            </div>
        </div>
    </layout-default>
</template>
<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { api } from '@/config/api';
import { replacePath } from '@/lang/i18n';
import layoutDefault from '@/components/layouts/Default';
import breadcrumb from '@/components/Breadcrumb';
import { ElMessage } from 'element-plus';
import { fromNow } from '@/utils/day';
import htmlParse from '@/components/HtmlParse';

const route = useRoute();
const { t } = useI18n();
const state = reactive({
    breadcrumb: [
        { path: replacePath('/'), label: t('nav_home') },
        { path: '', label: t('detail'), class: 'text-capitalize' },
    ],
    data: {},
    loading: true,
    go_back_map: {
        learn: { path: replacePath('/learn/'), label: t('nav_learn') },
        strategy: { path: replacePath('/strategy/'), label: t('nav_strategy') },
    },
});

const methods = {
    getDetail() {
        api.getArticleDetail({ key: route.params.key }).then((res) => {
            state.loading = false;

            if (res.success) {
                state.data = res.data;
                if (!route.query.from && state.go_back_map[res.data.type]) {
                    state.breadcrumb[0] = state.go_back_map[res.data.type];
                }
            } else {
                ElMessage.error(res.message);
            }
        });
    },
};

methods.getDetail();
</script>
<style lang="scss" scoped>
h1 {
    color: var(--color-text-0);
    font-weight: bold;
    font-size: 32px;
    margin-bottom: 32px;
    line-height: 42px;
}

.color-9 {
    color: var(--text-color-9);
}

summary {
    border-left: 4px solid var(--color-up);
    background: rgb(248, 250, 253);
    padding: 40px 32px;
    margin-top: 40px;
    margin-bottom: 40px;
    font-size: 16px;
    line-height: 22px;
    color: var(--text-color-3);
}

img {
    width: 100%;
    border-radius: 12px;
}

.html {
    padding-top: 24px;
    padding-bottom: 40px;
}
</style>
