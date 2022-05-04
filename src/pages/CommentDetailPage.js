import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"
import AddSubComment from "../components/AddSubComment"

function CommentDetailPage(props) {

   
    const [currentComment, setCurrentComment] = useState(null)
    const [subcomments, setSubComments] = useState([])
    
    const params = useParams()
    
    // when on a new comment page/ with new comment id
    useEffect(()=> {
        loadComment()

    }, [params.commentID])

    // when current comment changed, load all updated subcomments
    useEffect(() => {
        loadSubComments()
    }, [currentComment])

    

    const loadComment = async () => {
        const commentData = await FavorightAPI.getCommentsByID(params.commentID)
        setCurrentComment(commentData ? commentData : [])
    }

    const loadSubComments = async () => {
        if (!currentComment){
            return setSubComments([])
        }
        let newSubComments = []
        for (const subCommentID of currentComment.subcomments){
            let newSubCommentsFromDB = await FavorightAPI.getSubCommentsByID(subCommentID)
            newSubComments.push(newSubCommentsFromDB)
        }
        
        return setSubComments(newSubComments ? newSubComments : [])
    }

    const renderSubcomments = () => {
        return subcomments.map((subcomment, index) => {
            return (
                <div key={subcomment.id}>
                
                <hr></hr>
                  <span>{subcomment.content} <strong> UserID: {subcomment.creator} </strong></span>
       
                     
                </div>
            )
        })
    }

    const updateSubcomments = (addedNewSubComments) => {
        let newSubComments = [...subcomments, addedNewSubComments]
        setSubComments(newSubComments)
    }



    return (
        <div id="comment-detail-page">
            <h5>Initial Comment:</h5>
            <h3>  <br></br>{currentComment && currentComment.content}</h3>  by: userID {currentComment && currentComment.creator}
       
            
            <AddSubComment updateSubcomments = {updateSubcomments} />
            {renderSubcomments()}
        </div>
    )
}


export default CommentDetailPage