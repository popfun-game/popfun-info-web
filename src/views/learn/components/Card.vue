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
            <el-skeleton-item
                class="mt22"
                style="height: 22px;"
            />
            <el-skeleton-item
                class="mt16"
                style="height: 56px;"
            />
            <el-skeleton-item
                class="mt16 mb20"
                style="height: 88px;"
            />
            <el-skeleton-item class="text" />
            <el-skeleton-item class="text" />
        </template>
        <template #default>
            <a
                :href="data._key ? replacePath(`/detail/${data._key}`) : 'javascript:;'"
                rel="noreferrer nofollow noopener"
            >
                <auto-img
                    :src="data.img"
                    height="56.66%"
                    radius="12px"
                />
                <h3 class="fz18 lh22 font-bold mt22 text-ellipsis">
                    {{ data.categories?.length ? data.categories[0].title : '' }}
                </h3>
                <h4 class="text-ellipsis-2 mt16"> {{ data.title }} </h4>
                <p class="desc color-6 fz16 lh22 mt16 mb20 text-ellipsis-4"> {{ data.summary }} </p>
                <p class="text text-ellipsis">{{ data.author?.name }}</p>
                <div class="text flex-row flex-items-center flex-wrap">
                    <span class="text-capitalize">
                        {{ data.updated_at ? fromNow(data.updated_at) : '' }}
                    </span>
                    <i class="icon-time ml16 mr4" />
                    {{ data.reading_time ? parseInt(data.reading_time / 60000, 10)+'m' : '' }}
                </div>
                <span
                    v-if="data.difficulty?.label"
                    class="tag text-capitalize"
                >
                    {{ data.difficulty?.label }}
                </span>
            </a>
        </template>
    </el-skeleton>
</template>
<script setup>
import { defineProps } from 'vue';
import autoImg from '@/components/AutoImg';
import { fromNow } from '@/utils/day';
import { replacePath } from '@/lang/i18n';

defineProps({
    data: {
        type: Object,
        default() {
            return {};
        },
    },
});
</script>
<style lang="scss" scoped>
h3 {
    height: 22px;
    color: var(--main-color);
}

h4 {
    font-weight: bold;
    font-size: 22px;
    line-height: 28px;
    height: 56px;
    color: var(--text-color-1);
}

.desc {
    min-height: 88px;
}

.text {
    line-height: 28px;
    min-height: 28px;
    font-weight: bold;
    color: var(--text-color-6);
}

a {
    position: relative;
    display: block;
    word-break: break-word;

    .color-6 {
        color: var(--text-color-6);
    }

    .tag {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 2px 10px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        font-weight: bold;
        line-height: 22px;
        color: #fff;
    }
}
</style>
