<template>
    <layout-default>
        <section class="flex-1 body-bg">
            <div class="wrapper">
                <breadcrumb
                    :list="state.breadcrumb"
                    class="pt16"
                />

                <game-head
                    :detail="state.detail"
                    :loading="state.loading"
                />
                <game-market :detail="state.detail" />
                <game-body :detail="state.detail" />
            </div>
        </section>
    </layout-default>
</template>
<script setup>
import { reactive, computed, onBeforeUnmount } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import layoutDefault from '@/components/layouts/Default';
import breadcrumb from '@/components/Breadcrumb';
import { replacePath } from '@/lang/i18n';
import { api } from '@/config/api';
import { ElMessage } from 'element-plus';
import gameHead from './components/GameHead';
import gameMarket from './components/GameMarket';
import gameBody from './components/GameBody';

const route = useRoute();
const { t } = useI18n();
const state = reactive({
    loading: true,
    detail: {},
    timer: null,
    breadcrumb: [
        { path: replacePath('/'), label: t('nav_home') },
        { path: '', label: route.params.coin, class: 'text-capitalize' },
    ],
});

const id = computed(() => route.params.coin);

const methods = {
    // 获取详情
    getDetail() {
        if (!id.value) return;
        if (state.timer) clearTimeout(state.timer);
        state.loading = true;

        api.getProjectDetail({ code: id.value }).then((res) => {
            state.loading = false;

            if (res.success) {
                state.detail = res.data;
                methods.getPrice();
            } else {
                ElMessage.error(res.message);
            }
        });
    },
    // 获取项目价格信息
    getPrice() {
        const tokens = state.detail.tokens || [];
        const tokenString = tokens.map((item) => item.code).join(',');

        api.getProjectPrice({ codes: tokenString }).then((res) => {
            if (res.success && res.data?.result?.length) {
                const map = {};

                res.data.result.forEach((item) => {
                    map[item.token] = item;
                });

                state.detail.price_info = map;
                methods.loop();
            }
        });
    },
    // 轮训
    loop() {
        state.timer = setTimeout(() => {
            methods.getPrice();
        }, 30000);
    },
};

methods.getDetail();

onBeforeUnmount(() => {
    clearTimeout(state.timer);
});
</script>
