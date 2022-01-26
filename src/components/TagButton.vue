<!-- 标签提示 -->
<!-- Gwei 算力介绍 -->
<template>
    <a
        v-if="!list.length"
        rel="noreferrer nofollow noopener"
        target="_blank"
        class="button flex-row flex-items-center cursor-pointer lh22 font-bold"
        v-bind="$attrs"
    >
        <slot />
    </a>
    <el-tooltip
        v-else
        ref="tooltip"
        placement="bottom"
        effect="light"
        popper-class="reset-tooltip"
    >
        <template #content>
            <div class="list">
                <a
                    v-for="(item, index) in list"
                    :key="index"
                    :href="item.href ? item.href : 'javascript:;'"
                    :target="item.href ? '_black' : ''"
                    rel="noreferrer nofollow noopener"
                    class="flex-row flex-items-center font-bold lh22 ts fz14"
                    @click="onClick(item)"
                >
                    <i
                        class="fz16 mr4"
                        :class="[item.icon ? item.icon : 'icon-link']"
                    />
                    {{ item.label }}
                </a>
            </div>
        </template>
        <span class="button flex-row flex-items-center cursor-pointer color-1 lh22 font-bold">
            <slot />
            <el-icon
                size="12"
                class="ml4"
            >
                <caret-bottom />
            </el-icon>
        </span>
    </el-tooltip>
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { CaretBottom } from '@element-plus/icons-vue';

defineProps({
    list: {
        type: Array,
        default() {
            return [];
        },
    },
});

const emits = defineEmits(['onClick']);

const tooltip = ref(null);

const onClick = (val) => {
    tooltip.value.open = false;

    if (!val.path) {
        emits('onClick', val);
    }
};
</script>
<style lang="scss" scoped>
.button {
    background: rgba(102, 102, 102, 0.08);
    padding: 2px 8px;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;
    color: var(--text-color-1);

    &:hover {
        color: var(--main-color);
    }
}

.list {
    a {
        border-radius: 4px;
        color: var(--text-color-1);
        padding: 8px 10px;

        &:hover {
            background: rgba(102, 102, 102, 0.08);
            color: var(--main-color);
        }
    }
}
</style>
