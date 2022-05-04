import { useEffect, useState } from "react"
import FavorightAPI from "../api/FavorightAPI"

import {Container, CardGroup, Card, Button} from 'react-bootstrap'


function ShowFavorMeHelpedComponent (props) {

    const [favorMeHelped, setFavorMeHelped] = useState([])
    


    useEffect(() => {
        loadFavorMeHelped()
    },[])


    const loadFavorMeHelped = async () => {
        const data = await FavorightAPI.getFavorSolved()
      
        if (data){
             
            setFavorMeHelped(data ? data : [])
            
        } else {
            // console.log('you did not help any favors')
        }
    
    }

    const handleDeleteFavorMeHelped = async (favorToBeDeleted) => {
       
         if (props.userID == favorToBeDeleted.favorSolver){
            const data = await FavorightAPI.deleteFavorSolved(favorToBeDeleted.id)
            if (data){
                const updatedFavorSolved = favorMeHelped.filter(favor => favor.id != favorToBeDeleted.id)
                setFavorMeHelped(updatedFavorSolved)
                // console.log('favor I helped updated successfully!!!!!!!')
            } else {
                // console.log('failed to delete favor i helped')
            }
         } else {
            //  console.log('you did not helpe this favor')
             alert('you did not help this')
             return null
         }

    }

    const checkIsPaid = (post) => {
        if (post.is_paid) {
            // console.log('is paid')
            return "$$$"
        } else {
            // console.log('not paid')
            return  
        }
    }
    const renderFavorMeHelped = () => {
        let output = []
       if (favorMeHelped.length !== 0){
    
        for (let favor of favorMeHelped) {
            if (favor.favorSolver == props.userID) {
                output.push (
                    <div  key={favor.id} >
                        <Card style={{ width: '18rem' }} id="favor-me-helped-detail" >
                            <Card.Body   >
                                <Card.Title>{favor.title} </Card.Title>
                                <Card.Text>
                                description: {favor.description}
                                </Card.Text>
                                <Card.Text>
                                tips? {checkIsPaid(favor)}
                                </Card.Text>
                                <Card.Footer>
                                favor owner id: {favor.favorOwner}
                                </Card.Footer>
                            </Card.Body>
                            <hr></hr>
                            <Button variant="danger" onClick={()=> {handleDeleteFavorMeHelped(favor)}}>Delete</Button>
                        </Card>
                        
                    </div>
                )
            }
        }
       
       } else {
        //    console.log('still loading favor I helped')
        output.push(
            <div key={null}>
                <h3>You haven't git any favor yet</h3>
            </div>
        )
       }
       return output
        
    }




    return (
        <div id="favor-me-helped-component">
      
        {props.userID && renderFavorMeHelped()}
    
           
        </div>
    )
}

export default ShowFavorMeHelpedComponent


