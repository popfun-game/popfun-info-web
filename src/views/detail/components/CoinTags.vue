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
            <tag-button
                v-for="link in data.homepage"
                :key="link"
                :href="link"
            >
                <i class="icon-link fz16 mr4" />
                {{ matchHostname(link) }}
            </tag-button>

            <tag-button
                v-if="data.explorers?.length"
                :list="data.explorers"
            >
                <i class="icon-search fz16 mr4" />{{ t('explorers') }}
            </tag-button>

            <tag-button
                v-if="data.community?.length"
                :list="data.community"
            >
                <i class="icon-people fz16 mr4" />{{ t('community') }}
            </tag-button>

            <tag-button
                v-if="data.source_code"
                :href="data.source_code"
            >
                <i class="icon-code fz16 mr4" />Source code
            </tag-button>

            <!-- <a
                href=""
                target="_blank"
                rel="noreferrer nofollow noopener"
                class="tag font-bold lh22 flex-row flex-items-center"
            >
                <i class="icon-book fz16 mr4" />{{ t('whitepaper') }}
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
import tagButton from '@/components/TagButton';
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

// 匹配域名
const matchHostname = (href = '') => {
    try {
        const location = new URL(href);
        return location.hostname.replace('www.', '');
    } catch (error) {
        return href;
    }
};

// 格式化url
const formatLink = (list, needLabel) => {
    // 过滤空链接
    let cache = list.filter((item) => item);

    if (needLabel) {
        cache = cache.map((item) => ({
            label: matchHostname(item),
            href: item,
        }));
    }
    return cache;
};

const data = computed(() => {
    const { links } = props;
    if (!Object.keys(links).length) return {};

    // 社区
    const community = [
        { label: 'Reddit', href: links.subreddit_url },
        {
            icon: 'icon-twitter',
            label: 'Twitter',
            href: links.twitter_screen_name ? `https://twitter.com/${links.twitter_screen_name}` : '',
        },
        { label: 'Telegram', href: links.telegram_channel_identifier ? `https://t.me/${links.telegram_channel_identifier}` : '' },
        { label: 'Discord', href: links.chat_url[0] },
        {
            icon: 'icon-facebook',
            label: 'Facebook',
            href: links.facebook_username ? `https://www.facebook.com/${links.facebook_username}` : '',
        },
        ...formatLink(links.official_forum_url, true),
    ];

    return {
        homepage: formatLink([...links.homepage, ...links.announcement_url]),
        explorers: formatLink(links.blockchain_site, true),
        community: community.filter((item) => item.href),
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

    .tag-list {
        margin: -5px;
    }

    .tag-info {
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
