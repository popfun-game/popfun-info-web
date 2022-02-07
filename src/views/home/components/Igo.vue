<template>
    <card-title
        :url="replacePath('/igo/')"
        title="nav_igo"
    />
    <div class="list-wrap">
        <ul class="flex-row flex-wrap">
            <li
                v-for="(item, index) in state.list"
                :key="index"
            >
                <a
                    class="card"
                    :href="item.id ? replacePath(`/igo/${item.id}`) : 'javascript:;'"
                >
                    <auto-img
                        :src="item.img"
                        width="100%"
                        height="100%"
                        radius="8px"
                    />
                    <p class="text-align-center  lh18 mt18">{{ item.tag }}</p>
                    <h3 class="text-align-center text-ellipsis mt8">{{ item.title }}</h3>
                    <p class="p-1 flex-row-center mt8">{{ t('total_raise') }}：<b>{{ item.raise }}</b></p>
                    <div
                        v-if="item.links?.length"
                        class="links flex-row-center flex-items-center mt8"
                    >
                        <a
                            v-for="link in item.links"
                            :key="link.icon"
                            :href="link.href"
                            target="_blank"
                            rel="noreferrer nofollow noopener"
                            @click.stop
                        >
                            <i :class="`icon-${link.icon}`" />
                        </a>
                    </div>
                    <p class="p-1 text-align-center mt8">{{ t('time') }}：{{ item.time }}</p>
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
            tag: 'abcd',
            title: 'HIMO WORLD',
            raise: '3000K',
            time: 'January',
            links: [
                {
                    icon: 'telegram',
                    href: 'http://www.baidu.com',
                },
                {
                    icon: 'facebook',
                    href: 'http://www.baidu.com',
                },
                {
                    icon: 'instagram',
                    href: 'http://www.baidu.com',
                },
            ],
        },
        {
            id: '1',
            img: 'https://image.pop.fun/WqTUjVdy6lyXMv3La-rrsklfG4JTipCX8tmcQ-kitLy1L0uaglKHkYS7hCqjKfC4G3GXce5RgNkMTtDULuIvjQ__',
            tag: 'abcd',
            title: 'BitHotel',
            raise: '3000K',
            time: 'January',
            links: [
                {
                    icon: 'instagram',
                    href: 'http://www.baidu.com',
                },
                {
                    icon: 'linkedin',
                    href: 'http://www.baidu.com',
                },
                {
                    icon: 'twitter',
                    href: 'http://www.baidu.com',
                },
            ],
        },
        {
            id: '1',
            img: 'https://image.pop.fun/WqTUjVdy6lyXMv3La-rrsklfG4JTipCX8tmcQ-kitLy1L0uaglKHkYS7hCqjKfC4G3GXce5RgNkMTtDULuIvjQ__',
            tag: 'abcd',
            title: 'BitHotel',
            raise: '3000K',
            time: 'January',
            links: [
                {
                    icon: 'instagram',
                    href: 'http://www.baidu.com',
                },
                {
                    icon: 'linkedin',
                    href: 'http://www.baidu.com',
                },
                {
                    icon: 'twitter',
                    href: 'http://www.baidu.com',
                },
            ],
        },
        {
            id: '1',
            img: 'https://image.pop.fun/WqTUjVdy6lyXMv3La-rrsklfG4JTipCX8tmcQ-kitLy1L0uaglKHkYS7hCqjKfC4G3GXce5RgNkMTtDULuIvjQ__',
            tag: 'abcd',
            title: 'BitHotel',
            raise: '3000K',
            time: 'January',
            links: [
                {
                    icon: 'linkedin',
                    href: 'http://www.baidu.com',
                },
                {
                    icon: 'twitter',
                    href: 'http://www.baidu.com',
                },
            ],
        },
    ],
});
</script>
<style lang="scss" scoped>
.list-wrap {
    width: 100%;
    overflow: hidden;

    ul {
        margin: 0 -13px;

        li {
            width: 25%;

            .card {
                margin: 0 13px;
                display: block;
                color: var(--text-color-9);

                h3 {
                    font-weight: bold;
                    font-size: 28px;
                    line-height: 36px;
                    color: var(--text-color-1);
                }

                .p-1 {
                    font-size: 20px;
                    line-height: 26px;
                    font-weight: bold;
                    white-space: nowrap;

                    b {
                        color: var(--text-color-1);
                    }
                }

                .links {
                    font-size: 28px;

                    a {
                        color: var(--text-color-9);
                        margin: 0 8px;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 800px) {
        ul {
            margin-bottom: -25px;

            li {
                width: 50%;
                margin-bottom: 25px;

                .card {
                    h3 {
                        font-size: 24px;
                    }

                    .p-1 {
                        font-size: 14px;
                    }
                }
            }
        }
    }
}
</style>
