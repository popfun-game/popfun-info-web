<!-- 出售代币介绍 -->
<template>
    <div class="wrap">
        <h3 class="flex-row flex-items-center font-bold fz22 lh22">
            <i class="icon-flame fz20 mr8" />
            {{ t('trending_title') }}
        </h3>

        <ul>
            <li
                v-for="(item, index) in 6"
                :key="item"
                class="flex-row-space-between flex-items-center"
            >
                <div class="flex-row flex-items-center">
                    <img
                        src="https://s2.coinmarketcap.com/static/img/coins/64x64/13994.png"
                        alt=""
                        width="32"
                        height="32"
                    >
                    <div class="ml12">
                        <p class="font-bold fz18 lh22 color-1">
                            nexo.io
                        </p>
                        <p class="lh22 color-6">
                            EarnUp to 20% APR
                        </p>
                    </div>
                </div>
                <a
                    href=""
                    class="lh22 fz12 font-bold cursor-pointer"
                    :class="{'is-light': index > 0}"
                >
                    {{ t('btn_earn_now') }}
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
.wrap {
    background: #f9fbff;
    border-radius: 8px;
    padding: 20px;

    .color-1 {
        color: var(--text-color-1);
    }

    .color-6 {
        color: var(--text-color-6);
    }

    h3 {
        margin-bottom: 24px;

        i {
            color: #f0502d;
        }
    }

    li {
        min-height: 74px;

        a {
            padding: 5px 10px;
            background: var(--main-color);
            color: #fff;
            border-radius: 4px;

            &.is-light {
                padding: 2px 8px;
                background-color: #f5f5f5;
                color: var(--text-color-6);
            }
        }
    }

    li + li {
        border-top: 1px solid rgba(0, 0, 0, 0.05);
    }
}
</style>
