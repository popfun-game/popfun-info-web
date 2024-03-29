<template>
    <nav>
        <div class="wrapper">
            <div class="scroller flex-row flex-items-center">
                <router-link
                    :to="replacePath('/')"
                    clsss="flex-shrink-0"
                >
                    <svg-icon
                        name="logo"
                        color="#2A64FB"
                    />
                </router-link>
                <el-menu
                    class="flex-1"
                    :default-active="path"
                    mode="horizontal"
                    router
                >
                    <template
                        v-for="(item,index) in state.route_list"
                        :key="item.path"
                    >
                        <li
                            v-if="item.out"
                            style="margin-left: 36px;"
                        >
                            <a
                                class="el-menu-item"
                                style="margin-left: 0;"
                                :href="item.path"
                            >
                                {{ item.name }}
                            </a>
                        </li>
                        <el-sub-menu
                            v-else-if="item.children?.length"
                            popper-class="reset-tooltip"
                            :index="index"
                        >
                            <template #title>
                                {{ item.name }}
                            </template>
                            <el-menu-item
                                v-for="child in item.children"
                                :key="child.path"
                                :index="child.path"
                            >
                                {{ child.name }}
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item
                            v-else
                            :index="item.path"
                        >
                            {{ item.name }}
                        </el-menu-item>
                    </template>
                </el-menu>
                <div class="flex-row flex-items-center">
                    <lang v-if="false" />
                    <div
                        v-if="currentAccount"
                        class="wallet-btn flex-row flex-items-center"
                    >
                        <img
                            src="@/assets/images/wallet-icon.png"
                            width="16"
                            height="16"
                            alt=""
                            class="mr4"
                        >
                        {{ currentAccount }}
                    </div>
                    <button
                        v-else
                        class="btn-primary"
                        @click="state.visible_wallet = true"
                    >
                        {{ t('btn_link_wallet') }}
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <link-wallet v-model="state.visible_wallet" />
</template>
<script setup>
import { reactive, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import svgIcon from '@/components/SvgIcon';
import useWallet from '@/hooks/wallet';
import LinkWallet from '@/components/LinkWallet';
import Lang from './Lang';

const route = useRoute();
const { t } = useI18n();

const { account } = useWallet();
const state = reactive({
    visible_wallet: false,
    route_list: [
        { path: replacePath('/'), name: t('nav_home') },
        { path: replacePath('/igo/'), name: t('nav_igo'), out: true },
        { path: replacePath('/nft/'), name: t('nav_nft'), out: true },
        {
            name: t('nav_infor'),
            children: [
                { path: replacePath('/markets/'), name: t('nav_market') },
                { path: replacePath('/information/'), name: t('nav_information') },
                { path: replacePath('/strategy/'), name: t('nav_strategy') },
                { path: replacePath('/learn/'), name: t('nav_learn') },
            ],
        },
        { path: replacePath('/about-us/'), name: t('nav_about_us') },
    ],
});

const path = computed(() => (route.path.endsWith('/') ? route.path : `${route.path}/`));
// 当前链接账号
const currentAccount = computed(() => (account.value.replace(/\s/g, '').length ? account.value.replace(/(.{6}).+(.{4})/, '$1...$2') : ''));

watch(
    () => currentAccount.value,
    (val) => {
        if (val) state.visible_wallet = false;
    },
);
</script>
<style lang="scss" scoped>
nav {
    border-bottom: 1px solid rgba(17, 17, 17, 0.05);

    .el-menu {
        border-bottom: 0;
        padding: 21px 0;

        .el-menu-item,
        .el-sub-menu {
            margin-left: 36px;
            height: 37px;
            border-radius: 4px;
            font-weight: bold;
            font-size: 16px;
            color: var(--text-color-1);
            border-bottom: 0;
            line-height: 1;
        }

        :deep(.el-sub-menu) {
            .el-sub-menu__title {
                border-bottom: none !important;
                font-size: 16px;

                .el-sub-menu__icon-arrow {
                    font-family: 'aamc', sans-serif;
                    font-style: normal;
                    margin-top: 2px;
                    margin-left: 8px;

                    &::before {
                        content: "\e909";
                    }

                    svg {
                        display: none;
                    }
                }
            }

            &.is-opened .el-sub-menu__title,
            .el-sub-menu__title:hover {
                color: var(--main-color);
            }
        }

        .el-menu-item {
            &:hover {
                background-color: transparent;
                color: var(--main-color);
            }

            &.is-active {
                background-color: var(--main-color);
                color: #fff !important;
            }
        }
    }

    .btn-primary {
        padding: 6px 16px;
        height: 34px;
        margin-left: 28px;
        min-width: 130px;
    }

    .wallet-btn {
        background: #fff;
        border: 1px solid #2a64fb;
        box-sizing: border-box;
        border-radius: 4px;
        font-weight: 500;
        font-size: 14px;
        line-height: 22px;
        color: #111;
        padding: 8px 14px;
        margin-left: 28px;
    }
}
</style>
