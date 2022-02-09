<!-- 图表 -->
<template>
    <div
        :id="state.id"
        ref="refDom"
        v-loading="loading"
        class="chart"
    />
</template>
<script setup>
import {
    defineProps, ref, reactive, watch, nextTick, onBeforeUnmount,
} from 'vue';
import { createChart } from 'lightweight-charts';
import { getPrecision } from '@/utils/tool';
import { toFixed } from '@/utils/number';

let chart = null;
let areaSeries = null;

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

const refDom = ref(null);
const state = reactive({
    id: Math.random().toString(32).slice(2),
    chart_ready: false,
    observer: null,
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
        chart = createChart(state.id, {
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

        state.chart_ready = true;
    },
    // 画面积图
    drawArea() {
        const prec = getPrecision(props.list.slice(-1)[0]?.value);

        if (areaSeries) {
            chart.removeSeries(areaSeries);
            areaSeries = null;
        }

        areaSeries = chart.addAreaSeries({
            ...(props.change < 0 ? state.color.down : state.color.up),
            lastPriceAnimation: 1,
            priceFormat: {
                type: 'price',
                minMove: `${toFixed(0, prec - 1)}1`,
                precision: prec,
            },
        });

        areaSeries.setData(props.list);
    },
    onObserve() {
        state.observer = new ResizeObserver(() => {
            if (chart) {
                const { width, height } = refDom.value.getBoundingClientRect() || {};
                const { width: tvWidth, height: tvHeight } = refDom.value.children?.[0]?.getBoundingClientRect() || {};

                if (width && height && tvWidth && tvHeight && (width !== tvWidth || height !== tvHeight)) {
                    chart.resize(width, height);
                }
            }
        });

        state.observer.observe(document.querySelector('body'));
    },
};

nextTick(() => {
    methods.init();
    methods.onObserve();
});

watch(
    () => props.change,
    (val) => {
        if (areaSeries) {
            areaSeries.applyOptions({
                ...(val < 0 ? state.color.down : state.color.up),
            });
        }
    },
    { immediate: true },
);

watch(
    () => props.list.length && state.chart_ready,
    (val) => {
        if (val) methods.drawArea();
    },
    { immediate: true },
);

onBeforeUnmount(() => {
    if (state.observer) {
        state.observer.disconnect();
    }
});

</script>
<style lang="scss" scoped>
.chart {
    width: 100%;
    height: 100%;
}
</style>
