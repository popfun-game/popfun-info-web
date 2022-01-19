<template>
    <layout-default>
        <section class="flex-1 pb20">
            <coin-scroll :list="state.coin_list" />

            <Banner style="margin-bottom: 48px;" />

            <div class="wrapper">
                <h3 style="margin-bottom: 40px;">
                    {{ t('learn_title_article') }}
                </h3>
                <card-list />

                <crypto-info />

                <h3
                    class="mb24"
                    style="margin-top: 84px;"
                >
                    {{ t('learn_about_aamc') }}
                </h3>

                <tabs
                    v-model="state.current_tab"
                    :list="state.tabs"
                    style="margin-bottom: 38px;"
                />
                <card-list />

                <our-mission />
            </div>
        </section>
    </layout-default>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import layoutDefault from '@/components/layouts/Default';
import Tabs from '@/components/Tabs';
import coinScroll from './components/CoinScroll';
import Banner from './components/Banner';
import cardList from './components/CardList';
import cryptoInfo from './components/CryptoInfo';
import ourMission from './components/OurMission';

const { t } = useI18n();
const state = reactive({
    coin_list: [
        {
            coin: 'Bitcoin',
            currency: 'BTC',
            price: '$341234.2134',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png',
        },
        {
            coin: 'Bitcoin',
            currency: 'BTC',
            price: '$341234.2134',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png',
        },
        {
            coin: 'Bitcoin',
            currency: 'BTC',
            price: '$341234.2134',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png',
        },
        {
            coin: 'Bitcoin',
            currency: 'BTC',
            price: '$341234.2134',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png',
        },
        {
            coin: 'Bitcoin',
            currency: 'BTC',
            price: '$341234.2134',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png',
        },
        {
            coin: 'Bitcoin',
            currency: 'BTC',
            price: '$341234.2134',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png',
        },
        {
            coin: 'Bitcoin',
            currency: 'BTC',
            price: '$341234.2134',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png',
        },
        {
            coin: 'Bitcoin',
            currency: 'BTC',
            price: '$341234.2134',
            icon: 'https://s2.coinmarketcap.com/static/img/coins/32x32/3408.png',
        },
    ],
    current_tab: 'all',
    tabs: [
        { id: 'all', label: t('learn_tab_all') },
        { id: 'announcements', label: t('learn_tab_announcements') },
        { id: 'explorer', label: t('learn_tab_explorer') },
        { id: 'marketing', label: t('learn_tab_marketing') },
    ],
});
</script>
<style lang="scss" scoped>

.wrapper {
    overflow: hidden;
}

h3 {
    color: var(--text-color-0);
    font-weight: bold;
    font-size: 28px;
    line-height: 22px;
}
</style>
