import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import FavorightAPI from '../api/FavorightAPI'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

function NavBar (props){

    const navigate = useNavigate()

    const logOut = async () => {
        const data = FavorightAPI.logOut()
        if (data){
            Cookies.remove("csrftoken")
            localStorage.clear()
            props.setUserCookie("")
            props.setUserName("")
            props.setUserID("")
            localStorage.clear()
            
            navigate('/')
          
            
        }
    }

    const renderAuthOptions = () => {
       
        if (props.userName === ""){
            return (
             
              <div> 
            <Navbar bg="dark" variant="dark" fixed='top'>
              <Container>
                <Navbar.Brand href="#/">🅵🅰🆅🅾🆁🅸🅶🅷🆃</Navbar.Brand>
                  <Nav className="me-auto">
                    <Nav.Link href="#/login">Login</Nav.Link>
              <Nav.Link href="#/signup">Sign up</Nav.Link>
              </Nav>
              </Container>
            </Navbar>
            </div>
            ) 
        } else {
            return (
            <div>      
              <Navbar bg="dark" variant="dark">
              <Container>
                
                  <Nav className="me-auto">
                
                
              </Nav>
              </Container>
            </Navbar>
 


<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top'>
  <Container>
    <Navbar.Brand href="#/">🅵🅰🆅🅾🆁🅸🅶🅷🆃</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#/add-post">Ask A Favor</Nav.Link>
          <Nav.Link href="#/all-posts">Give A Favor</Nav.Link>  
          <NavDropdown title="Mine" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#/my-posts">My Posts</NavDropdown.Item>
          <NavDropdown.Item href="#/my-comments">My Comments</NavDropdown.Item>
          <NavDropdown.Item href="#/me-helped">I helped</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
            <Navbar.Text>
                <a href="#/my-posts">Welcome: {props.userName} / id: {props.userID}</a>
            </Navbar.Text>
            <Nav.Link href="#" onClick={logOut}> | log out</Nav.Link>
        </Nav>
        &nbsp;
        &nbsp;
    </Navbar.Collapse>
  </Container>
</Navbar>
              </div>

    )
     }
    }




    return (
        <div id='navBar'>
           
       

            {renderAuthOptions()}

           
            
           
   
        </div>
    ) 
}


export default NavBar