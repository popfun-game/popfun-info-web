<!-- 币种标签 -->
<template>
    <div class="coin-tag flex-1">
        <div class="color-0 font-bold lh22 mb10">
            {{ t('tags') }}
        </div>
        <div class="tag-list flex-row flex-items-center flex-wrap">
            <a
                v-for="item in 4"
                :key="item"
                href="javascript:;"
                class="tag font-bold lh22"
            >
                tag{{ item }}
            </a>
            <a
                href="javascript:;"
                class="tag font-bold lh22 highlight flex-row flex-items-center"
                @click="visible = true"
            >
                {{ t('view_all') }}
                <el-icon
                    size="12"
                    class="ml6"
                >
                    <arrow-right />
                </el-icon>
            </a>
        </div>
        <div class="color-0 font-bold lh22 mb10 mt24">
            {{ t('info') }}
        </div>
        <div class="tag-list tag-info flex-row flex-items-center flex-wrap">
            <a
                href=""
                target="_blank"
                class="tag font-bold lh22 flex-row flex-items-center"
            >
                <i class="icon-link fz16 mr4" />bitcoin.org
            </a>

            <tag-tooltip
                :list="[
                    {value: 2, label: 'baidu', href: 'https://www.baidu.com'}
                ]"
            >
                <i class="icon-search fz16 mr4" />Explorers
            </tag-tooltip>

            <tag-tooltip
                :list="[
                    {value: 2, label: 'baidu', href: 'https://www.baidu.com'}
                ]"
            >
                <i class="icon-people fz16 mr4" />Community
            </tag-tooltip>

            <a
                href=""
                target="_blank"
                class="tag font-bold lh22 flex-row flex-items-center"
            >
                <i class="icon-code fz16 mr4" />Source code
            </a>

            <a
                href=""
                target="_blank"
                class="tag font-bold lh22 flex-row flex-items-center"
            >
                <i class="icon-book fz16 mr4" />Whitepaper
            </a>
        </div>
    </div>

    <!-- tag dialog -->
    <el-dialog
        v-model="visible"
        :close-on-click-modal="false"
        :title="`Bitcoin ${t('tags')}`"
    >
        <div class="tag-dialog-body">
            <dl>
                <template
                    v-for="item in 4"
                    :key="item"
                >
                    <dt class="lh22 mb12">
                        标题
                    </dt>
                    <dd class="flex-row flex-wrap font-bold">
                        <router-link
                            v-for="tag in 20"
                            :key="tag"
                            class="tag lh22"
                            :to="replacePath('/')"
                        >
                            标签{{ tag }}
                        </router-link>
                    </dd>
                </template>
            </dl>
        </div>
    </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import tagTooltip from '@/components/TagTooltip';
import { ArrowRight } from '@element-plus/icons-vue';
import { replacePath } from '@/lang/i18n';

const { t } = useI18n();
const visible = ref(false);
</script>
<style lang="scss" scoped>

.tag {
    background: rgba(102, 102, 102, 0.08);
    border-radius: 4px;
    padding: 4px 12px;
    color: #666;
    margin: 5px;
    white-space: nowrap;

    &.highlight {
        background-color: rgba(114, 126, 158, 0.08);
        color: var(--main-color);
    }
}

.coin-tag {
    padding-top: 96px;
    overflow: hidden;

    .color-0 {
        color: var(--text-color-0);
    }

    .color-1 {
        color: var(--text-color-1);
    }

    .tag-list {
        margin: -5px;
    }

    .tag-info {
        .tag {
            white-space: nowrap;
            color: var(--text-color-1);
        }

        :deep(.button) {
            margin: 5px;
            padding: 4px 12px;
        }
    }
}

.tag-dialog-body {
    padding-left: 40px;
    padding-right: 20px;

    dt {
        color: var(--text-color-9);
    }

    dd {
        margin: -5px;
        padding-bottom: 40px;
    }
}

@media screen and (max-width: 700px) {
    .coin-tag {
        min-width: 100%;
        padding-top: 20px;
    }
}
</style>
