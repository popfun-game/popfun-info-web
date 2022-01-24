<template>
    <svg
        :width="width"
        :height="height"
        :viewBox="`0 0 ${width} ${height}`"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
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
</template>
<script setup>
import { defineProps, reactive, computed } from 'vue';

const props = defineProps({
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

const state = reactive({
    linear_id: Math.random().toString(32).substring(2),
});

const path = computed(() => {
    if (!props.list.length) return '';

    const list = [`M-1,${props.height}`];
    const gap = props.width / (props.list.length - 1);
    const max = Math.max.apply(null, props.list);
    const min = Math.min.apply(null, props.list);
    const diff = max - min || 1;

    props.list.forEach((item, index) => {
        const i = index * gap;
        const scale = ((max - item) * props.height) / diff;

        list.push(`${i.toFixed(2)},${scale.toFixed(2)}`);
    });

    list.push(`${parseInt(props.width, 10) + 1},${props.height}`);

    return list.join(' ');
});
</script>
