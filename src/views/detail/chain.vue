<template>
    <layout-default>
        <section class="flex-1 body-bg">
            <div class="wrapper">
                <breadcrumb
                    :list="state.breadcrumb"
                    class="pt16"
                />

                <chain-head
                    :detail="state.detail"
                    :loading="state.loading"
                />

                <chain-market
                    :detail="state.detail"
                    :loading="state.loading"
                />

                <chain-chart
                    style="margin-bottom: 48px;"
                    :detail="state.detail"
                />

                <chain-news :detail="state.detail" />
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
import chainHead from './components/ChainHead';
import chainMarket from './components/ChainMarket';
import ChainChart from './components/ChainChart';
import chainNews from './components/ChainNews';

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
    getDetail(init) {
        if (!id.value) return;
        if (state.timer) clearTimeout(state.timer);
        if (init) state.loading = true;

        api.getTokenDetail({ token: id.value }).then((res) => {
            state.loading = false;

            if (res.success) {
                state.detail = res.data;
                methods.loop();
            } else {
                ElMessage.error(res.message);
            }
        });
    },
    // 轮训
    loop() {
        state.timer = setTimeout(() => {
            methods.getDetail();
        }, 30000);
    },
};

methods.getDetail(true);

onBeforeUnmount(() => {
    clearTimeout(state.timer);
});
</script>
