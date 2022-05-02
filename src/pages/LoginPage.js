import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"
 
import React from 'react';
import { Button, Form, FormGroup,   Input } from 'reactstrap';

 
 

function LoginPage(props) {

    const navigate = useNavigate()

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log(event.target.value)
        const loginData = {
            username: event.target.elements["username"].value,
            password: event.target.elements["password"].value,
        }

    

        const data = await FavorightAPI.login(loginData)
        

        if (data){
            console.log(data.token)
            props.setUserName(data.username)
            localStorage.setItem('user', loginData.username)
            localStorage.setItem('userID', data.userID)
            localStorage.setItem('token', data.token)
            props.setUserID(data.userID)
            props.setUserCookie(Cookies.get("csrftoken"))

           
            navigate("/")
        }
    } 

   

    return (
       <div id="login-page">
            <div className="form">
             
           
            
             <Form inline method="POST" onSubmit={handleLogin}>
                 <FormGroup>
                 <Input type="username" name="username" id="username" placeholder="Username" />
                 </FormGroup>
             {' '}
                 <FormGroup>
                 <Input type="password" name="password" id="password" placeholder="Password" />
             </FormGroup>
             {' '}
                 <Button>Login</Button>
             </Form>
 
 
         </div>
         <div>
             <h1>🆆🅴🅻🅲🅾🅼🅴 🆃🅾 🅵🅰🆅🅾🆁🅸🅶🅷🆃 ! </h1>
         </div>
         <div id="background-image">
              
              </div>
       </div>
    )
}

export default LoginPage