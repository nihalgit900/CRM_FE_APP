import axios from "axios";

export async function getallusers(data){
                return axios.get("http://localhost:8000/crm/api/v1/users",{
                    headers :{
                        'x-access-token':localStorage.getItem("token")
                    }
                })

}
export async function  updateuserstatus(data){
  
    console.log(data)
    return axios.put(`http://localhost:8000/crm/api/v1/users/${data._id}`,data,{
        headers :{
            'x-access-token':localStorage.getItem("token")
        }
    })

}