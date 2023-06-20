import { useState } from "react";





    const Tickethandler=(ticket)=>{

       

      
        const data={
            open:0,
            closed:0,
            inprogress:0,
            blocked:0
     }
    
     ticket.forEach(ticket => {
        if(ticket.status==="OPEN")
     {
        data.open+=1;
     }
     else if(ticket.status==="PROGRESS"){
        data.inprogress+=1;
     }
     else if(ticket.status==="CLOSED"){
        data.closed+=1;
     }
    else{
        data.blocked+=1;
    }
        
     });
    console.log(data)
     
    return data
    }
    
    
    export default Tickethandler
    
 