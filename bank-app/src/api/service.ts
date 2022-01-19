import axios from "axios";

const API_URL = "https://team-hthb-bank-app-api.herokuapp.com/api";

class Service {
  login(username:string,password:string){

       axios.post(API_URL+"/authenticate",{
          username,
          password
      })
      .then(response=>{
          if(response.data.token){
            localStorage.setItem("token",JSON.stringify(response.data));
          }
      }).catch(error => {
        console.error(error.error);
    });

  }  

getUser(email:string){
  const token= localStorage.getItem("token");
  if(token){
  const val=JSON.parse(token);
  console.log("Bearer "+val.token);
  
  axios.post(API_URL+"/getUser",{email: email }, {
    headers: {
        'token': 'Bearer '+val.token,
        'Content-Type': 'application/json',
    }
})
.then(response => {
    console.log(response.data);
    return response.data;
})
.catch(
  (error) => console.log( error.response ) );
}
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

export default new Service();