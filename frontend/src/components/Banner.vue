<template>

    <div class="home-banner"  >
        <div class="container">
            <div class="row">
                <div class="offset-md-7">

                </div>
                <div class="col-md-5">
                    <div class="Devour">
                        <h2 style="color: #000000;text-align: left" class="vc_custom_heading">{{title}}</h2>
                        <div v-html="description"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Banner",
        props: {
            title: '',
            description: '',
            image: ''
        }
    }
</script>

<style scoped>

</style>
