<!-- 自适应图片 -->
<template>
    <div
        class="img-wrap"
        :style="{
            width: width,
            'padding-bottom': height,
            'border-radius': radius
        }"
    >
        <el-image
            :src="src"
            lazy
            fit="cover"
        >
            <template
                v-if="src === ''"
                #error
            >
                <span class="el-image__error flex-col">
                    <el-icon
                        class="is-loading"
                        size="20"
                    >
                        <loading />
                    </el-icon>
                    <p class="mt10">Loading...</p>
                </span>
            </template>
            <template #placeholder>
                <span class="el-image__error flex-col">
                    <el-icon
                        class="is-loading"
                        size="20"
                    >
                        <loading />
                    </el-icon>
                    <p class="mt10">Loading...</p>
                </span>
            </template>
        </el-image>
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
import { Loading } from '@element-plus/icons-vue';

defineProps({
    src: {
        type: String,
        required: true,
    },
    width: {
        type: String,
        default: '',
    },
    height: {
        type: String,
        default: '',
    },
    radius: {
        type: String,
        default: '',
    },
});
</script>
<style lang="scss" scoped>
.img-wrap {
    position: relative;
    overflow: hidden;

    .el-image {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        right: 0;
    }
}
</style>
