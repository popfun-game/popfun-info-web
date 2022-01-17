<template>
    <layout-default>
        <div class="flex-1">
            <div class="chain-head pb24 pt16">
                <div class="wrapper">
                    <breadcrumb :list="state.breadcrumb" />

                    <div class="flex-row flex-wrap">
                        <coin-info />
                        <coin-tags />
                    </div>
                </div>
            </div>
        </div>
    </layout-default>
</template>
<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import layoutDefault from '@/components/layouts/Default';
import breadcrumb from '@/components/Breadcrumb';
import coinInfo from './components/CoinInfo';
import coinTags from './components/CoinTags';

const route = useRoute();
const { t } = useI18n();
const state = reactive({
    breadcrumb: [
        { path: replacePath('/'), label: t('nav_home') },
        { path: '', label: route.params.coin },
    ],
});
</script>
<style lang="scss" scoped>
.chain-head {
    background: linear-gradient(180deg, #f9fbff 0%, #fff 100%);
}
</style>
