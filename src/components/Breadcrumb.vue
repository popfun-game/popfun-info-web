<!-- 面包屑 -->
<template>
    <div class="breadcrumb flex-row">
        <div
            v-for="(item, index) in list"
            :key="item.path"
            class="flex-row flex-items-center"
        >
            <a

                class="font-bold fz14"
                :class="[{'cursor-default': !item.path}, item.class]"
                :href="item.path ? item.path : 'javascript:;'"
            >
                {{ item.label }}
            </a>

            <el-icon
                v-if="index !== list.length - 1"
                size="12"
                color="var(--text-color-9)"
                class="ml6 mr6"
            >
                <arrow-right />
            </el-icon>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';

defineProps({
    list: {
        type: Array,
        required: true,
    },
});
</script>
<style lang="scss" scoped>
.breadcrumb {
    a {
        line-height: 22px;
        color: var(--text-color-1);

        &:not([href="javascript:;"]) {
            color: var(--text-color-9);

            &:hover {
                color: var(--main-color);
            }
        }
    }
}
</style>
