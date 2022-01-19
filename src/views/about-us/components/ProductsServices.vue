<template>
    <article>
        <div class="wrapper">
            <h3>{{ t('au_products_services') }}</h3>
            <ul class="flex-row flex-wrap">
                <li
                    v-for="(item, index) in state.list"
                    :key="index"
                    class="flex-1"
                >
                    <img
                        :src="item.icon"
                        alt=""
                        width="80"
                        height="80"
                    >
                    <h4>{{ item.title }}</h4>
                    <p v-html="item.desc" />
                </li>
            </ul>
        </div>
    </article>
</template>
<script setup>
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import icon1 from '@/assets/images/aboutUs/ps-1.png';
import icon2 from '@/assets/images/aboutUs/ps-2.png';
import icon3 from '@/assets/images/aboutUs/ps-3.png';

const { t } = useI18n();
const state = reactive({
    list: [
        { icon: icon1, title: t('au_ps_t1'), desc: t('au_ps_desc1') },
        { icon: icon2, title: t('au_ps_t2'), desc: t('au_ps_desc2') },
        { icon: icon3, title: t('au_ps_t3'), desc: t('au_ps_desc3') },
    ],
});
</script>
<style lang="scss" scoped>
article {
    overflow: hidden;
    background-color: #f9fbff;
    margin-top: 76px;
    padding-bottom: 72px;
    word-break: break-word;

    h3 {
        font-weight: bold;
        font-size: 36px;
        line-height: 47px;
        color: var(--text-color-0);
        text-align: center;
        padding-top: 48px;
        padding-bottom: 53px;
    }

    h4 {
        margin: 10px 0;
        padding: 10px;
        font-weight: bold;
        font-size: 20px;
        line-height: 26px;
        color: var(--text-color-3);
    }

    ul {
        margin: 0 -30px;

        li {
            margin: 0 30px;

            p {
                font-size: 16px;
                line-height: 26px;
                color: var(--text-color-9);
                padding: 10px;
            }
        }
    }

    @media screen and (max-width: 700px) {
        ul li {
            min-width: calc(100% - 60px);
        }
    }
}
</style>
