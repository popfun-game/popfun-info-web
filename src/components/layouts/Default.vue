<template>
    <main class="flex-col-space-between">
        <header>
            <header-market />
            <header-nav />
        </header>
        <slot />
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
                        <a href="javascript:;">
                            <el-icon><promotion /></el-icon>
                        </a>
                        <a href="javascript:;">
                            <el-icon><promotion /></el-icon>
                        </a>
                        <a href="javascript:;">
                            <el-icon><promotion /></el-icon>
                        </a>
                        <a href="javascript:;">
                            <el-icon><promotion /></el-icon>
                        </a>
                    </div>
                    <div class="copyright fz16 font-bold">
                        ©{{ new Date().getFullYear() }} AAMC
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
import { Promotion } from '@element-plus/icons-vue';

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

    footer {
        background-color: #12141c;
        color: #fff;
        min-height: 120px;

        .links {
            a {
                color: #fff;
                font-size: 20px;
                margin: 10px;
            }
        }

        .copyright {
            line-height: 22px;
        }
    }
}
</style>
