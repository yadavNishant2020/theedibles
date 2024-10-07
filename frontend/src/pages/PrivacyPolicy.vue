<template>
<Layout>
	<div class="vc_empty_space" style="height: 40px"><span class="vc_empty_space_inner"></span></div>
    <div class="container">
	<div class="row">
	<div id="primary" class="content-area container">
		 <div class="wpb_wrapper">
		<!-- <h1 style="font-size: 30px;text-align: center" class="vc_custom_heading">{{ $page.strapi.privacyPolicy.title }}</h1> -->
		<h1 style="font-size: 30px;text-align: center" class="vc_custom_heading">{{ title }}</h1>
		 </div>
		 <div class="vc_empty_space" style="height: 25px"><span class="vc_empty_space_inner"></span></div>
		<!-- <div v-html="$page.strapi.privacyPolicy.content" ></div> -->
		<div v-html="content"> </div>

	</div>
	</div>
	</div>
	</Layout>
</template>

<page-query>
   query {
    strapi { privacyPolicy	
    	{
          	title
        	content
      }
    }
  }
</page-query>

<script>


export default {
	data() {
            return {
                title: "",
                content : ""
            }
        },
		async mounted() { 
			
			this.title = (this.$page.strapi.privacyPolicy) ? this.$page.strapi.privacyPolicy.title : "Privacy Policy"
			this.content = (this.$page.strapi.privacyPolicy) ? this.$page.strapi.privacyPolicy.content : "<h4>Coming soon</h4>"

		}	 
}
</script>


<style scoped>
	
</style>