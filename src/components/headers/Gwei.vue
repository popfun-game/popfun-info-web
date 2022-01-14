<!-- Gwei 算力介绍 -->
<template>
    <el-tooltip
        :append-to-body="false"
        placement="bottom"
        effect="light"
        trigger="hover"
        popper-class="reset-tooltip"
    >
        <template #content>
            <div class="gwei-info">
                <ul class="flex-row">
                    <li>
                        <p class="lh16 mb4 pr16">
                            {{ t('slow') }}
                        </p>
                        <strong class="pr16">56 Gwei</strong>
                        <p class="lh16 mt4 pr16">
                            ～615 secs
                        </p>
                    </li>
                    <li>
                        <p class="lh16 mb4 pl16 pr16">
                            {{ t('standard') }}
                        </p>
                        <strong class="pl16 pr16 middle">57 Gwei</strong>
                        <p class="lh16 mt4 pl16 pr16">
                            ～615 secs
                        </p>
                    </li>
                    <li>
                        <p class="lh16 mb4 pl16">
                            {{ t('fast') }}
                        </p>
                        <strong class="pl16">-- Gwei</strong>
                        <p class="lh16 mt4 pl16">
                            ～615 secs
                        </p>
                    </li>
                </ul>
                <div class="support lh16 mt10 font-bold">
                    {{ t('powered_by_etherscan') }}
                </div>
            </div>
        </template>
        <slot />
    </el-tooltip>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

</script>
<style lang="scss" scoped>
.gwei-info {
    padding: 18px 6px;
    color: var(--text-color-6);

    strong {
        font-size: 16px;
        line-height: 21px;
        color: var(--text-color-1);

        &.middle {
            border: 0 solid rgba(0, 0, 0, 0.08);
            border-left-width: 1px;
            border-right-width: 1px;
        }
    }

    .support {
        background: #f9fbff;
        border-radius: 2px;
        min-height: 28px;
        padding: 6px 13px;
        color: var(--text-color-6);
    }
}
</style>
