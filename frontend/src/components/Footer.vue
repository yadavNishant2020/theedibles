<template>
  <!--
      <footer class="mt-24 pt-8 pb-8 bg-gray-200">
        <p class="container text-xl font-medium">
          {{ $static.strapi.global.siteName }}
        </p>
        <div class="container mt-6 flex flex-col-reverse md:flex-row justify-between gap-6 md:gap-0">
          &lt;!&ndash; Site name, contact email and copyright &ndash;&gt;
          <div class="flex flex-col gap-2">
            <p>{{ $static.strapi.global.contactEmail }}</p>
            <p class="text-gray-600">
              Copyright {{ new Date().getFullYear() }}
            </p>
          </div>
          &lt;!&ndash; Site pages &ndash;&gt;
          <ul class="flex flex-col gap-2">
            <li
              v-for="page in pages"
              :key="page.path"
            >
              <g-link
                :to="page.path"
                class="py-1"
              >
                {{ page.title }}
              </g-link>
            </li>
          </ul>
          &lt;!&ndash; Social network links &ndash;&gt;
          <ul class="flex flex-col gap-1 md:-mt-1">
            <li
              v-for="socialNetwork in $static.strapi.global.socialNetworks"
              :key="socialNetwork.id"
            >
              <a
                :href="socialNetwork.url"
                target="_blank"
                rel="noopener noreferrer"
                class="py-1 flex flex-row items-center gap-2"
              >
                <img
                  :src="getStrapiMedia(socialNetwork.icon.url)"
                  :alt="socialNetwork.title"
                  class="w-4"
                />
                <span>{{ socialNetwork.title }}</span>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    -->

  <footer class="blog-footer fluid-container">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 col-sm-12 text-center flogo">
          <a href="/">
            <g-image
              src="~/assets/img/logo.png"
              alt="Edibles footer logo"
              width="100"
              style="    width: 100px;"
            />
          </a>
        </div>
        <div class="col-lg-3 col-md-6 col-sm-12 address">
          <h6>ADDRESS</h6>
          <p>
            Fork Over Knifes Private Limited 681-A, Rainbow Gardens,
            Changampuzha Nagar P.O, Ernakulam, Kerala, 682022
          </p>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-12 fphone">
          <h6>PHONE</h6>
          <p>+91 8156969507</p>
          <br />
          <h6>Email</h6>
          <p>contactus@theedibles.in</p>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6 flink">
          <h6>QUICK LINKS</h6>
          <div class="menu-quick-links-container">
            <ul id="menu-quick-links" class="menu">
              <li
                id="menu-item-661"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-661"
              >
                <a href="/my-account/">My Account</a>
              </li>
              <li
                id="menu-item-619"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-619"
              >
                <a href="/aboutus/">About Us</a>
              </li>
              <li
                id="menu-item-980"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-980"
              >
                <a href="/select-your-plans/">Select Your Plans</a>
              </li>
              <li
                id="menu-item-838"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-838"
              >
                <a href="/privacy-policy/">Privacy Policy</a>
              </li>
              <li
                id="menu-item-839"
                class="menu-item menu-item-type-post_type menu-item-object-page menu-item-839"
              >
                <a href="/terms-and-conditions/">Terms and Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-2 col-md-4 col-sm-6 socialfooter">
          <h6>FOLLOW US</h6>
          <a
            target="_blank"
            href="https://www.facebook.com/Edibles-104177824692198/"
            ><i class="fa fa-facebook" aria-hidden="true"></i
          ></a>
          <a
            target="_blank"
            href="https://instagram.com/edibleskochi?igshid=5fl2v0a94yab"
            ><i class="fa fa-instagram" aria-hidden="true"></i
          ></a>
        </div>
      </div>

      <hr />

      <div class="copyright">
        <p>Copyright 2020-2021 Edible - All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { getStrapiMedia } from "~/utils/medias";

export default {
  methods: {
    getStrapiMedia,
  },
  computed: {
    pages() {
      // Select random project index
      const { projects } = this.$static.strapi;
      const randomIndex = Math.floor(Math.random() * projects.length);
      return [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "About",
          path: "/about",
        },
        {
          title: "Random project",
          path: `/project/${projects[randomIndex].slug}`,
        },
      ];
    },
  },
};
</script>

<static-query>
    query {
    strapi {
    global {
    siteName
    contactEmail
    socialNetworks {
    id
    url
    title
    icon {
    id
    url
    }
    }
    }
    }
    }
</static-query>
