import Sidebar from "../components/Sidebar"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { gettickets,updateticketdetails } from "../apis/ticket";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import { getallusers,updateuserstatus } from "../apis/users";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Fetchtickethook from "../customhooks/Fetchtickethook";
import Status from "../components/Status";



function Admin(){

    const [ticketdata,fetchtickets]=Fetchtickethook()

    
    const defaultMaterialTheme = createTheme();


 var usertype=localStorage.getItem("name");

 //var [ticketdata,Setticketdata] = useState([{}]);

 var [userdata,Setuserdata]=useState([{}]);

 var [ticket,Setticket]= useState([{}]);

 var [ticketupdatemodal,Setticketupdatemodal]= useState(false);

 var [updateticket,Setupdateticket] = useState({});

 var [currentticket,Setcurrentticketdetail]=useState({})
 
 var [currentusereditdata,Setcurrentusereditdata] = useState({})
 
 var [userupdatemodal,Setuserupdatemodal]= useState(false)



 useEffect(()=>{
    //fetchtickets();
    getalluserdetails();
    
    
 },[])

 const getalluserdetails=()=>{
    getallusers()
    .then((res)=>{
        Setuserdata(res.data)
        console.log(userdata)

    })

    .catch((err)=>{
        console.log(err)
    })
 }

/*const fetchtickets=()=>{
    gettickets()
    .then((res)=>{
     
        Setticket(res.data)
        setticketdetails(res.data)
        console.log(res.data)

    })
    .catch((e)=>{
        console.log(e)
    })


}

const setticketdetails=(ticket)=>{

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
 else if(ticket.status==="INPROGRESS"){
    data.inprogress+=1;
 }
 else if(ticket.status==="CLOSED"){
    data.closed+=1;
 }
else{
    data.blocked+=1;
}
    
 });

 
Setticketdata({...data})
console.log(ticketdata)




}*/
var setrowdata=(rowdata)=>{
    console.log(rowdata)
    Setticketupdatemodal(true)
    Setcurrentticketdetail(rowdata)
   

}

var editticket=(e)=>{

    var name = e.target.name;

    console.log(name)

    if(name==="title"){
        
        currentticket.title=e.target.value
    }
    else if(name==="description"){
        currentticket.description=e.target.value
    }

    else if(name==="status"){
        currentticket.status=e.target.value
    }
    else if(name==="assignee"){
        currentticket.assignee=e.target.value
    }
    else if(name==="ticketPriority"){
        currentticket.ticketPriority=e.target.value
    }
    
   Setcurrentticketdetail({...currentticket})

    

}
 var closeeditticketmodal=()=>{
    Setticketupdatemodal(false);
 }
    var editticketdetails=(e)=>{

        e.preventDefault();
        updateticketdetails(currentticket)
        .then(()=>{
            console.log("ticket is updated")
            Setticketupdatemodal(false)
            fetchtickets()
           


        })

        .catch((e)=>{
            console.log(e)

        }  
        )
      }

      var userdataedit=(rowdata)=>{
        Setuserupdatemodal(true);
        Setcurrentusereditdata(rowdata);

       
      }
      var closeuserupdatemodal=()=>{
        Setuserupdatemodal(false);
      }

      var userstatusupdate=(e)=>{
        console.log(e.target.value)
        var name = e.target.name
        if(name==="status"){
            currentusereditdata.userStatus =e.target.value;

        }
        Setcurrentusereditdata({...currentusereditdata})
        console.log(currentusereditdata)
      }
      var userstatusapicall=(e)=>{

        var userdata={
            _id:currentusereditdata._id,
            status:currentusereditdata.userStatus,
        }

    e.preventDefault();
        updateuserstatus(userdata).then((res)=>{
            if(res.status==200){
            console.log("user status updated")
            Setuserupdatemodal(false)
           
            }
        })
        .catch((e)=>{
            console.log("hello")
            console.log(e.message)
        })
      }

    return (
        
        <div className="row bg-light" >

              <div className="col-1">
      
                <Sidebar/>
           
                  </div>
            <div className="col  my-4">
                <Status ticketdetails={ticketdata} />

               
                        <br />
                        <div style={{ maxWidth: '100%' }}>
            <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          onRowClick ={(e,rowdata)=>{userdataedit(rowdata)}} 
          columns={[
            { title: 'USER_ID', field: 'userId' },
            { title: 'NAME', field: 'name' },
            { title: 'EMAIL', field: 'email'},
            { title: 'ROLE', field: 'userTypes' },
            { title: 'STATUS', field: 'userStatus' },
          ]}
          data={userdata}
          
          title="Customer Details"
        />
        </ThemeProvider>
        <Modal
        show={userupdatemodal}
        onHide={closeuserupdatemodal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user status</Modal.Title>
        
    

        </Modal.Header>
        <Modal.Body>
      
        <form onSubmit={userstatusapicall}>
        <p>id : {currentusereditdata._id}
        </p>
       

       <label>name</label> <input className="input-group" disabled name="name" value={currentusereditdata.name} ></input>
       <label>userID</label> <textarea className="input-group" disabled name="userID" value={currentusereditdata.userId} ></textarea>
       <label>email</label> <input className="input-group"disabled name="email" value={currentusereditdata.email} ></input>
       <label>userStatus</label> <select className="input-select" name="status" value={currentusereditdata.userStatus}  onChange={userstatusupdate}>
        <option>PENDING</option>
        <option>BLOCKED</option>
        <option>APPROVED</option>
        <option>REJECTED</option>   </select><br />
    
       <label>userTypes</label> <input className="input-group" disabled name="userTypes" value={currentusereditdata.userTypes} ></input>
       <Button variant="secondary" onClick={closeuserupdatemodal} >
            Close
          </Button>
          <Button type="submit" variant="primary">Update</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      
      </Modal>

        
      </div>
      <hr />
                         <div style={{ maxWidth: '100%' }}>
      <ThemeProvider theme={defaultMaterialTheme}>
        
        <MaterialTable
        onRowClick = {(e,rowdata)=>{setrowdata(rowdata)}}
          columns={[
            { title: 'TICKET ID', field: '_id' },
            { title: 'TITLE', field: 'title' },
            { title: 'DESCRIPTION', field: 'description' },
            { title: 'REQUESTOR', field: 'requestor' },
            { title: 'PRIORITY', field: 'ticketPriority' },
            { title: 'ASSIGNEE', field: 'assignee' },
            { title: 'STATUS', field: 'status' },

          ]}
          data={ticketdata}

          title="TICKET RECORDS"

               
        />
         </ThemeProvider>
         <Modal
        show={ticketupdatemodal}
        onHide={closeeditticketmodal}
       
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update ticket details</Modal.Title>
        
    

        </Modal.Header>
        <Modal.Body>
      
        <form onSubmit={editticketdetails}>
        <p>id : {currentticket._id}
        </p>
       

       <label>title</label> <input className="input-group" name="title" value={currentticket.title} onChange={editticket}></input>
       <label>description</label> <textarea className="input-group" name="description" value={currentticket.description} onChange={editticket}></textarea>
       <label>status</label> <input className="input-group" name="status" value={currentticket.status} onChange={editticket}></input>
       <label>assignee</label> <input className="input-group" name="assignee" value={currentticket.assignee} onChange={editticket}></input>
       <label>ticketPriority</label> <input className="input-group" name="ticketPriority" value={currentticket.ticketPriority} onChange={editticket}></input>
       <Button variant="secondary" onClick={closeeditticketmodal} >
            Close
          </Button>
          <Button type="submit" variant="primary">Update</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
         
        </Modal.Footer>
      
      </Modal>

      </div>
        
 
 
     


                   

  </div>
                

            </div>
            
            
            
      
    
   
          

 
    
    

        

        
      
    )
}

export default Admin