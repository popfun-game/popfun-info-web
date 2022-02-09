<template>
    <div class="game-head mt24 flex-row-space-between flex-wrap">
        <div class="left flex-1">
            <div class="flex-row flex-items-center">
                <div class="flex-shrink-0">
                    <auto-img
                        :src="detail.image?.small ? detail.image.small : loading ? '' : '--'"
                        width="100px"
                        height="100px"
                        radius="8px"
                    />
                </div>
                <div class="flex-col ml16">
                    <h2 class="fz24 lh24 font-bold color-1">
                        {{ detail.chain || '--' }}
                    </h2>
                    <p class="mt16 price font-bold color-1 flex-row flex-items-center">
                        <span>{{ info.price }}</span>
                        <span
                            v-if="info.change !== ''"
                            class="flex-row flex-items-center fz20"
                            :class="{
                                'color-up': info.change > 0,
                                'color-down': info.change < 0,
                            }"
                        >
                            <i
                                v-if="info.change > 0"
                                class="icon-up mr4 ml12 fz16"
                            />
                            <i
                                v-if="info.change < 0"
                                class="icon-down mr4 ml12 fz16"
                            />
                            {{ info.change }}%
                        </span>
                    </p>
                </div>
            </div>
            <ul class="flex-row flex-wrap mt24">
                <li>
                    <p class="label">
                        {{ t('total_supply') }}
                    </p>
                    <p class="mt8 fz14 lh22 color-1 font-bold">
                        --
                    </p>
                </li>
                <li>
                    <p class="label">
                        {{ t('full_diluter_valuation') }}
                    </p>
                    <p class="mt8 fz14 lh22 color-1 font-bold">
                        {{ info.fdv }}
                    </p>
                    <p class="mt8 lh22 font-bold">
                        <span
                            class="flex-row flex-items-center fz14 font-bold"
                            :class="{
                                'color-up': info.change > 0,
                                'color-down': info.change < 0,
                            }"
                        >
                            <i
                                v-if="info.change > 0"
                                class="icon-up mr4 fz12"
                            />
                            <i
                                v-if="info.change < 0"
                                class="icon-down mr4 fz12"
                            />
                            {{ info.change }}%
                        </span>
                    </p>
                </li>
                <li>
                    <p class="label">
                        {{ t('circulating_supply') }}
                    </p>
                    <p class="mt8 fz14 lh22 color-1 font-bold">
                        --
                    </p>
                </li>
                <li>
                    <p class="label">
                        {{ t('market_cap') }}
                    </p>
                    <p class="mt8 fz14 lh22 color-1 font-bold">
                        {{ info.mkp }}
                    </p>
                    <p class="mt8 lh22 font-bold">
                        <span
                            class="flex-row flex-items-center fz14 font-bold"
                            :class="{
                                'color-up': info.change > 0,
                                'color-down': info.change < 0,
                            }"
                        >
                            <i
                                v-if="info.change > 0"
                                class="icon-up mr4 fz12"
                            />
                            <i
                                v-if="info.change < 0"
                                class="icon-down mr4 fz12"
                            />
                            {{ info.change }}%
                        </span>
                    </p>
                </li>
            </ul>
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
                <span
                    v-else-if="item.chain"
                    class="chain flex-row flex-items-center cursor-pointer"
                    @click="onCopy(item.text)"
                >
                    {{ item.text }}
                    <el-icon
                        class="ml8"
                        color="var(--main-color)"
                    >
                        <copy-document />
                    </el-icon>
                </span>
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
import { toFixed, toFormat } from '@/utils/number';
import { getPrecision } from '@/utils/tool';
import { CopyDocument } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { copyText } from 'vue3-clipboard';

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

const info = computed(() => {
    const { detail } = props;
    const change = detail.simple_price?.usd_24h_change;
    const marketCap = detail.simple_price?.usd_market_cap;
    const fdv = detail?.market_data?.fully_diluted_valuation?.usd;
    const mkpChange = detail?.market_data?.market_cap_change_percentage_24h_in_currency?.usd;

    const map = {
        symbol: detail.symbol ?? '--',
        total_supply: '--',
        price: detail.simple_price?.usd ? `$${toFormat(detail.simple_price.usd)}` : '--',
        change: change ? toFixed(detail.simple_price.usd_24h_change, 2) : '',
        fdv: fdv ? `$${toFormat(fdv, getPrecision(fdv))}` : '--',
        circulating_supply: '--',
        mkp: marketCap ? `$${toFormat(marketCap, getPrecision(marketCap))}` : '--',
        mkp_change: mkpChange ? toFixed(mkpChange, 2) : '',
        kline: [1, 2, 3, 4, 5, 10, 1, 2, 6, 20],
    };

    return map;
});
const infoList = computed(() => {
    const links = props.detail?.links || {};

    return [
        { label: t('contract_address'), chain: true, text: 'abcdefghighk' },
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
    ];
});

const onCopy = (message) => {
    copyText(message, undefined, (error) => {
        if (error) {
            ElMessage.error(t('tip_copy_error'));
        } else {
            ElMessage.success(t('tip_copy_success'));
        }
    });
};
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

        .price {
            font-size: 32px;
        }

        li {
            flex: 1;
            padding-right: 8px;

            .label {
                font-weight: bold;
                font-size: 12px;
                line-height: 22px;
                color: var(--text-color-6);
                white-space: nowrap;
            }
        }
    }

    .info {
        max-width: 500px;

        // stylelint-disable-next-line
        .label {
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

        .chain {
            border-bottom: 1px dashed var(--text-color-9);
            user-select: none;
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
