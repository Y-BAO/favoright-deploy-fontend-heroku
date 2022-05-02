// import FavorightAPI from "../api/FavorightAPI"
import { useEffect, useState } from 'react'
import { Carousel } from 'react-bootstrap'
 
 
import FavorightAPI from '../api/FavorightAPI'


function StoreNearByRenderInPostComponent (props) {
    const [yelpData, setYelpData] = useState(null)


    useEffect(()=> {
        loadYelpData()
    }, [props.currentPost])

    //  api call to find store nearby in yelp 
    const loadYelpData = async () =>{
        if (props.currentPost){
            console.log(props.currentPost, 'current post !!!!!!!!!!!!')
            const inputParams = {
                location: props.currentPost.primaryAddress,
                term: props.currentPost.title,
                radius: 16093
            }
            const data = await FavorightAPI.getYelp(inputParams)
            if (data) {
                console.log("store nearby search!!!!!",data)
                setYelpData(data ? data : null )
            } else {
                console.log('Yelp failed to load')
            }
        }
      
 
    }



    // show yelp store found near by
    const renderYelp = () => {
        const output = []
      
        if (yelpData){
            if (!yelpData.error) {
               
                for (let i = 0; i < yelpData.businesses.length; i++){
                 
                    const name = yelpData?.businesses[i]?.name 
                    const image = yelpData?.businesses[i]?.image_url
                    const url = yelpData?.businesses[i]?.url
                    const location = yelpData?.businesses[i]?.location
                    const title = yelpData.businesses[i].categories.length != 0 ? yelpData.businesses[i].categories[0].title : null
                    const rating = yelpData?.businesses[i]?.rating
                
                   
                    output.push(
    
                            <Carousel.Item interval={5000} id="carouselItem" key={i}>
                            <img
                            src={image}
                            alt="pictures..."
    
                            />
                            <Carousel.Caption>
                            <h3>{name}</h3>
                            <h3>{title}</h3>
                            <p>rating:{rating}</p>
                            
                            <p>{location['display_address'][0]} {location['display_address'][1]}</p>
                            <p>Interested ?<a href={url}> Check out the site!</a></p>
                            </Carousel.Caption>
                            </Carousel.Item>
                         
                    )
                }
            } else {
                output.push(<h1 key={'not found'} >not found</h1>)
            }
          
            return output
        
        } else {
            console.log("Waiting for user input!!!!!!!!")
        }
      
    }




    return (
        <div  >
             
            <Carousel variant="dark" > 
             {renderYelp()} 
             </Carousel>
            
        </div>
    )



}

export default StoreNearByRenderInPostComponent





 





{/* <Container   key={yelpData.businesses.id}>
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
</Container> */}