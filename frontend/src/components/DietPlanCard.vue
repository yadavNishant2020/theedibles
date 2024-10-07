<template>

    <div class="container DietPlans">

        <div class="row mt-5 mb-5" v-for="(diet,indx) in diets" :key="indx">
            <div class="col-md-3" v-if="indx % 2 === 0">
                <g-image :src="getDietImage(diet)" width="255" alt="weightloss"></g-image>
            </div>
            <div class="col-md-9">
                <div class="wpb_wrapper">
                    <h2 class="">{{ diet.title }}</h2>
                    <p v-html="diet.description"></p>


                    <div class="mt-5 mb-3">
                        <g-link class="hreflind "
                                :to="'diet-plans/'+diet.slug" :title=" diet.title ">Learn more
                        </g-link>
                    </div>
                </div>
            </div>
            <div class="col-md-3" v-if="indx % 2 !== 0">
                <g-image :src="getDietImage(diet)" width="255" alt="weightloss"></g-image>
            </div>
        </div>
    </div>

</template>

<script>

    import {getStrapiMedia} from '~/utils/medias'

    export default {
        name: "DietPlanCard",
        props: ['diets'],
        created() {

        },
        mounted() {

        },
        methods: {
            getStrapiMedia,

            getDietImage(diet) {

                if (diet.menu && typeof diet.menu.dishes === 'object' && typeof diet.menu.dishes[0] === 'object')
                    return getStrapiMedia(diet.menu.dishes[0].images[0].url)
            },
        }
    }
</script>

<style scoped>

</style>
