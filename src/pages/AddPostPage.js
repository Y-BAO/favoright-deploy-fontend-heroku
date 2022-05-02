import { useNavigate } from "react-router-dom"
import FavorightAPI from "../api/FavorightAPI"
import { Form, Button } from 'react-bootstrap'

function AddPostPage (props) {

    const navigate = useNavigate()
 

    const handleCreatePost = async (evt) => {

        evt.preventDefault()
        

        const postData = {
            category:evt.target.elements['selections'].value,
            title : evt.target.elements["title"].value,
            description : evt.target.elements["description"].value,
            primaryAddress: evt.target.elements["primaryAddress"].value,
            secondaryAddress: evt.target.elements["secondaryAddress"].value,
            is_paid:evt.target.elements['paid-selections'].value
            
        }

        console.log("Data sent to create post: ", postData)

        const data = await FavorightAPI.createPost(postData)

        if (data){
            console.log("received data from post created:", data)
            navigate(`/all-posts/${data.id}`)
        }
       
    }

    return (
        <div id="askFavorPage"  >
            
            <div className="form">

           
<Form onSubmit={handleCreatePost} method="POST">
<Form.Label>Please select a category for your favor..</Form.Label>   
    <Form.Select id="selections">
    <option id="delivery" value={1}>Delivery</option>
    <option id="repair" value={2}>Repair</option>
    <option id="other" value={3}>Other</option>
    </Form.Select>
 
  <Form.Group className="mb-3" controlId="formBasicPassword">
  <Form.Label>What do you need help with ?</Form.Label>
    <Form.Control name="title" placeholder = "title" />
    <Form.Label>Describe your favor:</Form.Label>
    <Form.Control as="textarea" name="description" placeholder="description"  cols='60' />
    <Form.Label>  (<strong>Required!</strong>) street, city, state, zipcode (or a place) / </Form.Label>
    <Form.Control   name="primaryAddress" placeholder="primaryAddress/ pickup / userAddress" />
    <Form.Label> (optional): street, city, state, zipcode (or a place)</Form.Label>
    <Form.Control  name="secondaryAddress" placeholder="secondaryAddress / dropoff" />
  </Form.Group>
  <Form.Label>tips?</Form.Label>   
    <Form.Select id="paid-selections">
    <option id="paid" value={true}>paid</option>
    <option id="unpaid" value={false}>unpaid</option>
   
    </Form.Select>
  <Button variant="info" type="submit" >Submit</Button>
</Form>
        </div>
        </div>
    )
}


export default AddPostPage