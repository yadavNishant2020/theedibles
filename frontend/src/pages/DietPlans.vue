<template>
    <Layout>

        <chat></chat>

        <banner :title="bannerTitle" :description="bannerDesc" :image="bannerImage"></banner>
        <!--    blog-->

        <diet-plan-card :diets="diets"  ></diet-plan-card>

        <!--    blog ends -->

        <div class="container">
            <x-title :title="'Coming Soon'"></x-title>
        </div>


        <diet-plan-card :diets="comingSoonDietPlans"></diet-plan-card>

    </Layout>
</template>

<page-query>
    query {
    strapi {
    dietPlans(
    where: { type: "on_going" }
    ){
    id
    title
    slug
    menu{
    dishes{
    images{
    url
    }
    }
    }
    description
    seo{
    id
    title
    description
    shareImage{
    alternativeText
    url
    }
    }
    }
    home{
    seo {
    title
    description
    shareImage {
    id
    url
    }
    }
    }
    }
    }
</page-query>

<script>
    import {getStrapiMedia} from '~/utils/medias'
    import {getMetaTags} from '~/utils/seo'
    import DietPlanCard from '~/components/DietPlanCard'
    import Banner from '~/components/Banner'
    import Chat from '~/components/Chat'
    import XTitle from '~/components/XTitle'
    import axios from 'axios'

    export default {
        data() {
            return {
                bannerDesc: `<h3 style="font-size: 20px;color: #000000;text-align: left" class=" mb-3">Have our customized finger-licking good and nutrition filled meals from our kitchen to your table</h3>`,
                bannerImage: '/assets/img/home-banner.356ead81.jpg',
                bannerTitle: 'Diet plans',
                diets: [],
                 comingSoonDietPlans: [],
            }
        },
        methods: {
            getStrapiMedia,
            async fetchDietPlans($type, $limit) {

                try {
                    const results = await axios.get(
                        getStrapiMedia('/diet-plans?type=' + $type + '&_limit=' + $limit)
                    );

                    return results.data;


                } catch (error) {

                    console.log(error)
                }
            }

        },
        components: {DietPlanCard, Chat, Banner, XTitle},
        created() {

            this.diets = this.$page.strapi.dietPlans;
        },
        async mounted() {
            this.comingSoonDietPlans = await this.fetchDietPlans('comming_soon', 10);
        },
        metaInfo() {
            const {title, description, shareImage} = this.$page.strapi.home.seo
            const image = getStrapiMedia(shareImage.url);
            return {
                title: "Diet Plans",
                meta: getMetaTags(title, description, image),
            }
        },
    }
</script>

<style scoped>

</style>
