<template>
    <el-skeleton
        :loading="data.title === '--'"
        animated
    >
        <template #template>
            <auto-img
                src=""
                height="56.66%"
                radius="12px"
            />
            <el-skeleton-item class="time" />
            <el-skeleton-item
                class="title"
                :style="{height: titleLine * 28 + 'px'}"
            />
        </template>
        <template #default>
            <a
                :href="data.type === 'news' ? data.link : replacePath(`/detail/${data._key}`)"
                rel="noreferrer nofollow noopener"
                :target="data.type === 'news' ? '_blank' : ''"
            >
                <auto-img
                    :src="data.img"
                    height="56.66%"
                    radius="12px"
                />
                <p
                    v-if="data.type === 'news'"
                    class="time text-capitalize"
                >
                    {{ data.updated_at ? fromNow(data.updated_at) : '' }}
                </p>
                <p
                    v-if="data.type === 'strategy'"
                    class="time"
                >
                    {{ data.updated_at ? formatLocalTime(data.updated_at) : '' }}
                </p>
                <h3
                    class="title"
                    :class="[`text-ellipsis-${titleLine}`]"
                >
                    {{ data.title }} </h3>
            </a>
        </template>
    </el-skeleton>
</template>
<script setup>
import { defineProps } from 'vue';
import autoImg from '@/components/AutoImg';
import { replacePath } from '@/lang/i18n';
import { fromNow, formatLocalTime } from '@/utils/day';

defineProps({
    data: {
        type: Object,
        default() {
            return {};
        },
    },
    titleLine: {
        type: String,
        default: '3',
    },
});
</script>
<style lang="scss" scoped>
.time {
    min-height: 28px;
    line-height: 28px;
    color: var(--text-color-6);
    font-size: 16px;
    font-weight: bold;
    margin-top: 12px;
    margin-bottom: 12px;
}

.title {
    font-weight: bold;
    font-size: 22px;
    line-height: 28px;
    color: var(--text-color-1);
}

a {
    position: relative;
    display: block;
    word-break: break-word;
}
</style>
