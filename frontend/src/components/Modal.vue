<template>
    <div id="myModal" class="modal" :style="isModalOpen? 'display:block': 'display:none' ">

        <!-- Modal content -->
        <div class="modal-content">
            <slot/>

        </div>

    </div>
</template>

<script>
    export default {
        name: "Modal",
        props: ['isModalOpen'],
        data() {
            return {}
        },
        methods: {

        }
    }
</script>

<style scoped>

    /* The Modal (background) */
    .modal {
        display: none; /* Hidden by default */
        position: fixed; /* Stay in place */
        z-index: 4; /* Sit on top */
        padding-top: 100px; /* Location of the box */
        left: 0;
        top: 0;
        width: 100%; /* Full width */
        height: 100%; /* Full height */
        overflow: auto; /* Enable scroll if needed */
        background-color: rgb(0, 0, 0); /* Fallback color */
        background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
    }

    /* Modal Content */
    .modal-content {
        background-color: #fefefe;
        margin: auto;
        /*padding: 20px;*/
        border: 1px solid #888;
        width: fit-content;
        border-radius: 12px;
    }

    /* The Close Button */
    .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
    }

    .close:hover,
    .close:focus {
        color: #000;
        text-decoration: none;
        cursor: pointer;
    }
</style>
