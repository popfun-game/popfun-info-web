<!-- 新闻卡片 -->
<template>
    <a
        :href="data.link"
        rel="noreferrer nofollow noopener"
        target="_blank"
        class="card"
        :class="{'is-vertical': vertical}"
    >
        <auto-img
            v-if="vertical"
            :src="data.img"
            width="100%"
            height="57%"
            radius="8px"
        />
        <div :class="{'flex-row': !vertical}">
            <div :class="{'min-wrap': !vertical}">
                <h3
                    class="font-bold fz22 lh22 text-ellipsis-2"
                    :class="{'mt16': vertical}"
                >
                    {{ data.title }}
                </h3>
                <p class="info text-ellipsis-3">
                    {{ data.summary }}
                </p>
            </div>
            <auto-img
                v-if="!vertical"
                class="flex-self-flex-start"
                :src="data.img"
                width="38%"
                height="23%"
                radius="8px"
            />
        </div>
        <div class="flex-row flex-wrap flex-items-center fz16">
            <span class="color-1 font-bold">Bitcoinist</span>
            <i class="color-9 pl4 pr4">·</i>
            <span
                v-if="data.updated_at"
                class="color-3"
            >{{ dayjs(data.updated_at).fromNow() }}</span>
            <span
                v-if="name"
                class="tag font-bold color-1 lh22 flex-row flex-items-center ml8"
            >
                <auto-img
                    small
                    class="mr4"
                    width="20px"
                    height="20px"
                    :src="icon"
                    :alt="name"
                />
                {{ name }}
            </span>
        </div>

    </a>
</template>
<script setup>
import { defineProps } from 'vue';
import autoImg from '@/components/AutoImg';
import dayjs from '@/utils/day';

defineProps({
    vertical: {
        type: Boolean,
        default: true,
    },
    data: {
        type: Object,
        default() {
            return {};
        },
    },
    name: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '',
    },
});
</script>
<style lang="scss" scoped>
.card {
    word-break: break-word;
    display: block;

    .color-1 {
        color: var(--text-color-1);
    }

    .color-3 {
        color: var(--text-color-3);
    }

    .color-9 {
        color: var(--text-color-9);
    }

    h3 {
        color: var(--text-color-1);
        margin-bottom: 16px;
    }

    .info {
        color: var(--text-color-6);
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 20px;
        height: 84px;
    }

    .tag {
        padding: 4px 10px;
        background: #f5f5f5;
        border-radius: 4px;
    }

    .min-wrap {
        width: 62%;
        padding-right: 20px;
    }

    &.is-vertical {
        h3 {
            line-height: 36px;
        }
    }
}
</style>
