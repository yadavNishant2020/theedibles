<template>
    <div class="row">
        <div class="col-md-12 col-12 mb-5" v-if="goals.length" v-for="(goal,ind) in goals" :key="ind">
            <input type="radio" class="input-radio " value="weight-Loss" :name="'setyourgoal'"
                   :checked="selectedGoal==goal.code"
                   @click="selectGoal(goal.code)"
                   :id="goal.code">
            <label :for="goal.code" class="radio ">
                <g-image class="setgoalsicon icon-color" :src="getStrapiMedia(goal.icon.formats.thumbnail.url)"
                         width="35"/>
                {{goal.title}}</label>
        </div>
    </div>
</template>


<script>

    import {getStrapiMedia} from '~/utils/medias'

    export default {
        name: "Goal",
        mounted() {
        },
        data() {
            return {}
        },
        props: ['goals', 'selectedGoal'],
        methods: {
            getStrapiMedia,
            selectGoal(val) {

                this.$emit('goalSelected', val)
            }
        }
    }
</script>

<style scoped>

</style>
