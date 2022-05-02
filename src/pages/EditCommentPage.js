import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"
import EditCommentComponent from "../components/EditCommentComponent"

function EditCommentPage(props) {

    const params = useParams()
    const commentID = params.commentID


    useEffect(() => {
        loadComment()
    }, [commentID])


    const [editingComment, SetEditingComment] = useState([])
    const loadComment = async () => {

        const data = await FavorightAPI.getCommentsByID(commentID)
      
        if (data) {
            console.log("found comment to be edited")
            SetEditingComment(data ? data : [])
        } else {
            console.log("something went wrong when locaiting comment to be edited")
        }

    }

    const checkPermission = () => {
        if (editingComment.length !== 0){
            if (props.userID == editingComment.creator){
                return (
                        <div id="editCommentPage">
                             
 
                                <p id="initial-chat">Your Initial Chat: <h3>{editingComment.content}</h3></p>
                                <EditCommentComponent editingComment={editingComment} userID={props.userID} />

                        </div>
                )
            } else {
                alert('you do not have permission to edit this comment!!!!!')
                
            }
        } else {
            
            return 
        }
    }





    return (
        <div >
            <h1>edit comment page</h1>
           {checkPermission()}
        </div>
    )
}

export default EditCommentPage