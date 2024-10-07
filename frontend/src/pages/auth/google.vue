<template>
    <div>
        Please wait wile we redirecting.....
    </div>
</template>

<script>
    import api from "../../utils/api";

    export default {
        name: "google",
        async beforeCreate() {

            var paramsArray = this.$route.fullPath.split('?id_token');
            if (this.$route.query.id_token) {
                var response = await api.socialLogin('id_token' + paramsArray, 'google')

                if (response.success) {
                    window.location.href = '/';
                } else {
                    alert('Error while login');
                  //  window.location.href = '/sign-in';
                }

            }
        }
    }
</script>

<style scoped>

</style>
