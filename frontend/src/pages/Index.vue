<template>
    <Layout>


        <div class="bd">


            <chat></chat>

            <banner :title="bannerTitle" :description="bannerDesc" :image="bannerImage"></banner>


            <div class="container">
                <div class="row">
                    <div class="col-md-12 text-center">
                        <div class="wpb_wrapper">
                            <div class="vc_empty_space" style="height: 32px"><span class="vc_empty_space_inner"></span>
                            </div>
                            <h2 style="color: #000000;text-align: center" class="vc_custom_heading">HOW OUR KITCHEN
                                WORKS</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-3 col-12">
                        <div class="d-flex flex-row iconsmeal  ">
                            <div class="wpb_single_image">
                                <g-image width="120" height="120" src="~/assets/img/breakfast@2x.png"
                                         class="vc_single_image-img attachment-full" alt=""/>
                            </div>
                            <h6 style="color: #000000;text-align: left" class="vc_custom_heading favorite">Select
                                your<br>
                                favorite meal</h6>

                        </div>

                    </div>
                    <div class="col-md-3 col-12">
                        <div class="d-flex flex-row iconsmeal  ">
                            <div class="wpb_single_image">
                                <g-image width="120" height="120" src="~/assets/img/chef@2x.png"
                                         class="vc_single_image-img attachment-full" alt=""/>
                            </div>
                            <h6 style="color: #000000;text-align: left" class="vc_custom_heading favorite">We cook
                                it</h6>

                        </div>

                    </div>
                    <div class="col-md-3 col-12">
                        <div class="d-flex flex-row iconsmeal  ">
                            <div class="wpb_single_image">
                                <g-image width="120" height="120"
                                         src="~/assets/img/outline@2x.png"
                                         class="vc_single_image-img attachment-full" alt=""/>
                            </div>
                            <h6 style="color: #000000;text-align: left" class="vc_custom_heading favorite">Then we<br>
                                deliver it</h6>

                        </div>

                    </div>
                    <div class="col-md-3 col-12">
                        <div class="d-flex flex-row iconsmeal  ">
                            <div class="wpb_single_image">
                                <g-image width="120" height="120"
                                         src="~/assets/img/dish@2x.png"
                                         class="vc_single_image-img attachment-full" alt=""/>
                            </div>
                            <h6 style="color: #000000;text-align: left" class="vc_custom_heading favorite">Ahem!<br>
                                that's it!</h6>

                        </div>

                    </div>
                </div>
                <div class="" style="height: 32px"></div>
            </div>
            <div class="whatwegootat">

                <div class="overlayd">
                    <div class="container">
                        <x-title :title="'WHAT WE ARE GOOD AT'">
                            <div class="text-center mt-1 mb-1">

                                <h3 style="font-size: 25px;color: #000000;text-align: center"
                                    class="vc_custom_heading">
                                    MAKING YOUR JOURNEY TO A HEALTHIER LIFESTYLE EASY</h3>
                                <div class="vc_empty_space" style="height: 12px"><span
                                        class="vc_empty_space_inner"></span>
                                </div>
                            </div>
                        </x-title>
                        <div class="row ">

                            <div class="col-md-4 text-center  my-auto ">
                                <div>
                                    <g-image width="264" height="265"
                                             src="~/assets/img/Group-173.png" class=""
                                             alt=""/>
                                </div>


                            </div>

                            <div class="col-md-8 ">
                                <div class="vc_empty_space" style="height: 32px"><span
                                        class="vc_empty_space_inner"></span>
                                </div>
                                <div class="wpb_wrapper">
                                    <p><span style="font-weight: 400; font-size: 16px;">Our team kicks the monotony out of your
                                    diet and provides wide range of customized meals with nutrition and taste that work
                                    with your lifestyle. We help you achieve your goals in a sustainable way, a way that
                                    lets you have a life, not just a diet.</span></p>
                                    <p>&nbsp;</p>
                                    <p><span style="font-weight: 400; font-size: 16px;">Edibles provides you with a dietitian
                                    who takes care of your personal nutritional requirements; chefs who prepare your
                                    calorie counted meals to achieve your goals by understanding your body type and a
                                    group who is obsessed about ensuring that you are fully satisfied with the
                                    experience that we offer.</span></p>
                                    <p>&nbsp;</p>
                                    <p><span style="font-weight: 400; font-size: 16px;">We don’t feel there’s a
                                    one-size-fits-all approach to diet so our team periodically follows up with you and
                                    makes necessary changes to your diet if necessary because educated choices lead to a
                                    better and healthier lifestyle.</span></p>

                                </div>

                            </div>
                        </div>


                        <div class="vc_empty_space" style="height: 32px"><span class="vc_empty_space_inner"></span>
                        </div>
                    </div>
                </div>


            </div>
            <div class="container">
                <x-title :title="'DIET PLANS'">
                    <div class="cards-list">

                        <a href="/diet-plans/low-carb-diet">
                            <div class="card 1">
                                <div class="card_image">
                                    <g-image src="~/assets/img/weightloss.jpg" width="200" height="200" quality="100"/>
                                </div>
                                <div class="card_title title-white">
                                    <p>Low carb diet</p>
                                </div>
                            </div>
                        </a>
                        <a href="/diet-plans/high-protein-diet/">
                            <div class="card 1">
                                <div class="card_image">
                                    <g-image src="~/assets/img/highprotein.jpeg" width="200" height="200"
                                             quality="100"/>
                                </div>
                                <div class="card_title title-white">
                                    <p>High protein diet</p>
                                </div>
                            </div>
                        </a>
                        <a href="/diet-plans/keto-diet/">
                            <div class="card 1">
                                <div class="card_image">
                                    <g-image src="~/assets/img/keto.jpg" width="200" height="200" quality="100"/>
                                </div>
                                <div class="card_title title-white">
                                    <p>Keto diet</p>
                                </div>
                            </div>
                        </a>
                        <a href="/diet-plans/balanced-diet">
                            <div class="card 1">
                                <div class="card_image">
                                    <g-image src="~/assets/img/WellnessDiet-1.jpg" width="200" height="200"
                                             quality="100"/>
                                </div>
                                <div class="card_title title-white">
                                    <p>Balance diet </p>
                                </div>
                            </div>
                        </a>
                        <a href="/diet-plans/disease-management-diet">
                            <div class="card 1">
                                <div class="card_image">
                                    <g-image src="~/assets/img/diseasemanagement.jpg" width="200" height="200"
                                             quality="100" fit="cover"></g-image>
                                </div>
                                <div class="card_title title-white">
                                    <p>Coming Soon</p>
                                    <p>Disease Management diet</p>
                                </div>
                            </div>
                        </a>


                    </div>

                </x-title>

            </div>
            <div class="container">
                <x-title :title="'WHY US'">
                    <h3 style="font-size: 25px;color: #000000;text-align: center" class="vc_custom_heading">
                        WE BELIEVE EATING RIGHT SHOULD BE EASY FOR EVERYONE</h3>
                </x-title>
                <div class="row">

                    <div class="col-md-6">
                        <ol class="gradient-list">
                            <li>We understand the struggle is real and are focused towards providing solutions.</li>
                            <li>We help you achieve your goal in a sustainable way.</li>
                            <li>We provide customized calorie counted meal with great taste.</li>
                            <li>We obsess over sourcing ethically grown ingredients and freshly prepared meals.</li>
                            <li>Hassle-free delivery from our kitchen to your table.</li>
                            <li>Delivered in eco-friendly and microwavable containers.</li>
                        </ol>
                    </div>
                    <div class="col-md-6 text-center  my-auto">
                        <div>
                            <g-image width="264" height="265"
                                     src="~/assets/img/Group-173.png"
                                     class="" alt=""/>
                        </div>


                    </div>
                </div>

            </div>


            <div class="container">
                <x-title :title="' CHOOSE YOUR PACKAGE'">
                    <div class="vc_empty_space" style="height: 12px">
                        <span class="vc_empty_space_inner"></span>
                    </div>
                    <h2 style="font-size: 25px;color: #2fa12f;text-align: center" class="pb-3">MONTHLY PLAN</h2>
                    <h2 style="font-size: 25px;color: #000000;text-align: center" class="pb-3">KETO PLAN</h2></x-title>

                <div class="row">
                    <div class="col-md-3 mb-4" v-for="(product,ind) in ketoMonthly" :key="ind">
                        <product-card :product="product"/>
                    </div>

                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="text-center mt-5 mb-1">

                            <h2 style="font-size: 25px;color: #2fa12f;text-align: center" class="pb-3">WEEKLY PLAN</h2>
                            <h2 style="font-size: 25px;color: #000000;text-align: center" class="pb-3">KETO PLAN</h2>
                        </div>
                    </div>

                </div>
                <div class="row">

                    <div class="col-md-3 mb-4" v-for="(product,ind) in ketoWeekly" :key="ind">
                        <product-card :product="product"/>
                    </div>
                    <div class="col-md-12 mb-5 text-center mt-5">
                        <g-link class="hreflind" to="/select-your-plans">Explore our Plans <i
                                class="vc_btn3-icon fa fa-caret-right"></i>
                        </g-link>

                    </div>

                </div>
            </div>
        </div>
    </Layout>
