 
import './App.css';
import { HashRouter, Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useState  } from 'react';


// component
import NavBar from './components/NavBar';
// page
import HomePage from './pages/HomePage';
import AllPostPage from './pages/AllPostPage';
import PostPage from './pages/PostPage';
import AddPostPage from './pages/AddPostPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CheckLoginPage from './pages/CheckLoginPage';
import MyPosts from './pages/MyPosts';
import CommentDetailPage from './pages/CommentDetailPage';
import MyComments from './pages/MyComments';
import EditPostPage from './pages/EditPostPage';
import EditCommentPage from './pages/EditCommentPage';

import Container from 'react-bootstrap/Container'
import FavorMeHelpedPage from './pages/FavorMeHelpedPage';
import Footer from './components/Footer';
 
 


function App() {

  // login status
  const [userName, setUserName] = useState("")
  const [userID, setUserID] = useState("")
  const [userCookie, setUserCookie] = useState("")
  
 
  useEffect(() => {
      // checkLoginStatus()
      const loggedInUser = localStorage.getItem('user')
      const loggedInUserID = localStorage.getItem('userID')
      // console.log(loggedInUserID)
      if (loggedInUser && loggedInUserID){
        setUserName(loggedInUser)
        setUserID(loggedInUserID)
      }
  }, [])




  return (
    <div className="App">
     

    <HashRouter>
      <Container > 
      {<NavBar userName={userName} setUserName={setUserName} userID={userID} setUserID={setUserID} userCookie={userCookie} setUserCookie={setUserCookie} />}
      </Container>
    <hr></hr>
      <Routes>
        <Route path='/' element ={<CheckLoginPage userName={userName} actualApp = {() => <HomePage userName={userName} />} />} />


        <Route path='/add-post' element = {<AddPostPage />} />
        <Route path='/all-posts' element = {<AllPostPage userName={userName}  userID={userID}/>} />
        <Route path='/all-posts/:postID' element = {<PostPage  userName={userName} userID={userID}/>} />
        <Route path='/my-posts/:postID/edit' element={<EditPostPage userID={userID} />} />

      
        <Route path='/my-posts' element={<MyPosts userName={userName} userID={userID}/>} />
        <Route path='/my-comments' element={<MyComments userName={userName} userID={userID} />} />
        <Route path='/comment/:commentID' element={<CommentDetailPage userID={userID} />} />
        <Route path='/my-comment/:commentID/edit' element={<EditCommentPage userID={userID}/>} />


        <Route path='/me-helped' element={<FavorMeHelpedPage userID={userID} />} />


        <Route path='/login' element={<LoginPage setUserName={setUserName} setUserID={setUserID} setUserCookie={setUserCookie}   />}/>
        <Route path='/signup' element={<SignUpPage />}/>
       

    

 
      </Routes>
    </HashRouter>


      <div>
        <Footer />
      </div>

    </div>
  );
}

export default App;
