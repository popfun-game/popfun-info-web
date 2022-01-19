<template>
    <card-title :url="replacePath('/learn/')" />
    <ul>
        <li
            v-for="(item, index) in state.list"
            :key="index"
            class="flex-row-space-between flex-wrap"
        >
            <div class="left">
                <h3
                    class="fz16 mb4 font-bold pl14"
                    v-html="item.title1"
                />
                <p
                    class="fz12 pl14"
                    v-html="item.desc1"
                />
            </div>
            <div class="right">
                <h3
                    class="fz16 mb4 font-bold pl14"
                    v-html="item.title2"
                />
                <p
                    class="fz12 pl14"
                    v-html="item.desc2"
                />
            </div>
        </li>
    </ul>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import { replacePath } from '@/lang/i18n';
import cardTitle from './CardTitle';

const { t } = useI18n();

const state = reactive({
    list: [
        {
            title1: t('learn_t1'),
            desc1: t('learn_desc1'),
            title2: t('learn_t2'),
            desc2: t('learn_desc2'),
        },
        {
            title1: t('learn_t3'),
            desc1: t('learn_desc3'),
            title2: t('learn_t4'),
            desc2: t('learn_desc5'),
        },
        {
            title1: t('learn_t5'),
            desc1: t('learn_desc5'),
            title2: t('learn_t6'),
            desc2: t('learn_desc6'),
        },
        {
            title1: t('learn_t7'),
            desc1: t('learn_desc7'),
            title2: t('learn_t8'),
            desc2: t('learn_desc8'),
        },
    ],
});
</script>
<style lang="scss" scoped>
.left {
    width: 50%;
}

.right {
    width: 50%;
}

li {
    word-break: break-word;

    h3 {
        position: relative;
        line-height: 22px;
        color: var(--text-color-3);

        &::before {
            content: "";
            position: absolute;
            width: 4px;
            height: 16px;
            left: 0;
            top: 4px;
            background-color: var(--main-color);
            border-radius: 4px;
        }
    }

    p {
        line-height: 18px;
        color: var(--text-color-6);
    }
}

li + li {
    margin-top: 40px;
}

@media screen and (max-width: 700px) {
    .left,
    .right {
        min-width: 100%;
    }

    .left {
        margin-bottom: 40px;
    }
}
</style>
