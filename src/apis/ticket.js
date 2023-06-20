import axios from "axios";

export async function gettickets(data){
    
                return await axios.get("http://localhost:8000/crm/api/v1/tickets",{
                    headers :{
                        'x-access-token':localStorage.getItem("token")
                    }
                })

}

export async function updateticketdetails(data){
 
    return axios.put(`http://localhost:8000/crm/api/v1/tickets/${data._id}`,data,{
        headers :{
            'x-access-token':localStorage.getItem("token")
        }
    })

}