import axios from 'axios';
import { User } from '../model/user';
// import { store } from '../stores/store';

// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// axios.interceptors.request.use((config) => {
//     const token = store.commonStore.token;
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
// })

const url = 'https://team-hthb-bank-app-api.herokuapp.com/api';
class Agent {

    // public userFromAPI: Promise<User>;
    login(email: string, password: string): Promise<User>{
        let user: any;
  
        axios.post(url+"/authenticate", {
            email,
            password
        })
        .then(response => {
            if(response.data.token){
              console.log(response.data);
              window.localStorage.setItem("token", JSON.stringify(response.data));
              user = axios.post(url+"/getUser",{
                email
              })
            }
        }).catch(error => {
          console.error(error.error);
          return undefined;
      });

        localStorage.setItem("user", JSON.stringify(user));
        return user;
    }
}

export default new Agent();