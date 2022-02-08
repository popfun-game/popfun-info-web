<template>
    <card-title
        :url="replacePath('/nft/')"
        title="nav_nft"
    />
    <div class="list-wrap">
        <ul class="flex-row flex-wrap">
            <li
                v-for="(item, index) in state.list"
                :key="index"
            >
                <a
                    class="card"
                    :href="item.id ? replacePath(`/nft/${item.id}`) : 'javascript:;'"
                >
                    <auto-img
                        :src="item.img"
                        width="100%"
                        height="100%"
                        radius="8px"
                    />
                    <div class="flex-row-space-between flex-items-center mt20">
                        <span class="font-bold fz16 color-0">Mo Gbàá</span>
                        <span class="chain">BSC</span>
                    </div>
                    <div class="flex-row-space-between mt10 font-bold lh22">
                        <span class="fz12">{{ t('price') }}</span>
                        <div class="flex-col flex-items-flex-end">
                            <span class="color-0 fz16 flex-row flex-items-center">
                                <auto-img
                                    :src="item.coin_icon"
                                    width="16px"
                                    height="16px"
                                    radius="16px"
                                    small
                                    class="mr4 flex-shrink-0"
                                />
                                20,000.00 BUSD
                            </span>
                            <span class="mt4 lh14 color-9 fz12">≈ $ 19,994.00</span>
                        </div>
                    </div>
                    <div class="flex-row-space-between mt18 font-bold lh18 fz12">
                        <span>{{ t('creator') }}</span>
                        <span class="flex-row flex-items-center">
                            <auto-img
                                :src="item.coin_icon"
                                width="12px"
                                height="12px"
                                radius="12px"
                                small
                                class="mr4 flex-shrink-0"
                            />
                            BinanceCharity
                        </span>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import autoImg from '@/components/AutoImg';
import cardTitle from './CardTitle';

const { t } = useI18n();
const state = reactive({
    list: [
        {
            id: '1',
            img: 'https://image.pop.fun/WqTUjVdy6lyXMv3La-rrsklfG4JTipCX8tmcQ-kitLy1L0uaglKHkYS7hCqjKfC4G3GXce5RgNkMTtDULuIvjQ__',
            title: '--',
            summary: '--',
            // eslint-disable-next-line
            coin_icon: 'https://image.pop.fun/WqTUjVdy6lyXMv3La-rrsid9dcuApZh93TsB8BXEwGqgOdskARg9gHfHGrVvCApWK1WcRS9h3Lvoevs0tIEzcGdI2nb16Q.dumai7GjXNz4_',
        },
        {
            id: '1',
            img: 'https://image.pop.fun/WqTUjVdy6lyXMv3La-rrsklfG4JTipCX8tmcQ-kitLy1L0uaglKHkYS7hCqjKfC4G3GXce5RgNkMTtDULuIvjQ__',
            title: '--',
            summary: '--',
        },
        {
            id: '1',
            img: 'https://image.pop.fun/WqTUjVdy6lyXMv3La-rrsklfG4JTipCX8tmcQ-kitLy1L0uaglKHkYS7hCqjKfC4G3GXce5RgNkMTtDULuIvjQ__',
            title: '--',
            summary: '--',
        },
        {
            id: '1',
            img: 'https://image.pop.fun/WqTUjVdy6lyXMv3La-rrsklfG4JTipCX8tmcQ-kitLy1L0uaglKHkYS7hCqjKfC4G3GXce5RgNkMTtDULuIvjQ__',
            title: '--',
            summary: '--',
        },
    ],
});
</script>
<style lang="scss" scoped>
.list-wrap {
    width: 100%;
    overflow: hidden;

    ul {
        margin: 0 -25px;

        li {
            width: 25%;

            .card {
                margin: 0 25px;
                display: block;
                color: var(--text-color-6);

                .color-0 {
                    color: var(--text-color-0);
                }

                .color-9 {
                    color: var(--text-color-9);
                }
            }

            .chain {
                padding: 0 8px;
                height: 24px;
                line-height: 24px;
                background: rgba(102, 102, 102, 0.08);
                border-radius: 4px;
                color: var(--text-color-3);
                font-weight: bold;
            }
        }
    }

    @media screen and (max-width: 800px) {
        ul {
            margin-bottom: -25px;

            li {
                width: 50%;
                margin-bottom: 25px;
            }
        }
    }
}
</style>
