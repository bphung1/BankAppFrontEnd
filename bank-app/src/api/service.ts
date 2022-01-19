import axios from "axios";
import { User } from "../models/user";

const API_URL = "https://team-hthb-bank-app-api.herokuapp.com/api";

class Service {
  login = async(username: string , password: string) => {
    await axios.post(API_URL + "/authenticate", {
      username,
      password
    })
    .then(response => {
      localStorage.setItem("token", JSON.stringify(response.data));
    }).catch(error => {
      console.error(error.error);
    });
  }  

  getUser = async(email:string) => {
    const token = localStorage.getItem("token");
    if (token) {
      const val = JSON.parse(token);
      console.log("Bearer " + val.token);

      await axios.post<User>(API_URL + "/getUser", { email: email }, {
        headers: {
          'token': 'Bearer ' + val.token,
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => 
        {
          console.log(error.response)
          return undefined;
        } 
      );
    }
  }

  logout() {
    localStorage.removeItem("token");
  }

  register(firstName: string, lastName: string, email: string, phoneNumber: string, address: string, password: string) {
    return axios.post(API_URL + "/createUser", {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      password
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new Service();