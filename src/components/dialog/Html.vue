<template>
    <!-- tag dialog -->
    <el-dialog
        :model-value="visible"
        :close-on-click-modal="false"
        custom-class="reset-fullscreen"
        fullscreen
        destroy-on-close
        @close="emits('close')"
    >
        <div
            class="wrapper html-parse"
            v-html="html"
        />
    </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    html: {
        type: String,
        default: '',
    },
    visible: {
        type: Boolean,
        default: false,
    },
});

const emits = defineEmits(['close']);
</script>
<style lang="scss" scoped>
.reset-fullscreen {
    .html-parse {
        padding-bottom: 20px;

        :deep {
            h1,
            h2 {
                color: var(--color-text-0);
                font-weight: bold;
                margin-bottom: 32px;
                font-size: 32px;
            }

            h2 {
                margin-top: 32px;
            }

            h3 {
                color: var(--color-text-1);
                font-weight: bold;
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
}
</style>
