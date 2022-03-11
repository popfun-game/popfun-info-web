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
import idleImg from '@/assets/images/index/idle.jpg';
import tapImg from '@/assets/images/index/tap.jpg';
import cardTitle from './CardTitle';

const { t } = useI18n();
const state = reactive({
    list: [
        {
            id: '',
            img: idleImg,
            title: 'Idle Stoneage',
            raise: '100K',
            time: 'March',
            links: [
                {
                    icon: 'telegram',
                    href: 'https://t.me/IdleStoneage',
                },
                {
                    icon: 'twitter',
                    href: 'https://twitter.com/IdleStoneage',
                },
                {
                    icon: 'discord',
                    href: 'https://discord.com/invite/WNdjYRP45T',
                },
            ],
        },
        {
            id: '2',
            img: tapImg,
            title: 'Tap Fantasy ',
            raise: '200K',
            time: 'February',
            links: [
                {
                    icon: 'telegram',
                    href: 'https://t.me/tap_fantasy',
                },
                {
                    icon: 'twitter',
                    href: 'https://twitter.com/tapfantasy2021',
                },
                {
                    icon: 'discord',
                    href: 'https://discord.com/invite/tapfantasy',
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
