import { useNavigate, useParams } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"
import { useEffct } from 'react'
import { Button } from "react-bootstrap"

function AddComment(props) {

    const params = useParams()
    const postID = params.postID
   
 


    
    const handleAddComment = async (event) => {
        event.preventDefault()
        const input = event.target.elements["content"].value
        const commentData = {
            content: input,
            post: postID
        }
        // console.log(`data sent to comment on post ${postID}`, commentData)

        const data = await FavorightAPI.createComment(commentData)

        if (data) {
            // console.log("received data from comment created:", data)
            props.updateComments(data)
            document.getElementById('content').value = ''
        }
    }


    
    return (
        <div className="form">
        <form onSubmit={ handleAddComment}  >
            <textarea placeholder="How can you help?" name="content" id="content" rows={5} cols={20} /> 
            <br></br>
            <Button type="submit" variant="info">Submit</Button>
            </form> 
           
        </div>
    )
}



export default AddComment