<template>
    <el-tabs
        :model-value="path"
        @tab-click="handleClick"
    >
        <el-tab-pane
            v-for="item in state.menu_list"
            :key="item.path"
            :label="item.name"
            :name="item.path"
        />
    </el-tabs>
</template>
<script setup>
import { reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { replacePath } from '@/lang/i18n';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const state = reactive({
    menu_list: [
        { path: replacePath('/information/'), name: t('nav_information') },
        { path: replacePath('/strategy/'), name: t('nav_strategy') },
        { path: replacePath('/learn/'), name: t('nav_learn') },
    ],
});

const path = computed(() => (route.path.endsWith('/') ? route.path : `${route.path}/`));

const handleClick = (tab) => {
    router.push(tab.props.name);
};
</script>
