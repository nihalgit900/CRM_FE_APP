import axios from "axios";

export function getallusers(data){
                return axios.get("http://localhost:8000/crm/api/v1/users",{
                    headers :{
                        'x-access-token':localStorage.getItem("token")
                    }
                })

}