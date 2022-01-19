<template>
    <a href="">
        <auto-img
            src="https://s2.coinmarketcap.com/static/cloud/img/news/placeholder1.jpg"
            height="56.66%"
            radius="12px"
        />
        <h3 class="fz18 lh22 font-bold mt22">NFTS</h3>
        <h4 class="text-ellipsis-2 mt16">
            Ezek will be released roadmap 1.0 with Airdrop for Phanta Bear NFT holdersE\
            zek will be released roadmap 1.0 with Airdrop for Phanta Bear NFT holders
        </h4>
        <p class="desc color-6 fz16 lh22 mt16 text-ellipsis-4">
            Fashion brands are all about exclusivity; NFTs offer
            limited copies with proven authenticity and clout in the metaverse. Are they a match made in heaven?
        </p>
        <p class="text text-ellipsis">By Sarah Ahmed</p>
        <div class="text flex-row flex-items-center flex-wrap">
            5h ago<i class="icon-time ml16 mr4" /> 6m
        </div>
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

    .color-6 {
        color: var(--text-color-6);
    }

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

    h4 {
        font-weight: bold;
        font-size: 22px;
        line-height: 28px;
        color: var(--text-color-1);
    }

    .desc {
        min-height: 88px;
    }

    .text {
        line-height: 28px;
        font-weight: bold;
        color: var(--text-color-6);
    }
}
</style>
