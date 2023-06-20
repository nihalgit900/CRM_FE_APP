
import { useState,useEffect } from "react";
import { gettickets } from "../apis/ticket";

const Fetchtickethook=()=>{
 
  
  useEffect(()=>{
     
    fetchtickets();

    
},[])

    var [ticket,Setticket]=useState([])
    
  const fetchtickets=()=>{
    
      gettickets()
      
      .then((res)=>{
        console.log(res.data)
       
  
     
     Setticket(res.data)
  
     
          console.log(ticket)
  
      })
      .catch((e)=>{
          console.log(e)
      })
  
    }
 
    return [ticket,fetchtickets]
  
  }
  export default Fetchtickethook