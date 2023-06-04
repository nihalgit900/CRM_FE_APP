import Sidebar from '../components/Sidebar'
import Status from '../components/Status'
import { gettickets } from '../apis/ticket'
import { useState,useEffect } from 'react'

function Engineer(){

  var [ticket,Setticket]=useState([{}])
  useEffect(()=>{

    fetchtickets();
    
},[])
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

    return (
        <div>
      <Sidebar />
    
       <div>
    
          <Status props={ticket} />

        </div>
        </div>
    )
}

export default Engineer