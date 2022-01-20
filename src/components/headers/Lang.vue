<!-- 标签提示 -->
<!-- Gwei 算力介绍 -->
<template>
    <el-tooltip
        ref="tooltip"
        placement="bottom-end"
        effect="light"
        popper-class="reset-tooltip"
    >
        <template #content>
            <div class="list">
                <el-input
                    v-model="state.input"
                    clearable
                    placeholder="Search"
                >
                    <template #prefix>
                        <el-icon> <Search /> </el-icon>
                    </template>
                </el-input>
                <ul v-if="langList.length">
                    <li
                        v-for="(item, index) in langList"
                        :key="index"
                        class="flex-row flex-items-center font-bold fz14 lh22"
                        :class="{
                            'is-active': locale === item.long,
                            'is-title': item.title,
                            'is-disabled': langs.indexOf(item.long) === -1
                        }"
                        @click="onClick(item.long)"
                    >
                        {{ item.label }}
                        <span v-if="item.short">{{ item.short }}</span>
                    </li>
                </ul>
            </div>
        </template>
        <span class="button flex-row flex-items-center cursor-pointer lh16 fz12">
            {{ langMap[locale]?.label }}
            <i class="icon-arrow-bottom ml4" />
        </span>
    </el-tooltip>
</template>
<script setup>
import { ref, reactive, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Search } from '@element-plus/icons-vue';
import { setLang } from '@/lang/i18n';
import { langs } from '@/config/setup';

const { t, locale } = useI18n();
const tooltip = ref(null);
const state = reactive({
    input: '',
    popular_list: [
        { long: 'en-us', short: 'EN', label: 'English' },
        { long: 'zh-cn', short: 'ZH', label: '简体中文' },
    ],
    other_list: [
        { long: 'zh-tw', short: 'ZH-TW', label: '繁体中文' },
    ],
});

const langList = computed(() => {
    const input = String(state.input).replace(/\s+/g, '');
    let popularList = [...state.popular_list];
    let otherList = [...state.other_list];

    if (input) {
        popularList = popularList.filter((item) => item.long.indexOf(input) !== -1 || item.label.indexOf(input) !== -1);
        otherList = otherList.filter((item) => item.long.indexOf(input) !== -1 || item.label.indexOf(input) !== -1);
    }

    if (popularList.length) popularList.unshift({ label: t('lang_popular'), title: true });
    if (otherList.length) otherList.unshift({ label: t('lang_all'), title: true });

    return [...popularList, ...otherList];
});
const langMap = computed(() => {
    const map = {};

    [...state.popular_list, ...state.other_list].forEach((item) => {
        map[item.long] = item;
    });

    return map;
});

const onClick = (lang) => {
    if (lang === locale.value || langs.indexOf(lang) === -1) return;
    setLang(lang, true);
    tooltip.value.open = false;
};
</script>
<style lang="scss" scoped>
.button {
    padding: 2px 8px;
    border-radius: 4px;
    color: var(--text-color-1);

    i {
        transform: scale(0.7);
    }
}

.list {
    :deep(.el-input) {
        margin-top: 2px;

        .el-input__inner {
            height: 36px;
            border-width: 2px;
        }

        .el-input__prefix {
            left: 10px;
        }

        .el-input__prefix-inner {
            align-items: center;

            i {
                font-size: 16px;
                color: var(--text-color-9);
            }
        }
    }

    ul {
        margin-top: 12px;

        li {
            border-radius: 4px;
            color: var(--text-color-1);
            padding: 8px 10px;
            cursor: pointer;
            margin-top: 12px;
            user-select: none;

            &:not(.is-title):hover,
            &:not(.is-title).is-active {
                background: rgba(102, 102, 102, 0.08);
            }

            &.is-disabled {
                cursor: not-allowed;
                color: var(--text-color-9);
            }

            &.is-title {
                line-height: 22px;
                color: var(--text-color-9);
                cursor: default;
                padding-top: 0;
                padding-bottom: 0;
                font-weight: 300;
            }

            span {
                color: var(--text-color-9);
                margin-left: 6px;
            }
        }
    }
}
</style>
