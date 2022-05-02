import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"
import {Button} from 'react-bootstrap'


function AddSubComment(props) {

    const params = useParams()
    const commentID = params.commentID

   


    const handleAddSubComment = async (event) => {
        event.preventDefault()
        const input = event.target.elements["content"].value
        const subCommentData = {
            content: input, 
            comment: commentID
        }
        console.log(`data sent to subcomment on comment ${commentID}`, subCommentData)

        const data = await FavorightAPI.createSubComment(subCommentData)

        if (data) {
            console.log("data received from subcomment created: ", data)
            props.updateSubcomments(data)
            document.getElementById('content').value = ''
           
            
        } 
    }    





    return (
        <div className="form" >
            <form onSubmit={ handleAddSubComment} method="POST" >
            <textarea id="content" placeholder="enter your message here" name="content" rows={5} cols={20} /> 
            <br></br>
            <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default AddSubComment