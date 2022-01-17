<!-- 币种信息 -->
<template>
    <div class="coin-info flex-1">
        <h3 class="flex-row flex-items-center">
            <img
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                alt=""
                width="32"
                height="32"
            >
            <span class="full-name ml8 mr6 font-bold">
                Bitcoin
            </span>
            <span class="short-name font-bold"> / btc </span>
        </h3>

        <div class="market">
            <div class="flex-row flex-items-center font-bold mb14">
                <span class="convert-u mr6">$29.1732</span>
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
        </div>

        <ul class="tags flex-row flex-items-center flex-wrap">
            <li class="highlight">
                Rank #1
            </li>
            <li>Coin</li>
            <li>On 2,247,123 watchlists</li>
        </ul>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import tagTooltip from '@/components/TagTooltip';

const { t } = useI18n();
const state = reactive({
    current_time: '24h',
    time_droplist: [
        { value: '24h', label: `${t('24h')} ${t('low_high')}` },
        { value: '1m', label: `${t('1m')} ${t('low_high')}` },
        { value: '1y', label: `${t('1y')} ${t('low_high')}` },
    ],
});
</script>
<style lang="scss" scoped>
.coin-info {
    max-width: 536px;
    margin-right: 10px;

    h3 {
        padding-top: 40px;
        padding-bottom: 24px;

        .full-name {
            font-weight: 600;
            font-size: 28px;
            color: var(--text-color-1);
        }

        .short-name {
            color: var(--text-color-6);
        }
    }

    .market {
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
            flex: 1;
            margin: 0 10px;
            max-width: 124px;
            min-width: 40px;

            :deep(.el-progress-bar__outer) {
                background-color: #eaeaea;
            }
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
</style>
