<template>
  <Layout>
    <chat></chat>
    <g-image class="home-banner" src="~/assets/img/about.jpg" />
    <div class="container mt-5 aboutus">
      <div class="row">
        <div class="col-md-12">
          <h6>About Edibles</h6>
        </div>
        <div class="col-md-7">
          <div class="wpb_wrapper">
            <h4
              style="color: #091e68; text-align: left"
              class="vc_custom_heading"
            >
              “Every meal is an opportunity to nourish your body.”
            </h4>
            <div class="wpb_text_column wpb_content_element aboutcont">
              <div class="wpb_wrapper">
                <p>
                  At a time when good food is a rarity, we stand apart.<br />
                  With a conviction that each morsel that is consumed should
                  serve its purpose, Edibles aims to change the way eating is
                  perceived. We believe that tickling the small intestines is as
                  important as tickling the taste buds. Backed by a strong focus
                  on making people eat and live healthy, we have embarked on a
                  journey to put in place a recipe that has Nutrition, Variety
                  and Value sandwiched between Health and Happiness. We long to
                  foster a culture of ‘meaningful eating’ through our
                  subscription-based model, meal after meal and snack after
                  snack.
                </p>
                <p>&nbsp;</p>
                <p>
                  Many aspects about us are different. From a systematic
                  follow-up process to understand how well we have served you,
                  to the free consultation on your healthy eating needs, an
                  element of uniqueness is integrated in our scheme of things to
                  make your experience better.
                </p>
                <p>
                  In company of Edibles, your door to healthy living is always
                  open. And thus, ends the craving for a wholesome grub.<br />
                  Join us in our quest to make ‘Eat Healthy to Live Healthy’ a
                  reality.<br />
                  <strong>Bon Appetit.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <g-image src="~/assets/img/about2.png" />
        </div>
      </div>
      <x-title :title="'WHAT WE ARE GOOD AT'"></x-title>
      <div class="col-md-1"></div>
      <div class=".col-md-10 mb-5">
        <div class="wpb_wrapper">
          <p style="text-align: center">
            Our team kicks the monotony out of your diet and provides wide range
            of customized meals with nutrition and taste that work with your
            lifestyle. We help you achieve your goals in a sustainable way, a
            way that lets you have a life, not just a diet.
          </p>
          <p style="text-align: center">
            Edibles provides you with a dietitian who takes care of your
            personal nutritional requirements; chefs who prepare your calorie
            counted meals to achieve your goals by understanding your body type
            and a group who is obsessed about ensuring that you are fully
            satisfied with the experience that we offer.
          </p>
          <p style="text-align: center">
            We don’t feel there’s a one-size-fits-all approach to diet so our
            team periodically follows up with you and makes necessary changes to
            your diet if necessary because educated choices lead to a better and
            healthier lifestyle
          </p>
        </div>
      </div>
      <div class="row">
        <g-image src="~/assets/img/aboutusfoot.jpg" />
      </div>
    </div>
  </Layout>
</template>


<script>
import { getStrapiMedia } from "~/utils/medias";
import { getMetaTags } from "~/utils/seo";
import api from "~/utils/api";
import Chat from "~/components/Chat";
import XTitle from "~/components/XTitle";
import Banner from "~/components/Banner";
import ProductCard from "~/components/ProductCard";

export default {
  data() {
    return {
      bannerDesc: `<h3 style="font-size: 20px;color: #000000;text-align: left" class="vc_custom_heading">
                            Have our
                            customized finger-licking good and nutrition filled meals from our kitchen to your
                            table
                        </h3>
                        <div class=" mt-5 mb-3 ">
                            <g-link class="hreflind" to="/diet-plans" title="Dishes">Explore our menu <i class="vc_btn3-icon fa fa-caret-right"></i></g-link>
                        </div>`,
      bannerImage: "/assets/img/home-banner.jpg",
      bannerTitle: "Devour deliciousness guilt free.",
      todo: {},
      ketoWeekly: [],
      ketoMonthly: [],
    };
  },
  methods: {
    getStrapiMedia,
  },
  components: { Chat, Banner, XTitle, ProductCard },
  async mounted() {
    //?diet=keto&plan=Weekly&_limit=4
    this.ketoWeekly = await api.getMealPlan(
      "plan_type=keto&duration_type=Weekly&_limit=4"
    );
    this.ketoMonthly = await api.getMealPlan(
      "plan_type=keto&duration_type=Monthly&_limit=4"
    );
  },

  metaInfo() {},
};
</script>
<style scoped>
.aboutus h6 {
  width: 250px;
  text-align: center !important;
  background: #27a12f 0% 0% no-repeat padding-box;
  font-size: 27px;
  padding: 12px;
  box-shadow: 2px 6px 12px 0px #e6e4e4;
  margin-bottom: 30px;
  color: #fff;
}
.aboutus img {
  width: 100%;
}
.aboutus h2{
    color: #091e68;
    text-align: center;
}
</style>
