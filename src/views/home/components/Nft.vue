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
                    <p class="title fz16 lh22 mt10 text-ellipsis-2">{{ item.title }}</p>
                    <p class="info fz12 lh18 mt6 text-ellipsis">{{ item.summary }}</p>
                </a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import { replacePath } from '@/lang/i18n';
import autoImg from '@/components/AutoImg';
import cardTitle from './CardTitle';

const state = reactive({
    list: [
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
                color: var(--text-color-9);
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
