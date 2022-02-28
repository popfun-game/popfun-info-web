<template>
    <layout-default>
        <div
            class="flex-1 body-bg"
            style="margin-bottom: 40px;"
        >
            <div class="wrapper">
                <infor-menu style="margin-top: 27px;" />

                <!-- 类型table -->
                <i-table active="game" />
            </div>
        </div>
    </layout-default>
</template>
<script setup>
import layoutDefault from '@/components/layouts/Default';
import InforMenu from '@/components/InforMenu';
import iTable from './components/Table';
</script>
<style lang="scss" scoped>
.table-wrapper {
    margin-top: 40px;
}
</style>