</template>

<page-query>
    query {
    strapi {
    # Get homepage data
    home {
    title
    bio
    banner{
    id
    content
    image {
    url
    formats

    }
    }
    # Metadata for SEO
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
    import api from '~/utils/api'
    import Chat from '~/components/Chat'
    import XTitle from '~/components/XTitle'
    import Banner from '~/components/Banner'
    import ProductCard from '~/components/ProductCard'

    export default {
        data() {
            return {
                bannerDesc: `<h3 style="font-size: 20px;color: #000000;text-align: left" class="vc_custom_heading">
                            Have our
                            customized finger-licking good and nutrition filled meals from our kitchen to your
                            table
                        </h3>
                        <div class=" mt-5 mb-3 ">
                            <a class="hreflind" href="/diet-plans" title="Dishes">Explore our menu <i class="vc_btn3-icon fa fa-caret-right"></i></a>
                        </div>`,
                bannerImage: '/assets/img/home-banner.jpg',
                bannerTitle: 'Devour deliciousness guilt free.',
                todo: {},
                ketoWeekly: [],
                ketoMonthly: [],
            }
        },
        methods: {
            getStrapiMedia,

        },
        components: {Chat, Banner, XTitle, ProductCard},
        async mounted() {

//?diet=keto&plan=Weekly&_limit=4
            this.ketoWeekly = await api.getMealPlan('plan_type=keto&duration_type=Weekly&_limit=4');
            this.ketoMonthly = await api.getMealPlan('plan_type=keto&duration_type=Monthly&_limit=4');
        },

        metaInfo() {
            const {title, description, shareImage} = this.$page.strapi.home.seo
            const image = getStrapiMedia(shareImage.url);
            return {
                title,
                meta: getMetaTags(title, description, image),
            }
        },
    }
</script>

<style>
    .vc_single_image-img {
        width: 293px;
        height: 14px;
    }

    .image-content {
        font-family: Roboto-Bold !important;

    }

    .image-content .content-title {
        color: #000000;
        text-align: left;

    }

    .container-fluid.banner {
        position: relative;
    }

    .container-fluid.banner .image-content {
        position: absolute;
        top: 30px;
        right: 20%;
        background-color: white;
        padding: 10px;


    }
</style>
