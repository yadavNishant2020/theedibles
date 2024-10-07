<template>
    <Layout>

        <chat></chat>

        <div class="container-fluid" style="padding: 0px;    position: relative;">
            <h2 class="hero-text">{{ $page.strapi.dietPlans[0].title }}</h2>
            <g-image :src="getStrapiMedia($page.strapi.dietPlans[0].banner.url)" alt="" class="banner-image"/>
        </div>


        <div class="container headyellolinh2">
            <x-title :title="$page.strapi.dietPlans[0].title">
                <div class="col-md-12 dismincontent">
                    <p>{{$page.strapi.dietPlans[0].description}}</p>
                </div>
            </x-title>

            <div class="container headyellolinh2">
                <x-title :title="'Peek into our menu'"></x-title>

                <div class="row dishes">
                    <div class="col-lg-4 col-md-6 col-sm-12" v-for=" (dish,indx) in  diet.menu.dishes">
                        <div class="dishcolumn">
                            <div class="carousel slide carousel-fade" data-ride="" data-interval="1000">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <g-image width="300" height="250" :src="getStrapiMedia(dish.images[0].url)"
                                                 style="height: 250px"/>
                                    </div>

                                </div>

                            </div>
                            <h6> {{dish.name}} </h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="container">
            <div class="row">
                <div class="col-md-12 mb-5 text-center mt-5">
                    <g-link class="hreflind" to="/">Explore our Plans <i class="vc_btn3-icon fa fa-caret-right"></i>
                    </g-link>

                </div>
            </div>
        </div>

        <contact-form></contact-form>

    </Layout>
</template>

<page-query>
    query ($slug: String!) {
    strapi {
    dietPlans(where: { slug: $slug }) {
    id
    title
    slug
    banner{
    url
    }
    menu{
    dishes{
    name
    description
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
    }
    }
</page-query>

<script>
    import Chat from '~/components/Chat'
import ContactForm from '~/components/ContactForm'
import XTitle from '~/components/XTitle'
import { getStrapiMedia } from '~/utils/medias'
import { getMetaTags } from '~/utils/seo'


    export default {
        data() {
            return {
                diet: {
                    menu: {dishes: []}
                },
            }
        },
        methods: {
            getStrapiMedia,
        },
        components: {ContactForm, XTitle, Chat},
        async mounted() {
            this.diet = this.$page.strapi.dietPlans[0];
            //console.log(this.diet)
        },
        metaInfo() {
            const {title, description, shareImage} = this.$page.strapi.dietPlans[0].seo;
            const image = getStrapiMedia(shareImage.url);
            return {
                title,
                meta: getMetaTags(title, description, image),
            }
        },
    }
</script>

<style>

    .banner-image {
        object-fit: cover;
        height: 21vw;
        width: 100%;
    }

    /* Place text in the middle of the image */
    .hero-text {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
    }
</style>
