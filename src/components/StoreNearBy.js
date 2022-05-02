 
// import FavorightAPI from "../api/FavorightAPI"
import { useState } from 'react'
 
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import StoreNearBySearchComponent from "./StoreNearBySearchComponent"
import Container from 'react-bootstrap/Container'

function StoreNearBy (props) {

    const [yelpData, setYelpData] = useState(null)



    const renderYelp = () => {
        const output = []
        if (yelpData){
            console.log(yelpData)
            for (let i = 0; i < yelpData.businesses.length; i++){
                const name = yelpData.businesses[i].name
                const image = yelpData.businesses[i].image_url
                const url = yelpData.businesses[i].url
                const location = yelpData.businesses[i].location
          
               
                output.push(

                   <div key={yelpData.businesses.id}  >
      
                        <Container   key={yelpData.businesses.id}>
                    <CardGroup key={yelpData.businesses.id}>
                    
                        <Card style={{ width: '20rem' }} key={yelpData.businesses.id}>
                            <Card.Img variant="top" src={image} />
                            <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <Card.Text>
                                {location['display_address'][0]} {location['display_address'][1]}
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                            <small className="text-muted">Interested ?<a href={url}> Check out the site!</a></small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
                    </Container>

                    
                    


                   </div>
                    
               
                )
            }
            return output
        
        } else {
            console.log("Waiting for user input!!!!!!!!")
        }
    
    }




    return (
        <div >
       
            <StoreNearBySearchComponent setYelpData={setYelpData} yelpData={yelpData} />
            <div id='storeNearBy'>
           
                {renderYelp()}  
         
            </div>
            
        </div>
    )

}

export default StoreNearBy  






