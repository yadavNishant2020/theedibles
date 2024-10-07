// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import "vue-loading-overlay/dist/vue-loading.css";
import DefaultLayout from "~/layouts/Default.vue";
import "../src/assets/css/bootstrap.min.css";
import "../src/assets/css/style.css";

import axios from "axios";
import LogRocket from "logrocket";
import moment from "moment";
import VueSweetalert2 from "vue-sweetalert2";

export default function(Vue, { router, head, isClient }) {
  Vue.prototype.$http = axios;

  if (isClient) {
    try {
      LogRocket.init("q0ocw7/edibles");

      let userData = localStorage.getItem("userData");

      if (userData) {
        userData = JSON.parse(userData);

       // console.log(userData.user.email);
        LogRocket.identify(userData.user.id, {
          name: userData.user.full_name,
          email: userData.user.email,
        });
      }
    } catch (e) {
      console.log(e);
    }

    const token = localStorage.getItem("token");
    if (token) {
      Vue.prototype.$http.defaults.headers.common["Authorization"] =
        "Bearer " + token;
    }
  }
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);

  head.link.push({
    rel: "preload",
    href: "https://fonts.googleapis.com/css2?family=Roboto",
  });

  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons",
  });

  head.link.push({
    rel: "stylesheet",
    href:
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
  });

  // Add an external JavaScript before the closing </body> tag
  head.script.push({
    src: "https://code.jquery.com/jquery-3.2.1.slim.min.js",
    body: true,
  });

  head.link.push({
    rel: "stylesheet",
    href:
      "https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/10.16.0/sweetalert2.min.css",
  });

  head.script.push({
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/10.16.0/sweetalert2.min.js",
    body: true,
  });

  /*  router.beforeEach((to, from, next) => {

          if(to.matched.some(function (record){
              console.log('record=',record)
              record.meta.requiresAuth })) {
              console.log('hello matched route if')
              next()
          } else {
              console.log('hello matched route else')

              next()
          }
      })*/

  Vue.filter("formatDate", function(value) {
    if (value) {
      return moment(String(value)).format("DD MMM-YYYY");
    }
  });

  Vue.use(VueSweetalert2);
}
