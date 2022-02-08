<template>
    <section
        class="lh22"
        v-html="content"
    />
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
    content: {
        type: String,
        default: '',
    },
});
</script>
<style lang="scss" scoped>
section {
    font-family: 'IBM', sans-serif !important;

    :deep {
        font-family: 'IBM', sans-serif !important;

        h1,
        h2 {
            color: var(--color-text-0);
            font-weight: bold;
            margin-bottom: 32px;
            font-size: 32px;
        }

        h2 {
            margin-top: 20px;
        }

        h3 {
            color: var(--color-text-1);
            font-weight: bold;
            margin-top: 20px;
            margin-bottom: 24px;
            font-size: 24px;
        }

        p,
        div {
            line-height: 22px;
            color: var(--text-color-3);
            margin-bottom: 10px;
        }

        img {
            width: 100%;
        }

        ul {
            list-style: revert;
            padding-left: revert;
            margin-bottom: 20px;

            li {
                list-style: revert;
                line-height: 22px;
                color: var(--text-color-3);
            }
        }

        table {
            width: 100%;
            border: 1px solid #c7cbd0;
            border-top: 0;
            border-left: 0;
            margin-bottom: 10px;

            th,
            td {
                font-size: 14px;
                line-height: 1.5;
                text-align: center;
                padding: 10px;
                color: #111;
                border: 1px solid #c7cbd0;
                border-right: 0;
                border-bottom: 0;
                font-weight: bold;
            }

            th {
                background-color: #f3f3f3;
            }
        }
    }
}
</style>
