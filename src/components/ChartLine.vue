<template>
    <div
        ref="chartRef"
        class="chart-line"
    >
        <svg
            :width="state.width"
            :height="state.height"
            :viewBox="`0 0 ${state.width} ${state.height}`"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs v-if="area">
                <linearGradient
                    :id="state.linear_id"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="100%"
                >
                    <stop
                        offset="0%"
                        :stop-color="props.gradientColor"
                        stop-opacity="0.5"
                    />
                    <stop
                        offset="90%"
                        :stop-color="props.gradientColor"
                        stop-opacity="0"
                    />
                </linearGradient>
            </defs>
            <path
                :d="path"
                :fill="`url(#${state.linear_id})`"
                :stroke="props.lineColor"
                :stroke-width="props.lineWidth"
            />
        </svg>
    </div>
</template>
<script setup>
import {
    defineProps,
    reactive,
    computed,
    nextTick,
    ref,
    onBeforeUnmount,
} from 'vue';

const props = defineProps({
    area: {
        type: Boolean,
        default: true,
    },
    autoSize: {
        type: Boolean,
        default: false,
    },
    gradientColor: {
        type: String,
        default: '#f4a203',
    },
    lineColor: {
        type: String,
        default: '#f4a203',
    },
    lineWidth: {
        type: String,
        default: '1',
    },
    list: {
        type: Array,
        default() {
            return [];
        },
    },
    width: {
        type: String,
        default: '124',
    },
    height: {
        type: String,
        default: '42',
    },
});

const chartRef = ref(null);
const state = reactive({
    linear_id: Math.random().toString(32).substring(2),
    width: props.width,
    height: props.height,
    observer: null,
});

const path = computed(() => {
    if (!props.list.length || !state.width || !state.height) return '';

    const list = [`M-1,${state.height}`];
    const gap = state.width / (props.list.length - 1);
    const max = Math.max.apply(null, props.list);
    const min = Math.min.apply(null, props.list);
    const diff = max - min || 1;

    props.list.forEach((item, index) => {
        const i = index * gap;
        const scale = ((max - item) * state.height) / diff;

        list.push(`${i.toFixed(2)},${scale.toFixed(2)}`);
    });

    list.push(`${parseInt(state.width, 10) + 1},${state.height}`);

    return list.join(' ');
});

if (props.autoSize) {
    nextTick(() => {
        state.observer = new ResizeObserver(() => {
            state.width = 0;
            state.height = 0;

            nextTick(() => {
                const { width, height } = chartRef.value.getBoundingClientRect() || {};

                if (width && height) {
                    state.width = width;
                    state.height = height;
                }
            });
        });

        state.observer.observe(document.querySelector('body'));
    });

    onBeforeUnmount(() => {
        if (state.observer) {
            state.observer.disconnect();
        }
    });
}
</script>
<style lang="scss" scoped>
.chart-line {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
