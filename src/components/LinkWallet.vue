<template>
    <section>
        <el-dialog
            :model-value="modelValue"
            :title="t('connect_wallet')"
            width="640px"
            :close-on-click-modal="false"
            :before-close="methods.beforeClose"
        >
            <div
                v-loading="loading"
                class="flex-col wallet-list"
            >
                <a
                    :href="supportMetaMask ? 'javascript:;' : 'https://metamask.io/'"
                    :target="supportMetaMask ? '_self' : '_blank'"
                    class="flex-row flex-items-center"
                    @click="connectMetaMask"
                >
                    <img
                        src="@/assets/images/metamask.png"
                        alt="metamask"
                    >
                    {{ supportMetaMask ? t('meta_mask') : t('install_meta_mask') }}
                </a>
                <a
                    href="javascript:;"
                    class="flex-row flex-items-center"
                    @click="connectWallet(false)"
                >
                    <img
                        src="@/assets/images/wallet-connect.png"
                        alt="metamask"
                    >
                    {{ t('wallet_connect') }}
                </a>
                <a
                    href="javascript:;"
                    class="flex-row flex-items-center"
                    @click="connectTorus"
                >
                    <img
                        src="@/assets/images/torus.svg"
                        alt="metamask"
                    >
                    {{ t('torus') }}
                </a>
                <a
                    href="javascript:;"
                    class="flex-row flex-items-center"
                    @click="methods.tip"
                >
                    <img
                        src="@/assets/images/binance.png"
                        alt="metamask"
                    >
                    {{ t('binance') }}
                </a>
            </div>
        </el-dialog>
    </section>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';
import useWallet from '@/hooks/wallet';
import { ElMessage } from 'element-plus';

defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['update:modelValue']);

const { t } = useI18n();
const {
    loading,
    supportMetaMask,
    connectMetaMask,
    connectWallet,
    connectTorus,
} = useWallet();

const methods = {
    // 关闭
    beforeClose() {
        emit('update:modelValue', false);
    },
    tip() {
        ElMessage.warning('Feature still in development');
    },
};

</script>
<style lang="scss" scoped>
:deep(.el-dialog) {
    overflow: hidden;

    .el-dialog__header {
        background: #f7f7f7;
        color: rgb(17, 17, 17);
        padding: 26px 70px 26px 40px;
        font-weight: 600;

        .el-dialog__headerbtn {
            top: 26px;
        }
    }
}

.wallet-list {
    padding: 0 40px;

    a {
        height: 152px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        font-size: 28px;
        font-weight: 600;
        color: rgb(17, 17, 17);

        img {
            width: 52px;
            height: 52px;
            margin-right: 16px;
        }

        &:hover {
            color: var(--main-color);
        }
    }
}
</style>
