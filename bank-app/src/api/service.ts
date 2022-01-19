import axios from "axios";
import { User } from "../models/user";

const API_URL = "https://team-hthb-bank-app-api.herokuapp.com/api";

let userFromAPI: User | null;

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
        userFromAPI = response.data;
        // console.log(userFromAPI);
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

  getUserFromAPI(): User | null {
    return userFromAPI;
  }

  logout() {
    localStorage.removeItem("token");
    userFromAPI = null;
  }

  register(user: User) {
    let firstName = user.firstName;
    let lastName = user.lastName;
    let email = user.email;
    let phoneNumber = user.phoneNumber;
    let address = user.address;
    let password = user.password;

    return axios.post<User>(API_URL + "/createUser", {
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