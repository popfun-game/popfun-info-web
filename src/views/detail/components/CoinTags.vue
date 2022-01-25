<!-- 币种标签 -->
<template>
    <div class="coin-tag flex-1">
        <!-- 不展示tag -->
        <template v-if="false">
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
        </template>

        <div class="color-0 font-bold lh22 mb10">
            {{ t('info') }}
        </div>
        <div class="tag-list tag-info flex-row flex-items-center flex-wrap">
            <a
                v-for="link in data.homepage"
                :key="link"
                :href="link"
                rel="noreferrer nofollow noopener"
                target="_blank"
                class="tag font-bold lh22 flex-row flex-items-center"
            >
                <i class="icon-link fz16 mr4" />
                {{ matchHostname(link) }}
            </a>

            <tag-tooltip
                v-if="data.explorers?.length"
                :list="data.explorers"
            >
                <i class="icon-search fz16 mr4" />Explorers
            </tag-tooltip>

            <tag-tooltip
                v-if="data.community?.length"
                :list="data.community"
            >
                <i class="icon-people fz16 mr4" />Community
            </tag-tooltip>

            <a
                v-if="data.source_code"
                :href="data.source_code"
                target="_blank"
                rel="noreferrer nofollow noopener"
                class="tag font-bold lh22 flex-row flex-items-center"
            >
                <i class="icon-code fz16 mr4" />Source code
            </a>

            <!-- <a
                href=""
                target="_blank"
                rel="noreferrer nofollow noopener"
                class="tag font-bold lh22 flex-row flex-items-center"
            >
                <i class="icon-book fz16 mr4" />Whitepaper
            </a> -->
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
import { defineProps, ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import tagTooltip from '@/components/TagTooltip';
import { ArrowRight } from '@element-plus/icons-vue';
import { replacePath } from '@/lang/i18n';

const props = defineProps({
    links: {
        type: Object,
        default() {
            return {};
        },
    },
});

const { t } = useI18n();
const visible = ref(false);

const matchHostname = (href = '') => {
    if (/https:\/\/(wwww\.)?([\w.]+)\//.test(href)) {
        return RegExp.$2;
    }

    return href;
};

const data = computed(() => {
    const { links } = props;
    if (!Object.keys(links).length) return {};

    return {
        homepage: [...links.homepage, ...links.announcement_url].filter((item) => item),
        explorers: links.blockchain_site.filter((item) => item).map((item) => ({
            label: matchHostname(item),
            href: item,
        })),
        community: [
            { label: 'Reddit', href: links.subreddit_url },
            { label: 'Twitter', href: links.twitter_screen_name ? `https://twitter.com/${links.twitter_screen_name}` : '' },
            { label: 'Telegram', href: links.telegram_channel_identifier ? `https://t.me/${links.telegram_channel_identifier}` : '' },
            { label: 'Discord', href: links.chat_url[0] },
            { label: 'Facebook', href: links.facebook_username ? `https://www.facebook.com/${links.facebook_username}` : '' },
        ].filter((item) => item.href),
        source_code: links.repos_url.github[0],
    };
});

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
    padding-top: 40px;
    overflow: hidden;
    max-width: 384px;

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

            &:hover {
                color: var(--main-color);
            }
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
