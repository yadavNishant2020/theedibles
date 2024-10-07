<template>
    <Layout>
        <chat></chat>

        <section class="payment_main">
            <div class="container">
                <div class="row">
                    <div class="col-md-6 mx-auto mt-5">
                        <div class="payment">
                            <div class="content">

                                <div class="row">
                                    <div class="col-md-3 col-3"></div>
                                    <div class="col-md-6 col-6">
                                        <g-image src="~/assets/img/404.png" alt="404"/>

                                    </div>
                                </div>
                                <a class="hreflind" href="/">Go to Home</a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
</template>

<script>
    import Chat from '~/components/Chat'

    export default {
        components: {Chat},

        name: "404"
    }
</script>


<style scoped>
    .payment_main {
        height: 100vh;

    }

    .payment_main .container {
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .payment {
        border: 1px solid #f2f2f2;
        height: auto;
        border-radius: 20px;
        background: #fff;
        padding-bottom: 26px;
        box-shadow: 1px 1px 20px 0px #e6e4e44a;
    }

    .payment_header {
        background: #4caf50;
        padding: 20px;
        border-radius: 20px 20px 0px 0px;

    }

    .check {
        margin: 0px auto;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background: #fff;
        text-align: center;
    }

    .check i {
        vertical-align: middle;
        line-height: 50px;
        font-size: 30px;
    }

    .content {
        text-align: center;
    }

    .content h1 {
        font-size: 25px;
        padding-top: 25px;
    }

    .content p {
        margin-bottom: 10px;
    }

    .content img {
        text-align: center;
        margin: auto;
        width: 100%;
        margin-bottom: 20px;
        margin-top: 20px;
    }


</style>
