import axios from "axios";
import { User } from "../models/user";

const API_URL = "https://team-hthb-bank-app-api.herokuapp.com/api";


class AuthService {
  login(username:string,password:string){
       axios.post(API_URL+"/authenticate",{
          username,
          password
      })
      .then(response=>{
          if(response.data.token){
            console.log(response.data);
            this.setToken(response.data);
            window.localStorage.setItem("jwt", JSON.stringify(response.data));
          }
      }).catch(error => {
        console.error(error.error);
        return undefined;
    });
  }

  setToken(token: string | null) {
    axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    })
  }

  getUser(email: string): User {
    let user: any;
    axios.post(API_URL + '/getUser', {
      email
    })
    .then(res => {
      console.log(res);
      user = res;
      window.localStorage.setItem("user", JSON.stringify(res.data));
    })
    .catch(err => {
      console.log(err);
      return undefined;
    })

    return user;
  }

  logout(){
      localStorage.removeItem("token");
  }

  register(firstName:string,lastName:string,email:string,phoneNumber:string,address:string,password:string){
      return axios.post(API_URL+"/createUser",{
       firstName,
       lastName,
       email,
       phoneNumber,
       address,
       password
      });
  }

 getCurrentUser(){
     const userStr=localStorage.getItem("user");
     if(userStr) return JSON.parse(userStr);

     return null;
 }
}

export default new AuthService();