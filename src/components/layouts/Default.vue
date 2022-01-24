<template>
    <main class="flex-col-space-between">
        <header>
            <header-market v-if="false" />
            <header-nav />
        </header>
        <slot />
        <el-backtop />
        <footer
            v-if="showFooter"
            class="flex-row flex-items-center"
        >
            <div class="wrapper">
                <div class="scroller flex-row-space-between flex-items-center">
                    <svg-icon
                        name="logo"
                        class="flex-shrink-0"
                    />
                    <div class="links flex-row">
                        <a
                            href="javascript:;"
                            rel="noreferrer nofollow noopener"
                        >
                            <i class="icon-twitter" />
                        </a>
                        <a
                            href="javascript:;"
                            rel="noreferrer nofollow noopener"
                        >
                            <i class="icon-instagram" />
                        </a>
                        <a
                            href="javascript:;"
                            rel="noreferrer nofollow noopener"
                        >
                            <i class="icon-facebook" />
                        </a>
                        <a
                            href="javascript:;"
                            rel="noreferrer nofollow noopener"
                        >
                            <i class="icon-linkedin" />
                        </a>
                    </div>
                    <div class="copyright fz16 font-bold">
                        ©{{ new Date().getFullYear() }} Popfun
                    </div>
                </div>
            </div>
        </footer>
    </main>
</template>
<script setup>
import { defineProps } from 'vue';
import headerMarket from '@/components/headers/Market';
import headerNav from '@/components/headers/Nav';
import svgIcon from '@/components/SvgIcon';

defineProps({
    showFooter: {
        type: Boolean,
        default: true,
    },
});
</script>
<style lang="scss" scoped>
main {
    height: 100vh;

    header {
        padding: 24px 0;
    }

    footer {
        background-color: #12141c;
        color: #fff;
        min-height: 120px;

        .links {
            a {
                color: #fff;
                font-size: 28px;
                margin: 10px;
            }
        }

        .copyright {
            line-height: 22px;
        }
    }
}
</style>
