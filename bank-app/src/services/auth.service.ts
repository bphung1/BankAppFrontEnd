import axios from "axios";
import { User } from "../models/user";

const API_URL = "http://localhost:8080/api/";

class AuthService {
  login(username:string,password:string):Promise<User>{
      let user:any;

       axios.post(API_URL+"authenticate",{
          username,
          password
      })
      .then(response=>{
          if(response.data.token){
            console.log(response.data);
            localStorage.setItem("token",JSON.stringify(response.data));
            user= axios.post(API_URL+"getUser",{
              username
            })
          }
      }).catch(error => {
        console.error(error.error);
        return undefined;
    });

    localStorage.setItem("user",JSON.stringify(user));
    return user;
  }  

  logout(){
      localStorage.removeItem("token");
  }

  register(firstName:string,lastName:string,email:string,phoneNumber:string,address:string,password:string){
      return axios.post(API_URL+"createUser",{
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