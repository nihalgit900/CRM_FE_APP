import { React, useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { usersignup, usersignin } from '../apis/auth';






function Login(){

    const [issignup,setsignup]= useState(false)

    const [Userid,Setuserid]= useState("")
    const [password,Setpassword]= useState("")
    const [Username,Setusername]= useState("")
    const [email,Setemail]= useState("")
    const [Userrole,Setuserrole]= useState("CUSTOMER")
    const [meassage,Setmessage] = useState("")
    const [error,Seterror] = useState(false)

    useEffect(()=>{

          var usertype=localStorage.getItem("userType");
          var token=localStorage.getItem("token");

          if(!usertype || !token){
            return
          }
          if(usertype==="CUSTOMER"){
            window.location.href="/customer";

          }
         else if(usertype==="ADMIN"){
            window.location.href="/admin";

          }
          else{
            window.location.href="/engineer";
          }

    },[])

    const togglesignup=() => {
      setsignup(!issignup)
      clearstate();
      Seterror(false)

    }

    const signupcall=(e)=>{
     
      

       const data= {
          name : Username,
          userId:Userid,
          email:email,
          userType:Userrole,
          password:password,
        }
        e.preventDefault();
       if(Userid.length<5)
       {
              Seterror(true)
              Setmessage("userid should be more than 5 characters")
              return;
             
       }
       else if(password.length<8 || password.length>12){
              Seterror(true)
              Setmessage("Password can be of length 8 and less then 12")
              return;

       }
           
       usersignup(data)
       .then((res)=>{
              Seterror(false)
              Setmessage("Signup Sucessfull..! ")
              window.location.href="/"

       })
       .catch((err)=>{

        if(err){
          Seterror(true)
          Setmessage(err.response.data.message)
        }

       })

       }

    

    const logincall = (e) =>{

      e.preventDefault();

      const data ={
        userId:Userid,
        password:password

      }
      usersignin(data)
      .then( (res) => {
       console.log(res)

        if(res.data.message){
          Seterror(true)
          Setmessage(res.data.message)
          return
        }
              
               Seterror(false)
          
               Setmessage("login sucessful..!")

               localStorage.setItem("name",res.data.name)
               localStorage.setItem("userId",res.data.userId)
               localStorage.setItem("email",res.data.email)
               localStorage.setItem("userStatus",res.data.userStatus)
               localStorage.setItem("token",res.data.accessToken)
               localStorage.setItem("userType",res.data.userType)
      
     if(res.data.userType==="CUSTOMER"){
        window.location.href="/customer";
      }
      else if(res.data.userType==="ADMIN"){
        window.location.href="/admin";

      }
      else{
        window.location.href="/engineer";
      }
    

      

     } )
      
      .catch((err)=>
      {
             if(err){
              Seterror(true)
              Setmessage(err.response.data.message)
             }
      }
      )


    }

    const clearstate = ()=>{
      
      Setuserid("")
      Setpassword("")
      Setemail("")
      Setmessage("")
      Setusername("")
    }

    const Setinputvalues=(e)=> {
       var id = e.target.id;
       if(id==="Userid")
       {
           Setuserid(e.target.value)
           console.log(Userid)
       }
      else if(id==="password")
       {
        Setpassword(e.target.value)
        console.log(password)
       }
       else if(id==="Username")
       {
        Setusername(e.target.value)
        console.log(Username)

       }
       else 
       {
        Setemail(e.target.value)
       }

    }
    const handleselect=(e)=>{
                
      Setuserrole(e)
    }

return (
    <div className="bg-info d-flex justify-content-center align-items-center vh-100">
  <div  className="card p-3" style={{width : 20+"rem"} }>
                <h4><center><div className="text-info" >{issignup?"Signup": "Login"}</div></center></h4>

        <form onSubmit={issignup ? signupcall:logincall}> 

            <div className="input-group" >
     
        <input type="text"  className="form-control m-1" placeholder="Userid" id="Userid" value={Userid} onChange={Setinputvalues}></input>
     </div>
     
        <div className="input-group">
        

        <input type="password" className="form-control m-1" placeholder="Password"  id="password" value={password} onChange={Setinputvalues}></input>
        </div> 

        {  issignup &&
        <>
 
        <div className="input-group">
        <input type="username" className="form-control m-1" placeholder="Username" id="Username" value={Username} onChange={Setinputvalues}></input>
        </div> 

        <div className="input-group">
        
        <input type="email" className="form-control m-1" placeholder="Email"  value={email} onChange={Setinputvalues} ></input>
        </div> <center>
        <DropdownButton
            
            id="Userrole"
            variant="light"
            title={Userrole}
            onSelect={handleselect}
          >
            <Dropdown.Item eventKey="CUSTOMER">CUSTOMER</Dropdown.Item>
            <Dropdown.Item eventKey="ENGINEER">ENGINEER</Dropdown.Item>
       

            </DropdownButton></center>
      
  

        </>

}
        <div className="input-group">
        


        <input type="submit"className="form-control btn btn-info text-white m-1" value={issignup?"Signup":"Login"}></input>
        </div> 
     
        
       
       <div className=" text-info  m-1" onClick={togglesignup}><center> {
       

issignup?"Already have an account ? login":"New User ? Signup "
       }
       </center>
       </div>
       <div className={error ? "text-danger text-center": "text-success text-center"}>{meassage}</div>
     

    </form>
   
 
    </div>

 
    </div>

)


}


export default Login