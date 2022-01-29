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
import { createChart } from 'lightweight-charts/dist/lightweight-charts.esm.development';
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
    // 涨跌幅
    change: {
        type: [Number, String],
        default: 0,
    },
});

const state = reactive({
    id: Math.random().toString(32).slice(2),
    chart: null,
    series: null,
    color: {
        up: {
            topColor: 'rgba(38, 196, 139, 0.35)',
            bottomColor: 'rgba(38, 196, 139, 0)',
            lineColor: 'rgba(38, 196, 139, 1)',
        },
        down: {
            topColor: 'rgba(233, 53, 53, 0.35)',
            bottomColor: 'rgba(233, 53, 53, 0)',
            lineColor: 'rgba(233, 53, 53, 1)',
        },
    },
});

const methods = {
    // 初始化
    init() {
        state.chart = createChart(state.id, {
            watermark: {
                visible: true,
                text: 'Popfun',
                color: '#999',
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
    () => props.change,
    (val) => {
        if (state.series) {
            state.series.applyOptions({
                ...(val < 0 ? state.color.down : state.color.up),
            });
        }
    },
    { immediate: true },
);

watch(
    () => props.list.length && state.chart,
    (val) => {
        if (val) {
            if (state.series) {
                state.chart.removeSeries(state.series);
                state.series = null;
            }

            const prec = getPrecision(props.list.slice(-1)[0]?.value);

            state.series = state.chart.addAreaSeries({
                ...(props.change < 0 ? state.color.down : state.color.up),
                // lastValueVisible: true,
                lastPriceAnimation: 1,
                priceFormat: {
                    type: 'price',
                    minMove: `${toFixed(0, prec - 1)}1`,
                    precision: prec,
                },
            });
            state.series.setData(props.list);
            // state.series.applyOptions({
            //     lastValueVisible: true,
            // });
            console.log(state.series.seriesType());
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
