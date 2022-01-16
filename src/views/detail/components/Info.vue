<!-- 头部详情 -->
<template>
    <div class="info pt16">
        <div class="wrapper">
            <breadcrumb :list="state.breadcrumb" />

            <h3 class="flex-row flex-items-center">
                <img
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                    alt=""
                    width="32"
                    height="32"
                >
                <span class="chain ml8 mr6 font-bold">
                    {{ route.params.coin }}
                </span>
                <span class="coin font-bold"> / btc </span>
            </h3>
            <div class="flex-row">
                <div class="market font-bold">
                    <div class="flex-row flex-items-center mb14">
                        <span class="convert-u mr6">$29.1732</span>
                        <span class="change color-up flex-row flex-items-center">
                            <i class="icon-up" />3.03%
                        </span>
                        <span class="change color-down flex-row flex-items-center">
                            <i class="icon-down" />3.03%
                        </span>
                    </div>
                    <div class="convert-btc flex-row flex-items-center mb16">
                        123123.313 BTC
                        <span class="color-up flex-row flex-items-center ml12">
                            <i class="icon-up mr4 fz12" />3.03%
                        </span>
                    </div>
                    <div class="flex-row flex-items-center lh22 mb20">
                        <span class="label">{{ t('low') }}：</span>
                        <strong>$48,839.64</strong>
                        <el-progress
                            :percentage="30"
                            color="var(--main-color)"
                            text-inside
                            :show-text="false"
                        />

                        <span class="label">{{ t('high') }}：</span>
                        <strong class="mr10">$78,839.64</strong>

                        <tag-tooltip
                            :list="state.time_droplist"
                            @onClick="state.current_time = $event.value"
                        >
                            {{ t(state.current_time) }}
                        </tag-tooltip>
                    </div>
                    <ul class="tags flex-row">
                        <li class="highlight">
                            Rank #1
                        </li>
                        <li>Coin</li>
                        <li>On 2,247,123 watchlists</li>
                    </ul>
                </div>
                <div class="tag-wrap flex-1">
                    <div class="color-0 font-bold lh22 mb10">
                        {{ t('tags') }}
                    </div>
                    <div class="tag-list flex-row wrap">
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
                            <i class="icon-link fz18 mr4" />bitcoin.org
                        </a>

                        <tag-tooltip
                            :list="[
                                {value: 2, label: 'baidu', href: 'https://www.baidu.com'}
                            ]"
                        >
                            <i class="icon-search fz18 mr4" />Explorers
                        </tag-tooltip>

                        <tag-tooltip
                            :list="[
                                {value: 2, label: 'baidu', href: 'https://www.baidu.com'}
                            ]"
                        >
                            <i class="icon-people fz18 mr4" />Community
                        </tag-tooltip>

                        <a
                            href=""
                            target="_blank"
                            class="tag font-bold lh22 flex-row flex-items-center"
                        >
                            <i class="icon-code fz18 mr4" />Source code
                        </a>

                        <a
                            href=""
                            target="_blank"
                            class="tag font-bold lh22 flex-row flex-items-center"
                        >
                            <i class="icon-book fz18 mr4" />Whitepaper
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ArrowRight } from '@element-plus/icons-vue';
import breadcrumb from '@/components/Breadcrumb';
import tagTooltip from '@/components/TagTooltip';
import { replacePath } from '@/lang/i18n';

const route = useRoute();
const { t } = useI18n();
const state = reactive({
    breadcrumb: [
        { path: replacePath('/'), label: t('nav_home') },
        { path: '', label: route.params.coin },
    ],
    current_time: '24h',
    time_droplist: [
        { value: '24h', label: `${t('24h')} ${t('low_high')}` },
        { value: '1m', label: `${t('1m')} ${t('low_high')}` },
        { value: '1y', label: `${t('1y')} ${t('low_high')}` },
    ],
});
</script>
<style lang="scss" scoped>
.info {
    background-color: linear-gradient(180deg, #f9fbff 0%, #fff 100%);
    padding-bottom: 24px;

    .color-0 {
        color: var(--text-color-0);
    }

    .color-1 {
        color: var(--text-color-1);
    }

    h3 {
        margin-top: 40px;
        margin-bottom: 24px;

        .chain {
            font-weight: 600;
            font-size: 28px;
            color: var(--text-color-1);
        }

        .coin {
            color: var(--text-color-6);
        }
    }

    .market {
        width: 50%;

        .convert-u {
            font-size: 32px;
            color: var(--text-color-1);
        }

        .change {
            font-size: 20px;

            i {
                margin-right: 2px;
            }
        }

        .convert-btc {
            color: var(text-color-6);
            line-height: 22px;
        }

        .label {
            color: var(--text-color-6);
        }

        .el-progress {
            width: 124px;
            margin: 0 10px;

            :deep(.el-progress-bar__outer) {
                background-color: #eaeaea;
            }
        }

        .tags {
            margin: -5px;

            li {
                padding: 1px 8px;
                background: rgba(102, 102, 102, 0.08);
                border-radius: 4px;
                font-weight: bold;
                font-size: 14px;
                line-height: 22px;
                color: #666;
                margin: 5px;

                &.highlight {
                    background-color: var(--main-color);
                    color: #fff;
                }
            }
        }
    }

    .tag-wrap {
        .tag-list {
            margin: -5px;

            .tag {
                background: rgba(102, 102, 102, 0.08);
                border-radius: 4px;
                padding: 4px 12px;
                color: #666;
                margin: 5px;

                &.highlight {
                    background-color: rgba(42, 100, 251, 0.08);
                    color: var(--main-color);
                }
            }
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
}
</style>
