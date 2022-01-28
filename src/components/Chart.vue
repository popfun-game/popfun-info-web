<!-- 图表 -->
<template>
    <div
        :id="state.id"
        v-loading="loading"
        class="chart"
    />
</template>
<script setup>
import {
    defineProps, reactive, watch, nextTick,
} from 'vue';
import { createChart } from 'lightweight-charts';
import { getPrecision } from '@/utils/tool';
import { toFixed } from '@/utils/number';

const props = defineProps({
    list: {
        type: Array,
        default() {
            return [];
        },
    },
    loading: {
        type: Boolean,
        default: true,
    },
});

const state = reactive({
    id: Math.random().toString(32).slice(2),
    chart: null,
    area_series: null,
});

const methods = {
    // 初始化
    init() {
        state.chart = createChart(state.id, {
            watermark: {
                visible: true,
                text: 'Popfun',
                color: '#999',
                horzAlign: 'left',
                vertAlign: 'bottom',
                fontSize: 24,
            },
            timeScale: {
                fixLeftEdge: true,
                fixRightEdge: true,
                timeVisible: true, // 显示时分秒
            },
            priceScale: {
                scaleMargins: {
                    bottom: 0.1,
                },
            },
        });
    },
};

nextTick(() => {
    methods.init();
});

watch(
    () => props.list.length && state.chart,
    (val) => {
        if (val) {
            if (state.area_series) {
                state.chart.removeSeries(state.area_series);
                state.area_series = null;
            }

            const prec = getPrecision(props.list.slice(-1)[0]?.value);

            state.area_series = state.chart.addAreaSeries({
                lastValueVisible: true,
                priceFormat: {
                    type: 'price',
                    minMove: `${toFixed(0, prec - 1)}1`,
                    precision: prec,
                },
            });
            state.area_series.setData(props.list);
            // state.area_series.applyOptions({
            //     lastValueVisible: true,
            // });
        }
    },
    { immediate: true },
);

</script>
<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>
