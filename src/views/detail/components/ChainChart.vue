<!-- 图表 -->
<template>
    <div class="coin-chart pt20">
        <h3 class="font-bold fz22 lh22 flex-row flex-items-center">
            <i class="title-mark mr6" />
            {{ t('price_chart') }}
        </h3>

        <chart
            :list="state.list"
            :change="detail.simple_price?.usd_24h_change"
            :loading="state.loading"
        />
    </div>
</template>
<script setup>
import {
    defineProps, reactive, watch,
} from 'vue';
import { useI18n } from 'vue-i18n';
import Chart from '@/components/Chart';
import { api } from '@/config/api';
import dayjs from '@/utils/day';

const props = defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
});

const { t } = useI18n();
const state = reactive({
    list: [],
    loading: true,
});

const methods = {
    // 获取kline
    getCoinKline(init) {
        if (init)state.loading = true;

        api.getCoinKline({ coin: props.detail.id }).then((res) => {
            state.loading = false;

            if (res.success && res.data?.length) {
                state.list = res.data.map((item) => ({
                    time: dayjs(item.t).unix(),
                    value: item.v?.length === 4 ? item.v.slice(-1)[0] : '',
                }));

                methods.loop();
            } else if (state.list.length) state.list = [];
        });
    },
    // 轮训
    loop() {
        state.timer = setTimeout(() => {
            methods.getCoinKline();
        }, 30000);
    },
};

watch(
    () => props.detail.id,
    (val) => {
        if (val) {
            methods.getCoinKline(true);
        } else if (props.detail.name) {
            state.loading = false;
        }
    },
    { immediate: true },
);

</script>
<style lang="scss" scoped>
.coin-chart {
    h3 {
        color: var(--text-color-1);
        padding-bottom: 32px;
    }
}

.chart {
    height: 398px;
}
</style>
