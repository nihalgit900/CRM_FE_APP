import axios from 'axios';

const BASE_URL= "";

 export async function usersignup(data){

      return axios.post('http://localhost:8000/crm/api/v1/auth/signup',data)

}
export async function usersignin(data){
    return axios.post('http://localhost:8000/crm/api/v1/auth/signin',data);

}