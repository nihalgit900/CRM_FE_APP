

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Tickethandler from '../handlers/Tickethandler';


const Status =(props) =>{
     
    console.log(props.ticketdetails)

    const statusdata=Tickethandler(props.ticketdetails);
   

    const usertype= localStorage.getItem("name")

   


    return(

<div className="col  my-4">


<div className="container">

   
        <h3 className="text-primary text-center" > Welcome, {usertype} </h3>
        <p className="text-center text-muted" > Take a quick look at your Engineer stats below </p>


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
                                <h1 className="text-dark mx-4"> {statusdata.open} </h1>
                            </div>
                            <div className="col">
                                <div style={{width:60, height:60}}>
                                <CircularProgressbar value={statusdata.open} styles={buildStyles({ textColor:"red", pathColor:"darkBlue"})} />
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
                                <h1 className="text-dark mx-4"> {statusdata.inprogress} </h1>
                            </div>
                            <div className="col">
                                <div style={{width:60, height:60}}>
                                <CircularProgressbar value={statusdata.inprogress} styles={buildStyles({ textColor:"red", pathColor:"#AA6C39"})} />
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
                                <h1 className="text-dark mx-4"> {statusdata.closed} </h1>
                            </div>
                            <div className="col">
                                <div style={{width:60, height:60}}>
                                <CircularProgressbar value={statusdata.closed} styles={buildStyles({ textColor:"red", pathColor:"green"})} />
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
                                <h1 className="text-dark mx-4"> {statusdata.blocked} </h1>
                            </div>
                            <div className="col">
                                <div style={{width:60, height:60}}>
                                <CircularProgressbar value={statusdata.blocked} styles={buildStyles({ textColor:"red", pathColor:"black"})} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        </div>
        </div>


)
        }

        export default Status