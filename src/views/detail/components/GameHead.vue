<template>
    <div class="game-head mt24 flex-row-space-between flex-wrap">
        <div class="left flex-1">
            <div class="flex-row">
                <div class="flex-shrink-0">
                    <auto-img
                        :src="detail.image?.small ? detail.image.small : loading ? '' : '--'"
                        width="100px"
                        height="100px"
                        radius="8px"
                    />
                </div>
                <div class="flex-col ml16">
                    <h1 class="fz24 lh24 font-bold color-1">
                        {{ detail.name || '--' }}
                    </h1>
                    <p class="mt8 fz16 lh24 color-6 text-ellipsis-3">
                        --
                    </p>
                </div>
            </div>
            <div class="flex-row mt24 lh24 fz16">
                <span class="label">{{ t('addresses') }}</span>
                <span class="flex-row">
                    16,232
                    <span class="color-up ml8">(+0.11%)</span>
                </span>
            </div>
            <div class="flex-row mt20 lh24 fz16">
                <span class="label">{{ t('popularity') }}</span>
                <span class="flex-row">
                    <span class="flex-row flex-items-center ml8">
                        16,232K
                        <i
                            v-for="item in 5"
                            :key="item"
                            class="icon-flame"
                            style="color: #f0502d;"
                        />
                    </span>
                </span>
            </div>
            <div class="flex-row mt20 lh24 fz16">
                <span class="label">
                    {{ t('upcoming_event') }}
                </span>
            </div>
            <div class="mt20">
                <a
                    href=""
                    class="fz16 lh24"
                >
                    {{ t('submit_latest_project') }}
                </a>
            </div>
        </div>
        <div class="info flex-1">
            <h3 class="fz14 lh22 font-bold">
                {{ t('info') }}
            </h3>
            <div
                v-for="(item, index) in infoList"
                :key="index"
                class="flex-row fz16 lh24 mt16"
            >
                <span class="label">{{ item.label }}</span>
                <div
                    v-if="item.links?.length"
                    class="links flex-row flex-wrap"
                >
                    <tag-button
                        v-for="link in item.links"
                        :key="link.href"
                        :href="link.href"
                    >
                        <i
                            class="fz16 mr4"
                            :class="[link.icon ? link.icon : 'icon-link']"
                        />
                        {{ link.label }}
                    </tag-button>
                </div>
                <a
                    v-else-if="item.link"
                    :href="item.href"
                    rel="noreferrer nofollow noopener"
                >
                    {{ item.href }}
                </a>
                <span v-else> {{ item.text }} </span>
            </div>
        </div>
    </div>
</template>
<script setup>
import { defineProps, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import autoImg from '@/components/AutoImg';
import tagButton from '@/components/TagButton';

const props = defineProps({
    detail: {
        type: Object,
        default() {
            return {};
        },
    },
    loading: {
        type: Boolean,
        default: true,
    },
});

const { t } = useI18n();

const infoList = computed(() => {
    const links = props.detail?.links || {};

    return [
        { label: t('website'), link: true, href: 'https://www.pop.fun/' },
        { label: t('whitepaper'), link: true, href: 'https://www.pop.fun/' },
        {
            label: t('community'),
            links: [
                { label: 'Reddit', href: links.subreddit_url },
                {
                    icon: 'icon-twitter',
                    label: 'Twitter',
                    href: links.twitter_screen_name ? `https://twitter.com/${links.twitter_screen_name}` : '',
                },
                { label: 'Telegram', href: links.telegram_channel_identifier ? `https://t.me/${links.telegram_channel_identifier}` : '' },
                { label: 'Discord', href: links.chat_url?.[0] },
                {
                    icon: 'icon-facebook',
                    label: 'Facebook',
                    href: links.facebook_username ? `https://www.facebook.com/${links.facebook_username}` : '',
                },
            ].filter((item) => item.href),
        },
        { label: t('chain'), text: 'BSC' },
        { label: t('genre'), text: 'Idle Game' },
        { label: t('download_link'), link: true, href: 'https://www.pop.fun/' },
        { label: t('language'), text: 'EN' },
    ];
});
</script>
<style lang="scss" scoped>
.game-head {
    color: var(--text-color-0);
    padding-bottom: 49px;

    .color-1 {
        color: var(--text-color-1);
    }

    .left {
        max-width: 580px;
        margin-right: 20px;

        .label {
            width: 162px;
            padding-right: 12px;
            flex-shrink: 0;
        }
    }

    .info {
        max-width: 500px;

        .label {
            width: 124px;
            margin-right: 12px;
            color: var(--text-color-6);
            flex-shrink: 0;
        }

        .links {
            margin: -10px;

            a {
                margin: 10px;
            }
        }
    }

    @media screen and (max-width: 700px) {
        .info {
            min-width: 100%;
            padding-top: 20px;
        }
    }
}
</style>
