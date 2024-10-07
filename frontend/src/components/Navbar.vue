<template>
    <header id="masthead" class="site-header one-edge-shadow" role="banner">
        <div class="container">
            <div class="large-view">
                <div class="row">
                    <div class="social col-sm-12">
                        <span> FOLLOW US </span>
                        <a target="_blank" href="https://www.facebook.com/Edibles-104177824692198/"><i
                                class="fa fa-facebook" aria-hidden="true"></i></a>
                        <a target="_blank" href="https://instagram.com/edibleskochi?igshid=5fl2v0a94yab"><i
                                class="fa fa-instagram" aria-hidden="true"></i></a>
                    </div>
                </div>
                <div class="row align-items-baseline mainhead">
                    <div class="col-lg-5 col-md-6 text-left header-menu">
                        <div class="menu-header-menu-container">
                            <ul id="menu-header-menu" class="menu">

                                <li class="menu-item" v-for="(menu,indx) in leftMenu" :key="menu.id"
                                    :class="getClass(menu)">

                                    <g-link :to="menu.url"
                                            class="text-uppercase"> {{ menu.name }}
                                    </g-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-2 text-center home-icon-ima">
                        <g-link to="/">

                            <g-image src="~/assets/img/logo.png" :alt="logo.alternativeText" width="85" height="85"
                                     style="width: 85px;height: 85px"/>

                        </g-link>
                    </div>


                    <div class="col-lg-5 col-md-4 text-right">

                        <div class="signhead">
                            <div class="menu-sign-container dsk">
                                <ul id="menu-sign" class="menu">


                                    <li class="menu-item" v-if="!isAuthenticated" v-for="(menu,indx) in rightMenu"
                                        :key="menu.id"
                                        :class="getClass(menu,'right')">

                                        <g-link :to="menu.url" class=""> {{ menu.name }}</g-link>
                                    </li>
                                    <li v-if="isAuthenticated" class="menu-item link test">
                                        <g-link to="/logout" class=""> Logout</g-link>

                                        <g-link to="/my-account" class="" style="margin: 10px;"> My Account</g-link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>


                </div>
            </div>

            <div class="large-view edibles-sticky-object" id="">
                <div class="container">
                    <div class="row align-items-baseline mainhead">
                        <div class="col-lg-5 col-md-6 text-left header-menu">
                            <div class="menu-header-menu-container">
                                <ul id="menu-header-menu-1" class="menu">
                                    <li class="menu-item" v-for="(menu,indx) in leftMenu" :key="menu.id"
                                        :class="getClass(menu)">

                                        <g-link :to="menu.url" class="text-uppercase"> {{ menu.name }}</g-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-2 col-md-2 text-center">
                            <g-link to="/">

                                <g-image src="~/assets/img/logo.png" :alt="logo.alternativeText" width="85" height="85"
                                         style="width: 85px;height: 85px" class="123"/>

                            </g-link>
                        </div>

                        <div class="col-lg-5 col-md-4 text-right">

                            <div class="signhead">
                                <div class="menu-sign-container">
                                    <ul id="menu-sign-1" class="menu">
                                        <li class="menu-item" v-for="(menu,indx) in rightMenu" :key="menu.id"
                                            :class="getClass(menu,'right')">

                                            <g-link :to="menu.url" class=""> {{ menu.name }}</g-link>
                                        </li>

                                    </ul>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>


            <div class="mobile-view x">
                <div class="row">
                    <div class="col-sm-6">

                        <g-link to="/">
                            <g-image v-if="typeof logo=='object'" :src="getStrapiMedia(logo.url)"
                                     :alt="logo.alternativeText" width="45" style="width: 55px"/>

                        </g-link>
                    </div>
                    <div class="col-sm-6 navburger">
                        <div id="myNav2" class="overlay">
                            <a href="javascript:void(0)" class="closebtn" @click="closeNav()">×</a>
                            <div class="overlay-content">

                                <div class="menu-header-menu-container">
                                    <ul id="menu-header-menu-2" class="menu">
                                        <li class="menu-item" v-for="(menu,indx) in leftMenu" :key="menu.id"
                                            :class="getClass(menu)">

                                            <g-link :to="menu.url" class="text-uppercase"> {{ menu.name }}</g-link>
                                        </li>
                                    </ul>
                                </div>

                                <div class="signhead">
                                    <div class="menu-sign-container">
                                        <ul id="menu-sign-2" class="menu">
                                            <li class="menu-item" v-for="(menu,indx) in rightMenu" :key="menu.id"
                                                :class="getClass(menu,'right')">

                                                <g-link :to="menu.url" class=""> {{ menu.name }}</g-link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <span class="open" @click="openNav()">☰</span>
                    </div>
                </div>
            </div>

            <div class="mobile-view edibles-sticky-object" id="myHeader">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6">

                            <g-link to="/">

                                <g-image src="~/assets/img/logo.png" :alt="logo.alternativeText"
                                         style="width: 85px;height: 85px"/>

                            </g-link>
                        </div>
                        <div class="col-sm-6 navburger">
                            <div id="myNav" class="overlay">
                                <a href="javascript:void(0)" class="closebtn" @click="closeNav()">×</a>
                                <div class="overlay-content">

                                    <div class="menu-header-menu-container">
                                        <ul id="menu-header-menu-3" class="menu">
                                            <li class="menu-item" v-for="(menu,indx) in leftMenu" :key="menu.id"
                                                :class="getClass(menu)">

                                                <g-link :to="menu.url" class="text-uppercase"> {{ menu.name }}</g-link>
                                            </li>
                                        </ul>
                                    </div>

                                    <div class="signhead">
                                        <div class="menu-sign-container">
                                            <ul id="menu-sign-3" class="menu">
                                                <li class="menu-item" v-if="!isAuthenticated"
                                                    v-for="(menu,indx) in rightMenu" :key="menu.id"
                                                    :class="getClass(menu,'right')">

                                                    <g-link :to="menu.url" class=""> {{ menu.name }}</g-link>
                                                </li>
                                                <li v-if="isAuthenticated" class="menu-item link test">
                                                    <g-link to="/logout" class=""> Logout</g-link>
                                                    <g-link to="/my-account" class="" style="margin: 10px;"> My
                                                        Account
                                                    </g-link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <span class="open" @click="openNav()">☰</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </header>

    <!--
        <div class="container p-0">

            <nav class="navbar navbar-light navbar-expand-lg">

                <ul class="navbar-nav">
                    <li class="nav-item p-0" v-for="(menu,indx) in leftMenu" :key="menu.id">

                        <g-link :to="menu.url" class="nav-link text-uppercase" :class="getClass(menu)"> {{ menu.name}}</g-link>
                    </li>

                </ul>

                <a href="#" target="_self" class="navbar-brand mx-auto home-icon-ima">
                    <g-image :src="baseUrl+logo.url" :alt="logo.alternativeText" width="54" height="54"/>
                </a>


                <ul class="navbar-nav ml-auto">
                    <li class="nav-item p-0  mr-4" v-for="(menu,indx) in rightMenu" :key="menu.id">

                        <g-link :to="menu.url" class="nav-link" :class="getClass(menu)"> {{ menu.name}}</g-link>
                    </li>

                </ul>

            </nav>
        </div>
    -->
