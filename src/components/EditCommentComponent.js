import FavorightAPI from "../api/FavorightAPI"
import {useNavigate} from "react-router-dom"
import { Button } from "react-bootstrap"
function EditCommentComponent(props) {

    const navigate = useNavigate()



    const handleEditComment = async (event) => {
        event.preventDefault()
        const currentCommentCreatorID = props.editingComment.creator
        const currentLoggedInUserID = props.userID
        const commentID = props.editingComment.id
        const editedCommentData = {
            id: commentID,
            content: event.target.elements["editedComment"].value,
            post: props.editingComment.post,
            creator: props.editingComment.creator,
            subComment: props.editingComment.subcomments
        }
       
        if (currentCommentCreatorID == currentLoggedInUserID) {
            const data = await FavorightAPI.editCommentByID(commentID ,editedCommentData)
            if (data) {
                console.log('comment updated successfully!!!!!!!!!')
                navigate('/my-comments')
            
            } else {
                console.log("comment update failed!!!!!!!!")
            }
        } else {
            console.log("you are not allowed to edit this comment !!!!!!!!!!")
        }
    }



    return (
        <div id="edit-comment-component">
        
            <form onSubmit={handleEditComment}>
              <label>CommentID: {props.editingComment.id}</label>
                <br></br>
                <textarea defaultValue={props.editingComment.content} name='editedComment' cols={30} rows={5} />
                <br></br>
              <Button type="submit" variant="info">submit</Button>
            </form>

        </div>
    )
}

export default EditCommentComponent