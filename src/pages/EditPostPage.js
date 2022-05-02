import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"
import EditPostComponent from "../components/EditPostComponent"

function EditPostPage(props) {


    const params = useParams()
    const postID = params.postID
    
    useEffect(() => {
        loadPost()
    },[postID])

    const [editingPost, setEditingPost] = useState([])
    const loadPost = async () => {
        const data = await FavorightAPI.getPostByID(postID)

        if (data) {
            console.log("found post to be edited!!!!!!!")
            setEditingPost(data ? data : [])
        } else {
            console.log("something went wrong when locating post to be edited!!!")
        }
    }

    const checkPermission = () => {
        if (editingPost.length !== 0){
            console.log(typeof(props.userID))
            console.log(typeof(editingPost.creator))
            if (props.userID == editingPost.creator){
                return (
                    <div>
                          <h3>Edit Post Page</h3>
    
    
                            <EditPostComponent editingPost={editingPost} userID={props.userID}/>
                    </div>
                )
            } else {
                alert('you do not have permission to edit this post !!!!!!!!!!')
                return (
                    <div>
                        <h3>You do not have permission</h3>
                    </div>
                )
            }
        } else {
          
        }
       
    }



    return (
        <div id="edit-post-page">
          {checkPermission()}
        </div>
    )
}


export default EditPostPage