</template>

<static-query>
    query {
    metadata {
    siteName
    }
    strapi {

    header{
    id
    TopLeftMenu{
    id
    Links{
    id
    name
    url
    classes
    type
    target
    }
    }
    TopRightMenu{
    id
    links{
    id
    name
    url
    classes
    type
    target
    }
    }
    Logo{
    id
    url
    alternativeText

    }
    }
    }
    }
</static-query>

<script>
    import {getStrapiMedia} from '~/utils/medias'


    export default {
        data() {
            return {
                leftMenu: {},
                rightMenu: {},
                isAuthenticated: false,
                userData: {},
                logo: {},
            }
        },
        components: {},
        methods: {

            getStrapiMedia,
            getClass(item, mod) {
                var additional = item.type === 'button' ? 'mt-1' : '';

                additional += (item.type === 'button' && mod === 'right') ? ' register' : (item.type === 'link' ? '' : ' ketoplans');
                return item.type + ' ' + item.classes + ' ' + additional
            },
            openNav: function () {
                document.getElementById("myNav").style.width = "100%";
            },
            closeNav: function () {
                document.getElementById("myNav").style.width = "0%";
            },
        },
        async mounted() {
            const token = localStorage.getItem('token')
            const data = localStorage.getItem('userData')
            if (token) {
                this.isAuthenticated = true;
                var userData = JSON.parse(data)
                this.userData = userData.user;
            }

            // console.log(this.userData)
            /*   try {
                   const results = await axios.get(
                       'https://jsonplaceholder.typicode.com/todos'
                   )

                   console.log(results.data);
               } catch (error) {
                   console.log(error)
               }*/

            if (typeof this.$static.strapi.header === 'object') {
                this.leftMenu = this.$static.strapi.header.TopLeftMenu.Links;
                this.rightMenu = this.$static.strapi.header.TopRightMenu.links;
                this.logo = this.$static.strapi.header.Logo[0];
            }

        }
    }

    //Meal Plans
    //Diets
    //Dishes


</script>

<style lang="css">

    .navbar .button {
        color: #fff !important;
        /* padding: 7px 15px; */
        border-radius: 5px;
        height: 30px;
        display: inline-flex !important;
        align-items: center;
    }

    .navbar .link {
        color: #000 !important;
    }

    .navbar a {
        font-size: 14px;
    }

    .home-icon-ima img {
        width: 85px;
        height: 85px;
    }

    .navbar-nav .nav-link.active {
        color: #27A12F !important;
    }

</style>
