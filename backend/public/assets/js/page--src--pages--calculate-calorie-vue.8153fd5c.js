(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{"0Du5":function(t,e,a){"use strict";var i={name:"XTitle",props:{title:"",description:""}},r=a("KHd+"),s=Object(r.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("div",{staticClass:"text-center mt-5 mb-1"},[e("h2",{staticStyle:{"font-size":"30px",color:"#000000","text-align":"center"}},[this._v(this._s(this.title))]),e("g-image",{staticClass:"vc_single_image-img attachment-full",attrs:{src:a("pZXF"),alt:""}}),this._m(0)],1),this._t("default")],2)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"vc_empty_space",staticStyle:{height:"12px"}},[e("span",{staticClass:"vc_empty_space_inner"})])}],!1,null,"17fe5120",null);e.a=s.exports},"49Ko":function(t,e,a){"use strict";a("OhKc")},"5rCo":function(t,e,a){"use strict";var i={name:"Chat"},r=a("KHd+"),s=Object(r.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"chat"},[e("a",{attrs:{href:"https://api.whatsapp.com/send?phone=+918156969507&text=",target:"_blank"}},[e("div",{staticClass:"chat-content d-flex"},[e("div",{staticClass:"mr-1 icon-img"},[e("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",id:"whatsapp_2_","data-name":"whatsapp (2)",width:"26",height:"26",viewBox:"0 0 26 26"}},[e("g",{attrs:{id:"Group_1480","data-name":"Group 1480"}},[e("path",{attrs:{id:"Path_457","data-name":"Path 457",d:"M13,0H13A12.992,12.992,0,0,0,2.475,20.62l-1.62,4.83,5-1.6A13,13,0,1,0,13,0Zm7.564,18.358a3.668,3.668,0,0,1-2.551,1.835c-.679.145-1.566.26-4.553-.978-3.82-1.583-6.281-5.465-6.472-5.717A7.425,7.425,0,0,1,5.447,9.576,4.15,4.15,0,0,1,6.776,6.412a1.889,1.889,0,0,1,1.329-.466c.161,0,.306.008.436.015.382.016.574.039.825.642.314.756,1.077,2.621,1.168,2.813a.774.774,0,0,1,.055.7,2.247,2.247,0,0,1-.421.6c-.192.221-.374.39-.565.627-.175.206-.374.427-.153.809a11.539,11.539,0,0,0,2.109,2.621,9.557,9.557,0,0,0,3.049,1.88.822.822,0,0,0,.917-.145,15.729,15.729,0,0,0,1.016-1.345.726.726,0,0,1,.933-.283c.351.122,2.208,1.04,2.59,1.23s.634.283.726.444A3.238,3.238,0,0,1,20.568,18.358Z",fill:"#fff"}})])])]),this._m(0)])])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h6",[this._v("WhatsApp us")])])}],!1,null,"5a056205",null);e.a=s.exports},OhKc:function(t,e,a){},"Xbu+":function(t,e,a){"use strict";a.r(e);a("07d7");var i=a("VTBJ"),r=a("lIGg"),s=a("5rCo"),l={name:"Goal",mounted:function(){},data:function(){return{}},props:["goals"],methods:{getStrapiMedia:r.a,selectGoal:function(t){this.$emit("goalSelected",t)}}},o=a("KHd+"),c=Object(o.a)(l,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},t._l(t.goals,(function(e,i){return t.goals.length?a("div",{key:i,staticClass:"col-md-12 col-12 mb-5"},[a("input",{staticClass:"input-radio ",attrs:{type:"radio",value:"weight-Loss",name:"setyourgoal",id:e.code},on:{click:function(a){return t.selectGoal(e.code)}}}),a("label",{staticClass:"radio ",attrs:{for:e.code}},[a("g-image",{staticClass:"setgoalsicon icon-color",attrs:{src:t.getStrapiMedia(e.icon.formats.thumbnail.url),width:"35"}}),t._v("\n            "+t._s(e.title))],1)]):t._e()})),0)}),[],!1,null,"11526aa0",null).exports,n=a("0Du5"),u=a("e7F3"),d=a("TJPC");Object(u.c)("required",Object(i.a)(Object(i.a)({},d.c),{},{message:"This field is required"})),Object(u.c)("email",Object(i.a)(Object(i.a)({},d.a),{},{message:"Enter a valid email"})),Object(u.c)("numeric",Object(i.a)(Object(i.a)({},d.b),{},{message:"Enter a valid phone number"}));var m={name:"CalculateCalorie",components:{Datepicker:function(){return a.e(12).then(a.bind(null,"+jP+")).then((function(t){return t.Datepicker})).catch()},Chat:s.a,Goal:c,XTitle:n.a,ValidationProvider:u.b,ValidationObserver:u.a},data:function(){return{goals:[],calorieForm:{},physicalActivities:[]}},mounted:function(){this.goals=this.$page.strapi.goals,this.physicalActivities=this.$page.strapi.physicalActivities},methods:{getStrapiMedia:r.a,goalSelected:function(t){this.calorieForm.goal=t},onSubmit:function(){alert(1)}}},v=(a("49Ko"),null),p=Object(o.a)(m,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("layout",[a("chat"),a("ValidationObserver",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.handleSubmit;return[a("form",{attrs:{action:""},on:{submit:function(e){return e.preventDefault(),i(t.onSubmit)}}},[a("div",{staticClass:"container calcalory"},[a("x-title",{attrs:{title:"Calculate Calorie"}}),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12 text-right"},[a("input",{staticClass:"proceedbutton",attrs:{type:"submit",value:"Proceed"}})]),a("div",{staticClass:"col-md-3"},[a("p",[t._v("Set your goal")]),a("span",{staticClass:"setgoal"},[a("goal",{attrs:{goals:t.goals},on:{goalSelected:function(e){return t.goalSelected(e)}}})],1)]),a("div",{staticClass:"col-md-9 calform"},[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-6 mb-4"},[a("label",{attrs:{for:""}},[t._v("Physical Activity")]),a("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("select",{directives:[{name:"model",rawName:"v-model",value:t.calorieForm.activity,expression:"calorieForm.activity"}],attrs:{id:"car2s",name:"activity"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.calorieForm,"activity",e.target.multiple?a:a[0])}}},[a("option",[t._v("Select Your Activity")]),t._l(t.physicalActivities,(function(e,i){return a("option",{key:i,domProps:{value:e.id}},[t._v(t._s(e.title)+"\n                                        ")])}))],2),a("span",{staticStyle:{color:"red"}},[t._v(t._s(i[0]))])]}}],null,!0)})],1),a("div",{staticClass:"col-md-6 mb-4"},[a("label",{attrs:{for:""}},[t._v("Gender")]),a("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("select",{directives:[{name:"model",rawName:"v-model",value:t.calorieForm.gender,expression:"calorieForm.gender"}],attrs:{id:"car3s",name:"gender"},on:{change:function(e){var a=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.calorieForm,"gender",e.target.multiple?a:a[0])}}},[a("option",{attrs:{value:"male"}},[t._v("Male")]),a("option",{attrs:{value:"female"}},[t._v("Female")]),a("option",{attrs:{value:"other"}},[t._v("Other")])]),a("span",{staticStyle:{color:"red"}},[t._v(t._s(i[0]))])]}}],null,!0)})],1),a("div",{staticClass:"col-md-6 mb-4"},[a("label",[t._v("DOB")]),a("validation-provider",{attrs:{rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("ClientOnly",[a("datepicker",{attrs:{"calendar-class":"dob-calender-cls",placeholder:"DOB"},model:{value:t.calorieForm.dob,callback:function(e){t.$set(t.calorieForm,"dob",e)},expression:"calorieForm.dob"}})],1),a("span",{staticStyle:{color:"red"}},[t._v(t._s(i[0]))])]}}],null,!0)})],1),a("div",{staticClass:"col-md-6 mb-4"},[a("label",{attrs:{for:""}},[t._v("Age")]),a("validation-provider",{attrs:{rules:"required|numeric"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("input",{directives:[{name:"model",rawName:"v-model",value:t.calorieForm.age,expression:"calorieForm.age"}],staticClass:"input-text",attrs:{type:"text"},domProps:{value:t.calorieForm.age},on:{input:function(e){e.target.composing||t.$set(t.calorieForm,"age",e.target.value)}}}),a("span",{staticStyle:{color:"red"}},[t._v(t._s(i[0]))])]}}],null,!0)})],1),a("div",{staticClass:"col-md-6 mb-4"},[a("label",{attrs:{for:""}},[t._v("Height")]),a("validation-provider",{attrs:{rules:"required|numeric"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("input",{directives:[{name:"model",rawName:"v-model",value:t.calorieForm.height,expression:"calorieForm.height"}],staticClass:"input-text",attrs:{type:"text"},domProps:{value:t.calorieForm.height},on:{input:function(e){e.target.composing||t.$set(t.calorieForm,"height",e.target.value)}}}),a("span",{staticStyle:{color:"red"}},[t._v(t._s(i[0]))])]}}],null,!0)})],1),a("div",{staticClass:"col-md-6 mb-4"},[a("label",{attrs:{for:""}},[t._v("Weight")]),a("validation-provider",{attrs:{rules:"required|numeric"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[a("input",{staticClass:"input-text",attrs:{type:"text",required:""}}),a("span",{staticStyle:{color:"red"}},[t._v(t._s(i[0]))])]}}],null,!0)})],1)])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12 recommentedtxt text-center"},[a("h2",[t._v("Your recommented calorie")]),a("h1",[t._v("0"),a("span",[t._v("Calories")])]),a("button",{staticClass:"mb-3"},[t._v("Calculate")])])])],1)])]}}])})],1)}),[],!1,null,null,null);"function"==typeof v&&v(p);e.default=p.exports},pZXF:function(t,e){t.exports={type:"image",mimeType:"image/png",src:"/assets/static/group_159.175661c.4fb31de65c7ed23f1d151d76d1b4b401.png",size:{width:293,height:14},sizes:"(max-width: 293px) 100vw, 293px",srcset:["/assets/static/group_159.175661c.4fb31de65c7ed23f1d151d76d1b4b401.png 293w"],dataUri:"data:image/svg+xml,%3csvg fill='none' viewBox='0 0 293 14' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3cfilter id='__svg-blur-7cad21b71ca11cb2d51dab3cce412b8f'%3e%3cfeGaussianBlur in='SourceGraphic' stdDeviation='40'/%3e%3c/filter%3e%3c/defs%3e%3cimage x='0' y='0' filter='url(%23__svg-blur-7cad21b71ca11cb2d51dab3cce412b8f)' width='293' height='14' xlink:href='data:image/png%3bbase64%2ciVBORw0KGgoAAAANSUhEUgAAAEAAAAADCAYAAAAjpQkcAAAACXBIWXMAAAsSAAALEgHS3X78AAAB70lEQVQoz42STU9TQRSGL5H2zlwF2hhKSykgCFhDIKIuCsGFSvwEtv4AwpIFSxM3bCQhrox7E7cYlOjOjTF%2bJCaIRo1hZ6X3o3RGbBRhNT5D7w%2bwyZPzvmfeOXPSXEeHoguKMAg5FYpO26Pm4l5RB7KA74d2fAYK8b3TcWYkztm7WR2JhGr0x9H9dm607aX870fzxjiZQt/Ve9nCdTM0PLWIz4dlb1oFYswcOA55j3zr4ZwAQnGWWdfsfGpf/G6GM7tDR7z7BTjHjHHqGLlJ6h24C3MwDSXuXKTOxntPkOtxaC7AJnxgwAb1s2rob%2bg6wR10Gf2RCy/w6/hXsIrfwL%2b3oH/R%2b0MuxD9Hb8Hfek0avKn5cu%2b3cve/bKb2ThZvmOPZGXO%2bNGWq2zLarQqjArlP7p1uvLEKn5h1H14y5w31GbxFv%2bZsDZbwT/FfbQYessMjqNBbhjV6T6i3qQ9gVgfuMP4Weh49hE459qcriSM6SCSVL9IcdlBbOcyj7T/VTc3/9JMuvRaQync9kCx9TIdumkfT9HthFE6RPwED6B7qJbi8U5GTu5EoRT/kSO/Alce57puGL2GFL6AzLMtSLRBnyE2A/WLauNt%2buBtL6koz%2b7lJ69mNd93merWpCe3ZneJcG7tkVei2oD3nP3//ADTWgm48Lun0AAAAAElFTkSuQmCC' /%3e%3c/svg%3e"}}}]);