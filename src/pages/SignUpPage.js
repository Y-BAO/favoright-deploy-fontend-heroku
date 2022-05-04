import { useNavigate } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"
import { Button, Form, FormGroup,   Input } from 'reactstrap';


function SignUpPage() {

    const navigate = useNavigate()

    const handleSignUp = async (event) => {
        event.preventDefault()
        const signUpData = {
            username: event.target.elements["username"].value,
            password: event.target.elements["password"].value,
        }

        // console.log("Sign Up info:", signUpData)
        const data = await FavorightAPI.signUp(signUpData)
     
        if (data){
            
            navigate("/login")
        }   
    } 



    return (
       <div id="signup-page">
           <br></br>
           
            <div className="form">
         
            
        

         <Form inline method="POST" onSubmit={handleSignUp}>
             <FormGroup>
             <Input type="username" name="username" id="username" placeholder="Username" />
             </FormGroup>
         {' '}
             <FormGroup>
             <Input type="password" name="password" id="password" placeholder="Password" />
         </FormGroup>
         {' '}
             <Button>Sign Up</Button>
         </Form>
     </div>
     <h1>🆂🅸🅶🅽 🆄🅿 🆃🅾🅳🅰🆈! </h1>
 
    
     <div id="background-image">
              
              </div>
       </div>
    )
}

export default SignUpPage