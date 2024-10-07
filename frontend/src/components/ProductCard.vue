<template>
    <div class="productcard  mx-auto">
        <g-image :src="getImage()"
                 class=""
                 alt=""/>
        <h2 class="product__title">{{product.name}}</h2>
        <h1><span class="">₹</span><span>{{product.price}}</span></h1>
        <h3>( Option {{product.id}} )</h3>
        <h6>({{product.description}})</h6>

        <form @submit.prevent="selectPlan(product.id, product.Dishes)">
            <div class="quantity buttons_added">
                <input type="button" value="-" class="minus" @click="changeQty('-')">
                <input type="number" step="1" min="1" max="" name="quantity" v-model="formData.qty"
                       title="Qty"
                       class="input-text qty text" size="4" pattern="" inputmode="">
                <input type="button" value="+" class="plus" @click="changeQty('+')">
            </div>
            <div class="form-group ">
                <button class="btn p-0">Choose</button>
            </div>

        </form>
    </div>
</template>

<script>
    import {getStrapiMedia} from '~/utils/medias'
    import api from '~/utils/api'
    import globals from '~/utils/globals'

    export default {
        name: "ProductCard",
        props: {
            product: {}
        },
        data() {
            return {
                formData: {qty: 1}
            }
        },
        computed: {

            ...globals
        },
        methods: {
            getStrapiMedia,
            changeQty(mod) {


                if (mod === "+") {
                    this.formData.qty++
                } else {
                    if (this.formData.qty > 1) {
                        this.formData.qty--;
                    }
                }
            },

            async selectPlan(mealPlanId) {

                var formData = {quantity: this.formData.qty, mealPlanId};

                try {
                    globals.redirectIfLogout(this.$router);

                    window.location.href = '/select-your-plans?quantity=' + this.formData.qty + '&mealPlanId=' + mealPlanId;

                    /*
                       await api.addToCart(this.formData.qty, mealPlanId);

                       this.$router.push({
                              path: '/select-your-plans',
                              query: formData
                          })

                          */
                } catch (e) {
                    // alert(e)
                    this.$swal.fire({text: e, icon: "error"})

                }
            },
            getImage() {
                var image = '';
                try {
                    image = this.product.image.formats.thumbnail.url;
                } catch (e) {
                    image = '';
                }
                return this.getStrapiMedia(image);
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
