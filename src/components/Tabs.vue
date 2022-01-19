<template>
    <ul class="flex-row flex-items-center flex-wrap">
        <li
            v-for="item in list"
            :key="item.id"
            :class="{'is-active': item.id === modelValue}"
            @click="onClick(item.id)"
        >
            {{ item.label }}
        </li>
    </ul>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: '',
    },
    list: {
        type: Array,
        required: true,
    },
});

const emits = defineEmits(['update:modelValue', 'onClick']);

const onClick = (id) => {
    if (props.active === id) return;
    emits('update:modelValue', id);
    emits('onClick', id);
};
</script>
<style lang="scss" scoped>
ul {
    margin: -4px -6px;
    overflow: hidden;

    li {
        color: var(--text-color-1);
        font-weight: bold;
        border-radius: 4px;
        padding: 5px  10px;
        font-size: 12px;
        line-height: 22px;
        white-space: nowrap;
        transition: all 0.3s ease-in-out;
        margin: 4px 6px;
        cursor: pointer;

        &.is-active {
            background-color: var(--main-color);
            color: #fff;
        }
    }
}
</style>
