import axios from "axios";
import { getStrapiMedia } from "~/utils/medias";

export default {
  //?diet=keto&plan=Weekly&_limit=4
  async getMealPlan($filter) {
    try {
      const results = await axios.get(
        getStrapiMedia("/menu-planners?" + $filter)
      );

      return results.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getDishes(filter) {
    try {
      const results = await axios.get(
        getStrapiMedia("/menu-week-planners?" + filter)
      );

      return results.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getDietPlans(filter) {
    try {
      const results = await axios.get(getStrapiMedia("/diet-plans?" + filter));

      return results.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getDiets(filter) {
    try {
      const results = await axios.get(getStrapiMedia("/diets?" + filter));

      return results.data;
    } catch (error) {
      this.validateError(error);
      return [];
    }
  },

  async socialLogin(params, type) {
    try {
      var response = await axios.get(
        getStrapiMedia("/auth/" + type + "/callback?" + params)
      );
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("userData", JSON.stringify(response.data));
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.jwt;
      return { success: true, response: response.data };
    } catch (error) {
      return { success: false, response: error };
    }
  },

  async login(params) {
    try {
      var response = await axios.post(getStrapiMedia("/auth/local"), {
        identifier: params.email,
        password: params.password,
      });
      localStorage.setItem("token", response.data.jwt);
      localStorage.setItem("userData", JSON.stringify(response.data));
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + response.data.jwt;
      return { success: true, response: response };
    } catch (error) {
      return { success: false, response: error };
    }
  },

  async forgotPassword(params) {
    try {
      var response = await axios.post(getStrapiMedia("/auth/forgot-password"), {
        email: params.email,
      });
      return { success: true, response: response };
    } catch (error) {
      return { success: false, response: error };
    }
  },

  async register(params) {
    try {
      var response = await axios.post(getStrapiMedia("/auth/local/register"), {
        email: params.email,
        firstname: params.first_name,
        lastname: params.last_name,
        mobile: params.mobile,
        full_name: params.first_name + params.last_name,
        password: params.password,
        username: params.email,
      });
      return { success: true, response: response };
    } catch (error) {
      return { success: false, response: error.response };
    }
  },

  async logout() {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      delete axios.defaults.headers.common["Authorization"];
      // console.log(results.data);
      return { success: true };
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getAddress(params) {
    try {
      const results = await axios.get(getStrapiMedia("/addresses?" + params));
      return results.data;
    } catch (error) {
      console.log("Error--", error);
      return [];
    }
  },
  async saveAddress(params) {
    try {
      const results = await axios.post(getStrapiMedia("/addresses"), params);

      // console.log(results.data);
      return { success: true, data: results.data };
    } catch (error) {
      console.log(error);
      return { success: false, data: error };
    }
  },

  async getCartAddress() {
    try {
      const results = await axios.get(getStrapiMedia("/addresses/cart"));

      return { success: true, data: results.data.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  //cart
  async getCart() {
    try {
      const results = await axios.get(getStrapiMedia("/checkout/cart"));

      return { success: true, data: results.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  async addToCart(qty, mealId) {
    try {
      const results = await axios.post(getStrapiMedia("/checkout/cart"), {
        quantity: qty,
        mealPlanId: mealId,
      });

      return { success: true, data: results.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  async saveCalorieData(data) {
    try {
      const results = await axios.post(
        getStrapiMedia("/checkout/calorie"),
        data
      );

      return { success: true, data: results.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  async getCalorieData(filter) {
    try {
      const results = await axios.get(
        getStrapiMedia("/checkout/calorie?" + filter)
      );

      return { success: true, data: results.data.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  async saveAddressToCart(data) {
    try {
      const results = await axios.post(
        getStrapiMedia("/checkout/cart/address"),
        data
      );

      return { success: true, data: results.data };
    } catch (error) {
      return { success: false, data: error.response };
    }
  },

  async saveHealthAndFoodDetails(data) {
    try {
      const results = await axios.post(
        getStrapiMedia("/customer-healths"),
        data
      );

      return { success: true, data: results.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  async getHealthAndFoodDetails(filter) {
    try {
      const results = await axios.get(
        getStrapiMedia("/customer-healths?" + filter)
      );

      return { success: true, data: results.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  async saveDishesChosen(data) {
    try {
      const results = await axios.post(getStrapiMedia("/checkout/dishes"), {
        selected_dishes: data.dishIds,
      });

      return { success: true, data: results.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  async getDishesChosen(data) {
    try {
      const results = await axios.get(getStrapiMedia("/checkout/dishes"));

      return { success: true, data: results.data.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },

  async validateError(error) {
    try {
      var respose = typeof error.response == "object" ? error.response : {};
      var resposeCode = typeof respose == "object" ? respose.status : 500;
      if (resposeCode === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        delete axios.defaults.headers.common["Authorization"];
      }
      console.log(error);
    } catch (error) {
      return { success: false, data: error };
    }
  },
  async initOrder() {
    try {
      const results = await axios.post(getStrapiMedia("/orders/init"), {});

      return { success: true, data: results.data };
    } catch (error) {
      return { success: false, data: error };
    }
  },
  async completeOrder(paymentResponse) {
    try {
      const results = await axios.post(
        getStrapiMedia("/orders/complete"),
        paymentResponse
      );
      window.location.href = "/order-success?order_id=" + results.data.data.id;
    } catch (error) {
      return { success: false, data: error };
    }
  },
  async getMyProfile() {
    try {
      const results = await axios.get(getStrapiMedia("/users/me"));
      return { success: true, data: results.data };
    } catch (error) {
      console.log("Some error occured--", error);
      return { success: false, data: error };
    }
  },

  // For updating basic data of individual users
  async updateProfile(uid, params) {
    try {
      var results = await axios.put(getStrapiMedia("/users/" + uid), {
        email: params.email,
        firstname: params.firstname,
        lastname: params.lastname,
        mobile: params.mobile,
        full_name: params.full_name,
      });
      return { success: true, data: results.data };
    } catch (error) {
      console.log("Some error occured in update profile--", error);
      return { success: false, data: error };
    }
  },

  async getAddressbyId(addr_id) {
    try {
      var results = await axios.get(getStrapiMedia("/addresses/" + addr_id));
      return results.data;
    } catch (error) {
      console.log("Some error occured in getAddressbyId:", error);
      return [];
    }
  },
  async deleteAddressById(addr_id) {
    try {
      var results = await axios.delete(getStrapiMedia("/addresses/" + addr_id));
      return { success: true, data: results.data };
    } catch (error) {
      console.log("Some error occured in getAddressbyId:", error);
      return { success: false, data: error };
    }
  },
  async PasswordReset(params, token) {
    try {
      var response = await axios.post(getStrapiMedia("/auth/reset-password"), {
        password: params.password,
        passwordConfirmation: params.password_confirmation,
        code: token,
      });
      return { success: true, response: response };
    } catch (error) {
      return { success: false, response: error };
    }
  },
  // @param : params. password
  // @param : params. new_password
  // @param : params. cnf_password
  async resetPassword(params) {
    if (params.new_password !== params.cnf_password) {
      this.error = "Passwords do not match.";
      return { success: false, data: this.error };
    }
    try {
      var response = await axios.post(getStrapiMedia("/password-reset"), {
        identifier: params.username,
        password: params.password,
        confirmPassword: params.cnf_password,
        newPassword: params.new_password,
      });
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error occurees-----", error);
      return { success: false, data: error.response };
    }
  },
  async updateAddressById(params) {
    try {
      var response = await axios.put(
        getStrapiMedia("/addresses/" + params.id),
        {
          full_name: params.full_name,
          phone: params.phone,
          email: params.email,
          pincode: params.pincode,
          address: params.address,
          city: params.city,
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error occured in updateAddressById-----", error);
      return { success: false, data: error.response };
    }
  },
  async getMyOrders(filter) {
    try {
      var response = await axios.get(getStrapiMedia("/orders?" + filter));
      return { success: true, data: response.data };
    } catch (error) {
      console.log("Error occured in getMyOrders-----", error);
      return { success: false, data: error.response };
    }
  },
  async sendMessage(data) {
    try {
      var response = await axios.post(getStrapiMedia("/contact-forms"), data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, data: error.response };
    }
  },
  async findDishes(filter) {
    try {
      const results = await axios.get(getStrapiMedia("/dishes?" + filter));

      // console.log(results.data);
      return results.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
  async lineItemUpdate(lineitem_id, params) {
    try {
     // console.log("API Paramas--", params);
      var results = await axios.put(
        getStrapiMedia("/orders/lineitem-update/" + lineitem_id),
        {
          order_id: params.order_id,
          current_date: params.current_date,
          new_date: params.new_date,
        }
      );
   //   console.log("API Response123--", results.data.success);
      return {
        success: results.success,
        data: results.data,
        message: results.message,
      };
    } catch (e) {
      console.log(e);
      return [];
    }
  },
  async lineItemDishUpdate(lineitem_id, params) {
    try {
      var results = await axios.put(
        getStrapiMedia("/orders/lineitem-dish-update/" + lineitem_id),
        {
          params,
        }
      );

      return { data: results.data };
    } catch (e) {
      console.log(e);
      return [];
    }
  },
};
