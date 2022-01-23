<template>
    <el-table
        :data="data"
        v-bind="$attrs"
        :class="customClass"
    >
        <template #empty>
            <el-empty :image-size="100">
                <button
                    class="btn-primary small"
                    @click="emit('onRetry')"
                >
                    {{ t('btn_retry') }}
                </button>
            </el-empty>
        </template>
        <slot v-if="!columns.length" />
        <el-table-column
            v-for="item in columns"
            v-else
            :key="item.prop"
            v-bind="item"
        >
            <template
                v-if="item.render && typeof item.render === 'function'"
                #default="scope"
            >
                <expand-dom
                    v-bind="item"
                    :$scope="scope"
                />
            </template>
        </el-table-column>
    </el-table>
</template>
<script>
import { h } from 'vue';
import { useI18n } from 'vue-i18n';

export default {
    components: {
        expandDom: (props) => {
            if (props.$scope.$index === -1) return;
            return props.render(h, { ...props.$scope });
        },
    },
    inheritAttrs: false,
    props: {
        columns: {
            type: Array,
            default() {
                return [];
            },
        },
        data: {
            type: Array,
            default() {
                return [];
            },
        },
        customClass: {
            type: String,
            default: 'reset-style',
        },
    },
    emits: ['onRery'],
    setup(props, { emit }) {
        const { t } = useI18n();

        return { t, emit };
    },
};
</script>
