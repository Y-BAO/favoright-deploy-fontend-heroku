import FavorightAPI from "../api/FavorightAPI"

import {Form, Button} from 'react-bootstrap'







function StoreNearBySearchComponent (props) {





    const handleStoreSearch = async (event) => {
        event.preventDefault()
        
        const inputParams = {
            location: event.target.elements["location"].value,
            term: event.target.elements["term"].value,
            radius: String(Number(event.target.elements["radius"].value) * parseInt(0.000621371))
        }
       
        const data = await FavorightAPI.getYelp(inputParams)
        if (data) {
            // console.log("store nearby search!!!!!",data.error.code)
            if (data.error){
                alert('invalid input')
            } else {
                props.setYelpData(data ? data : null )
                console.log("search succeed")
            }
           
        } else {
            console.log('Yelp failed to load')
        }
 

    }




    return (
        <div className="form" >
            
        
<Form onSubmit={handleStoreSearch}>
<h3>What do you have in mind?</h3>
  

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Control placeholder="enter key words" name="term" />
    <Form.Control  placeholder="location" name="location" />
    <Form.Control   placeholder="radius (mile)" name="radius" />
  </Form.Group>
  <Button variant="info" type="submit">Search</Button>
</Form>
        </div>
        
    )
}

export default StoreNearBySearchComponent