import { useState, useEffect } from "react"
import FavorightAPI from "../api/FavorightAPI"
import { Link } from "react-router-dom"
import { Button } from "react-bootstrap"

function MyComments(props){

    const [myComments, setMyComments] = useState([])

    useEffect(() => {
      loadMyComments()
    }, [props.userName])
    
    
    const loadMyComments = async () => {
        const data = await FavorightAPI.getAllComments()
        if (data){
            let foundMyComments = data.filter(comment => comment.creator === Number(localStorage.getItem('userID')))
            console.log("found comments!!!!!:", foundMyComments)
            setMyComments(foundMyComments ? foundMyComments : [])
        } else {
            console.log("something went wrong when loading my comments!!!!!!!!!")
        }

    }

    
    const handleDeleteComment = async (commentToBeDeleted) => {
 
        if (props.userID == commentToBeDeleted.creator) {
            const data = await FavorightAPI.deleteCommentByID(commentToBeDeleted.id)
            if (data){
                const updatedMyComments = myComments.filter(myComments => myComments.id !== commentToBeDeleted.id )
                setMyComments(updatedMyComments)
                console.log('comment delete successfully !!!!!!!!!!!!')
            } else {
                console.error("error occured on deleting my comments!!")
            }
        } else {
            console.log("this is not your comment!!!!!!!!")
            alert('not your comment')
            return null
        }
      
         
    }
 

    const renderMyComments = () => {
        console.log(myComments.post)
        return myComments.map((comment,index) => {
            return <div key={comment.id} id='my-comment-page-comments'>    
                <p>CommentID: {comment.id}</p>
                 <Link to={`/all-posts/${comment.post}`}>{comment.content}</Link> 
                &nbsp;
                <Button onClick={() => {handleDeleteComment(comment)}} variant='danger'>Delete</Button>
                &nbsp;
                <Link to={`/my-comment/${comment.id}/edit`}><Button variant="warning" >Edit</Button></Link>
                 <hr></hr>
                
            </div>
            
            
           
        })
    }


    return (
        <div id="my-comment-page">
            <h1>My comments page</h1>
           
            {renderMyComments()}
        </div>
    )
}

export default MyComments