import Sidebar from "../components/Sidebar"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { gettickets,updateticketdetails } from "../apis/ticket";
import { useEffect, useState } from "react";
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import { getallusers } from "../apis/users";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function Admin(){

    
    const defaultMaterialTheme = createTheme();


 var usertype=localStorage.getItem("name");

 var [ticketdata,Setticketdata] = useState([{}]);

 var [userdata,Setuserdata]=useState([{}]);

 var [ticket,Setticket]= useState([{}]);

 var [ticketupdatemodal,Setticketupdatemodal]= useState(false);

 var [updateticket,Setupdateticket] = useState({});

 var [currentticket,Setcurrentticketdetail]=useState({})

 useEffect(()=>{
    fetchtickets();
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

const fetchtickets=()=>{
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




}
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

    return (
        
        <div className="row bg-light" >

              <div className="col-1">
      
                <Sidebar/>
           
                  </div>
            <div className="col  my-4">

                <div className="container">

                   
                        <h3 className="text-primary text-center" > Welcome, {usertype} </h3>
                        <p className="text-center text-muted" > Take a quick look at your admin stats below </p>


                        <div className="row text-center">

                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow  bg-primary text-dark bg-opacity-25 border border-primary">
                                    <div className="card-body">
                                        <h5 className="mb-2" >
                                            <i className="text-primary bi bi-pencil mx-2"></i>
                                            Open
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4"> {ticketdata.open} </h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:60, height:60}}>
                                                <CircularProgressbar value={ticketdata.open} styles={buildStyles({ textColor:"red", pathColor:"darkBlue"})} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                              <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow  bg-warning text-dark bg-opacity-25 border border-warning">
                                    <div className="card-body">
                                        <h5 className="mb-2" >
                                            <i className="text-warning bi bi-lightning-charge mx-2"></i>
                                            Progress
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4"> {ticketdata.inprogress} </h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:60, height:60}}>
                                                <CircularProgressbar value={ticketdata.inprogress} styles={buildStyles({ textColor:"red", pathColor:"#AA6C39"})} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                             <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow  bg-success text-dark bg-opacity-25 border border-success">
                                    <div className="card-body">
                                        <h5 className="mb-2" >
                                            <i className="text-success bi bi-check-circle mx-2"></i>
                                            Closed
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4"> {ticketdata.closed} </h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:60, height:60}}>
                                                <CircularProgressbar value={ticketdata.closed} styles={buildStyles({ textColor:"red", pathColor:"green"})} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                             <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card cardItem shadow  bg-secondary text-dark bg-opacity-25 border border-secondary">
                                    <div className="card-body">
                                        <h5 className="mb-2" >
                                            <i className="text-dark bi bi-slash-circle mx-2"></i>
                                            Blocked
                                        </h5>
                                        <hr/>
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="text-dark mx-4"> {ticketdata.blocked} </h1>
                                            </div>
                                            <div className="col">
                                                <div style={{width:60, height:60}}>
                                                <CircularProgressbar value={ticketdata.blocked} styles={buildStyles({ textColor:"red", pathColor:"black"})} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <br />
                        <div style={{ maxWidth: '100%' }}>
            <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
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
          data={ticket}

          title="TICKET RECORDS"

               
        />
         </ThemeProvider>
         <Modal
        show={ticketupdatemodal}
        onHide={Setticketupdatemodal}
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
            
            
            
      
    
   
          

 
      </div>
    

        

        
      
    )
}

export default Admin