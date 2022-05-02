import { Link } from "react-router-dom"
 

function CheckLoginPage(props) {

    if (props.userName === ""){
        return (
            <div id="checkLogin">
                 <p> You are not logged in, please <Link to='/login'>Login</Link> or <Link to='/signup'>Sign up</Link> </p>
                <div id="welcomePage">
                   
                    <h1>Ask and give a favor today!</h1>
                    <div id="background-image">
              
              </div>
                </div>
               
            </div>
        )
    }  
    return (
        <div  >
            {props.actualApp()}
           
        </div>
    ) 
}

export default CheckLoginPage