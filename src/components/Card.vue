<template>
    <a href="">
        <auto-img
            src="https://s2.coinmarketcap.com/static/cloud/img/news/placeholder1.jpg"
            height="56.66%"
            radius="12px"
        />
        <p class="time"> 5h ago </p>
        <h3 class="text-ellipsis-3">
            Ezek will be released roadmap 1.0 with Airdrop for Phanta Bear NFT holdersE\
            zek will be released roadmap 1.0 with Airdrop for Phanta Bear NFT holders
        </h3>
        <span class="tag">Easy</span>
    </a>
</template>
<script setup>
import autoImg from '@/components/AutoImg';
</script>
<style lang="scss" scoped>
a {
    position: relative;
    display: block;
    word-break: break-word;

    .tag {
        position: absolute;
        right: 10px;
        top: 10px;
        padding: 2px 10px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        font-weight: bold;
        line-height: 22px;
        color: #fff;
    }

    .time {
        line-height: 28px;
        color: var(--text-color-6);
        font-size: 16px;
        font-weight: bold;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    h3 {
        font-weight: bold;
        font-size: 22px;
        line-height: 28px;
        color: var(--text-color-1);
    }
}
</style>
