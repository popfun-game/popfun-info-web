<!-- 新闻卡片 -->
<template>
    <a
        href=""
        class="card"
        :class="{'is-vertical': vertical}"
    >
        <div
            v-if="vertical"
            class="img"
        >
            <img
                src="https://s2.coinmarketcap.com/static/cloud/img/news/placeholder1.jpg"
                alt=""
            >
        </div>
        <div :class="{'flex-row': !vertical}">
            <div :class="{'min-wrap': !vertical}">
                <h3
                    class="font-bold fz22 lh22 text-ellipsis-2"
                    :class="{'mt16': vertical}"
                >
                    TA: Bitcoin Key Indicators Suggest A Strengthening Case For Move Below $40K Case For Move Below $40K Case For Move Below $40K
                </h3>
                <p class="info text-ellipsis-3">
                    While Bitcoin critics claim this means that BTC is
                    losing its first-mover competitive advantage, others
                    are anticipating the “altcoin season” is just around the corner, or might even be already underway anticipating the
                    “altcoin season” is just around the corner, or might even be already underway.
                </p>
            </div>
            <div
                v-if="!vertical"
                class="img flex-self-flex-start"
            >
                <img
                    src="https://s2.coinmarketcap.com/static/cloud/img/news/placeholder1.jpg"
                    alt=""
                >
            </div>
        </div>
        <div class="flex-row flex-wrap flex-items-center fz16">
            <span class="color-1 font-bold">NewsCoin</span>
            <i class="color-9 pl4 pr4">·</i>
            <span class="color-3">5 hours ago</span>
            <span class="tag font-bold color-1 lh22 flex-row flex-items-center ml8">
                <img
                    src="https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"
                    alt=""
                    width="20"
                    height="20"
                    class="mr4"
                >
                coin
            </span>
        </div>

    </a>
</template>
<script setup>
import { defineProps } from 'vue';

defineProps({
    vertical: {
        type: Boolean,
        default: true,
    },
});
</script>
<style lang="scss" scoped>
.card {
    word-break: break-word;
    display: block;

    .color-1 {
        color: var(--text-color-1);
    }

    .color-3 {
        color: var(--text-color-3);
    }

    .color-9 {
        color: var(--text-color-9);
    }

    .img {
        position: relative;
        width: 38%;
        padding-bottom: 23%;
        border-radius: 8px;

        img {
            object-fit: cover;
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            border-radius: 8px;
        }
    }

    h3 {
        color: var(--text-color-1);
        margin-bottom: 16px;
    }

    .info {
        color: var(--text-color-6);
        font-size: 16px;
        line-height: 28px;
        margin-bottom: 20px;
    }

    .tag {
        padding: 4px 10px;
        background: #f5f5f5;
        border-radius: 4px;
    }

    .min-wrap {
        width: 62%;
        padding-right: 20px;
    }

    &.is-vertical {
        h3 {
            line-height: 36px;
        }

        .img {
            width: 100%;
            padding-bottom: 57%;
        }
    }
}
</style>
