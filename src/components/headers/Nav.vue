<template>
    <nav class="wrapper">
        <div class="scroller flex-row flex-items-center">
            <router-link
                :to="replacePath('/')"
                class="flex-row"
            >
                <svg-icon
                    name="logo"
                    color="#2A64FB"
                />
            </router-link>
            <router-link
                v-for="item in state.route_list"
                :key="item.id"
                :to="item.id"
                class="nav-item font-bold fz16 font-bold"
                :class="{'is-active': item.id === path}"
            >
                {{ item.name }}
            </router-link>
        </div>
    </nav>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import svgIcon from '@/components/SvgIcon';
import { replacePath } from '@/lang/i18n';

const route = useRoute();
const { t } = useI18n();

const state = reactive({
    route_list: [
        { id: replacePath('/'), name: t('nav_home') },
        { id: replacePath('/information/'), name: t('nav_information') },
        { id: replacePath('/strategy/'), name: t('nav_strategy') },
        { id: replacePath('/learn/'), name: t('nav_learn') },
        { id: replacePath('/about-us/'), name: t('nav_about_us') },
    ],
});

const path = computed(() => (route.path.endsWith('/') ? route.path : `${route.path}/`));
</script>
<style lang="scss" scoped>
nav {
    .scroller {
        padding: 20px 0 21px;
    }

    a {
        &.nav-item {
            color: var(--text-color-1);
            padding: 8px 20px;
            line-height: 22px;
            border-radius: 4px;
            margin-left: 36px;

            &:hover,
            &.is-active {
                background-color: var(--main-color);
                color: #fff;
            }
        }
    }
}
</style>
