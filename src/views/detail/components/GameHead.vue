<template>
    <div class="game-head mt24 flex-row-space-between flex-wrap">
        <div class="left flex-1">
            <div class="flex-row">
                <div class="flex-shrink-0">
                    <auto-img
                        :src="detail?.icon ? detail.icon : loading ? '' : '--'"
                        width="100px"
                        height="100px"
                        radius="8px"
                    />
                </div>
                <div class="flex-col ml16">
                    <h1 class="fz24 lh24 font-bold color-1">
                        {{ detail?.name || '--' }}
                    </h1>
                    <p
                        class="mt8 fz16 lh24 color-6 text-ellipsis-3"
                        v-html="detail?.introduction || '--'"
                    />
                </div>
            </div>
            <div class="flex-row mt24 lh24 fz16">
                <span class="label">{{ t('addresses') }}</span>
                <span class="flex-row">
                    {{ detail.marketData?.holders ? toFormat(detail.marketData.holders, 0) : '--' }}
                    <span
                        v-if="holderChange"
                        class="color-up ml8"
                        :class="{
                            'color-up': holderChange > 0,
                            'color-down': holderChange < 0
                        }"
                    >
                        ({{ holderChange }}%)
                    </span>
                </span>
            </div>
            <div class="flex-row mt20 lh24 fz16">
                <span class="label">{{ t('popularity') }}</span>
                <span class="flex-row">
                    <span class="flex-row flex-items-center ml8">
                        {{ !detail?.snsHeat ? '--' : detail.snsHeat > 1000 ? `${toFixed(detail.snsHeat / 1000, 1) }K` : detail.snsHeat }}
                        <i
                            v-for="item in getActiveLevel(detail.snsHeat)"
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
import { toFormat, toFixed } from '@/utils/number';
import { getActiveLevel } from '@/utils/tool';

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

const holderChange = computed(() => {
    if (props.detail.marketData?.holders && props.detail.marketData?.holders24hDiff) {
        return toFixed((props.detail.marketData.holders24hDiff / props.detail.marketData.holders) * 100, 2);
    }

    return '';
});
const infoList = computed(() => [
    { label: t('website'), link: true, href: props.detail?.mainPage },
    { label: t('whitepaper'), link: true, href: props.detail?.whitePaperUrl },
    {
        label: t('community'),
        links: [
            {
                icon: 'icon-twitter',
                label: 'Twitter',
                href: props.detail?.twitterUrl,
            },
            { label: 'Telegram', href: props.detail?.telegramUrl },
            { label: 'Discord', href: props.detail?.discordUrl },
            {
                icon: 'icon-facebook',
                label: 'Facebook',
                href: props.detail?.facebookUrl,
            },
        ].filter((item) => item.href),
    },
    { label: t('chain'), text: props.detail?.chains?.length ? props.detail.chains[0]?.name : '--' },
    { label: t('genre'), text: props.detail?.gameType || '--' },
    { label: t('download_link'), link: true, href: props.detail?.windows_download_url || '' },
    { label: t('language'), text: props.detail?.gameLanguages || '--' },
]);
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
