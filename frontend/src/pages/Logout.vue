<template>

</template>

<script>
import api from "../utils/api";

export default {
name: "Logout",
   async mounted() {
     var response= await api.logout()
     if(response.success){
       this.$router.push('/sign-in')
     }
   }
}
</script>

<style scoped>

</style>