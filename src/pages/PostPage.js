import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"




import FavorightAPI from "../api/FavorightAPI"
import AddComment from "../components/AddComment"
import PickUpMapView from "../components/PickUpMapView"
import DropOffMapView from "../components/DropOffMapView"
import SolvedFavorButton from "../components/SolvedFavorButton"
import { Container } from "react-bootstrap"
import StoreNearBy from "../components/StoreNearBy"
import StoreNearByRenderInPostComponent from "../components/StoreNearByRenderInPostComponent"
 

// api key





function PostPage (props){
    const [currentPost, setCurrentPost] = useState(null)
    const [comments, setComments] = useState([])
    const [isHelped, setIsHelped] = useState('')
    const params = useParams()

    // use effect control all posts
    useEffect(()=> {
        loadPost()
       
    }, [params.postID])   // when post ID updated, refresh page
  
    // use effect control all ments
    useEffect(() => {
      loadComments()
    },[currentPost])   //when post renewed, reload all comments


    const loadPost = async () => {
        const postData = await FavorightAPI.getPostByID(params.postID)
        setCurrentPost(postData ? postData : [])
        setIsHelped(postData? postData.is_helped : false)
        

    }
    
 
    
    const loadComments = async () => {
        if(!currentPost){
           setComments([])
           return
        }  
        let newComments = []

        // console.log("CUrrent post !!!!!!!!!!!",currentPost)

        for (const commentID of currentPost.comments){    
            let sample = await FavorightAPI.getCommentsByID(commentID)
            newComments.push(sample)
            }
     
        return  setComments(newComments ? newComments : []) 
    }

    

 


    const renderComments = () => {
        return comments.map((comment,index)=> {
            return (
                <div key={comment.id}>
                    
                   
                    <SolvedFavorButton currentPost={currentPost} userID={props.userID} comment={comment}   />
                    <Link to={`/comment/${comment.id}`}> <p >{comment.content} </p> <p>CreatedBY: {comment.creator}</p> </Link>
                    <hr></hr>
                </div>
            )
             
        })
    }



    const updateComments = (addedNewComments) => {
        let newComment = [...comments,addedNewComments]
        setComments(newComment)
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


   const checkIsPaid = (post) => {
    if (post.is_paid) {
        // console.log('is paid')
        return "$$$"
    } else {
        // console.log('not paid')
        return 'not paid'
    }
}


    return (
       <div>
            <Container id="post-page-render">
            <div id="post-page-side-bar">
           
                {isHelped == true && <h5>I've heen helped, thank you</h5>}
                
                {isHelped == false && <AddComment  updateComments={updateComments} currentPost={currentPost}/> }
    

                 {renderComments()}
            </div>



            <div id="post-page-post-detail">
                    <div id="post-page-post-content">  
                    <h1>Category: {currentPost && checkPostCategory(currentPost)}</h1>
                    <h3><strong>{currentPost && currentPost.title}</strong> </h3>
                    <h5><strong>Tips: {currentPost && checkIsPaid(currentPost)}</strong></h5>
                    <p>{currentPost && currentPost.description}</p>
                    <p>pickup address or where at: {currentPost && currentPost.primaryAddress} </p>
                    <p>drop off address: {currentPost && currentPost.secondaryAddress} </p>
                    <strong>{isHelped == false && <p>Waiting for a favor......</p>}</strong>
                    <strong>FavorOwnerId: {currentPost&&currentPost.creator}</strong>
                   
                    </div>

                <div>
                    {currentPost && <PickUpMapView primaryAddress={currentPost.primaryAddress} />}
                    {currentPost && <DropOffMapView secondaryAddress={currentPost.secondaryAddress}/> }
                </div>

       
            </div>

        </Container>

        <Container id="storeNearByInPost">
        
            <StoreNearByRenderInPostComponent currentPost={currentPost}/>
            
        </Container>
        <div id="whitespace">
            <h1>    </h1>
        </div>

      
       </div>
    )
 
}



export default PostPage