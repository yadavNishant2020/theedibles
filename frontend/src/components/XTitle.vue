<template>
    <div class="row">
        <div class="col-md-12">
            <div class="text-center mt-5 mb-1">
                <h2 style="font-size: 30px;color: #000000;text-align: center; font-weight: bold;" class="">{{title}}</h2>
                <g-image src="~/assets/img/group_159.png"
                         class="vc_single_image-img attachment-full" alt=""/>
                <div class="vc_empty_space" style="height: 12px"><span class="vc_empty_space_inner"></span>
                </div>
            </div>

            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "XTitle",
        props: {
            title: '',
            description: '',
        }
    }
</script>

<style scoped>

</style>
