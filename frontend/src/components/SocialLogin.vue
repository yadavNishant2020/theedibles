<template>
    <div class="d-flex justify-content-center  mb-3">

        <a href="#"
           title="Login with google">
            <i class="fa fa-google"></i>
        </a>
        <a href="#"
           title="Login with facebook"><i class="fa fa-facebook"></i>
        </a>

    </div>
</template>

<script>
    import firebase from "firebase";

    export default {
        name: "SocialLogin",
        mounted() {
            var firebaseConfig = {
                apiKey: "AIzaSyAaC3WmChtGUA7HwgzxSIRzNMUTXKfGgu4",
                authDomain: "theedibles-ca0f4.firebaseapp.com",
                projectId: "theedibles-ca0f4",
                storageBucket: "theedibles-ca0f4.appspot.com",
                messagingSenderId: "521053327006",
                appId: "1:521053327006:web:2013b414954e7de690358f",
                measurementId: "G-9YQ8B63P6F"
            };
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.analytics();

        },
        data() {
            return {}
        },
        created() {
        }
        , methods: {}
    }
</script>

<style scoped>

</style>
