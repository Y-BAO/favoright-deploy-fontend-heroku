import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FavorightAPI from "../api/FavorightAPI";
// import PostDetail from "../components/PostDetail";

function MyPosts(props){

    const [myPosts, setMyPosts] = useState([])

    useEffect(() => {

        loadMyPosts()

    }, [props.userID])


    const loadMyPosts = async () => {
        
        const data = await FavorightAPI.getAllPosts()

        if (data) {
            
            let foundMyPosts = data.filter(post => post.creator === Number(localStorage.getItem('userID')))
            
            console.log("found my posts!!!", foundMyPosts)
            setMyPosts(foundMyPosts ? foundMyPosts : [])
        } else {
            console.log("something went wrong when loading my posts !!!!!!!!!!!!!!")
        }
       
       
    }



    const handleDeletePost = async (postToBeDeleted) => {
      
        if (props.userID == postToBeDeleted.creator){
            const data = await FavorightAPI.deletePostByID(postToBeDeleted.id)
            if (data){
                const updatedMyPosts = myPosts.filter(myPosts => myPosts.id !== postToBeDeleted.id)
                setMyPosts(updatedMyPosts)
                console.log('post deleted successfully!!!!!')
            } else {
                console.error("error occured on deleting my post!!!!!!")
            }
        } else {
            console.log("this is not your post!!!!!!")
            alert("not your post")
            return null 
        }
       
    }
    const checkIsPaid = (post) => {
        if (post.is_paid) {
            console.log('is paid')
            return "$$$"
        } else {
            console.log('not paid')
            return 'not paid'
        }
    }

    const checkIsHelped = (post) => {

        if (post.is_helped){
            return (
                <div>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                    </svg>
                 
                </div>
            )
        } else {
            return (
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-frown" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                    </svg>
                 
                </div>
            )
        }
    }


    const checkPostCategory = (post) => {
        if (post.category == 1){
            return "delivery"
        } 
 
        if (post.category == 2) {
            return "repair"
        }
 
        if (post.category == 3){
            return "other"
        }
    }

    const renderMyPostsSolved = () => {
        let solvedPosts = myPosts.filter(post => post.is_helped == true)
       return solvedPosts.map((post,index) => {
         
           return <div key={post.id} id='my-post-page-posts' >
               <p>Category:{checkPostCategory(post)} </p> 
               {checkIsPaid(post)}
               <br></br>
               <Link to={`/all-posts/${post.id}`}>Favor: {post.title}</Link>
               <br></br>
               <span>helped? {checkIsHelped(post)}  </span>
              
               <br></br>
               &nbsp;
               <Button variant="danger" onClick={() => {handleDeletePost(post)}}>Delete</Button>
               &nbsp;
               <Link to={`/my-posts/${post.id}/edit`}><Button variant="warning">Edit</Button></Link>
               
           </div>
       })
 
    }
    

    const renderMyPostsNotYetSolved = () => {
        let notSolvedPosts = myPosts.filter(post => post.is_helped == false)
        return notSolvedPosts.map((post,index) => {
          
            return <div key={post.id} id='my-post-page-posts' >
                <p>Category:{checkPostCategory(post)} </p> 
                {checkIsPaid(post)}
                <br></br>
                Favor:<Link to={`/all-posts/${post.id}`}> <h4>{post.title}</h4></Link>
                <br></br>
            
                <span>helped? {checkIsHelped(post)}  </span>
              
              <br></br>
              <br></br>
           
              
              &nbsp;
                <Button variant="danger" onClick={() => {handleDeletePost(post)}}>Delete</Button>
            
                &nbsp;
                <Link to={`/my-posts/${post.id}/edit`}><Button variant="warning">Edit</Button></Link>
                
            </div>
        })
  
     }

    return (
        <div >

            

            <div id="my-post-page-body" >

                <div id="my-post-page-body-favor-solved">  
                <h1>favors solved </h1>
                { props.userID && renderMyPostsSolved()}
                </div>
          

                <div id="my-post-page-body-favor-not-yet-solved">
                <h1>Favors not yet solved</h1>
                { props.userID && renderMyPostsNotYetSolved()}
                </div>  

            </div>
           

           

       
        </div>
    )
}


export default MyPosts








