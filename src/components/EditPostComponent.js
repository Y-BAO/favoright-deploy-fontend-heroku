import { Button,Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"


function EditPostComponent(props) {


    const navigate = useNavigate()

    const handleEditPost = async (event) => {
        event.preventDefault()
  
        const currentPostCreatorID = props.editingPost.creator
        const currentLoggedInUserID = props.userID
        const postID = props.editingPost.id
        const editedPostData = {
            id: postID,
            category: event.target.elements['selections'].value,
            title: event.target.elements["title"].value,
            description: event.target.elements["description"].value,
            primaryAddress: event.target.elements["primaryAddress"].value,
            secondaryAddress: event.target.elements["secondaryAddress"].value,
            creator:props.currentPostCreatorID,
            is_paid : event.target.elements['paid-selections'].value
        }
        if (currentPostCreatorID == currentLoggedInUserID) {
            const data = FavorightAPI.editPostByID(postID,editedPostData)
            if (data) {
                console.log("post updated successfully !!!!!!!!!")
                navigate('/my-posts')
            } else {
                console.log("post update failed !!!!!!!!!!!")
            }

        } else {
            console.log("you are not allowed to edit this post!!!!!!!")
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
 

    return (
        <div className="form">
          
           

        <Form onSubmit={ handleEditPost } method="POST">
        <Form.Label>Please select a category for your favor..</Form.Label>   
        <Form.Select id="selections">
        <option id="delivery" value={1}>{checkPostCategory(props.editingPost)}</option>
        <option id="delivery" value={1}>Delivery</option>
        <option id="repair" value={2}>Repair</option>
        <option id="other" value={3}>Other</option>
        </Form.Select>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>What do you need help with ?</Form.Label>
            <Form.Control name="title" defaultValue={props.editingPost.title} />
            <Form.Label>Describe your favor:</Form.Label>
            <Form.Control name="description" as='textarea' defaultValue={props.editingPost.description}  />
            <Form.Label>  street, city, state, zipcode (or a place)</Form.Label>
            <Form.Control  name="primaryAddress" defaultValue={props.editingPost.primaryAddress} />
            <Form.Label> (optional): street, city, state, zipcode (or a place)</Form.Label>
            <Form.Control name="secondaryAddress" defaultValue={props.editingPost.secondaryAddress} />
        </Form.Group>
        <Form.Label>tips?</Form.Label>   
        <Form.Select id="paid-selections">
        <option id="paid" value={true}>paid</option>
        <option id="unpaid" value={false}>unpaid</option>
    
        </Form.Select>
        <Button variant="warning" type="submit" >Submit</Button>
 

        </Form>
        </div>
    )
}


export default EditPostComponent