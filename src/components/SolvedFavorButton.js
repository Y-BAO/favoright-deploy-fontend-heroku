import FavorightAPI from "../api/FavorightAPI"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from "react-bootstrap"

function SolvedFavorButton (props) {

   

    const navigate = useNavigate()


    const handleSolved = (event) => {
        event.preventDefault()
     
        
        const currentPostCreatorID = props.currentPost.creator
        const currentLoggedInUserID = props.userID
        const postID = props.currentPost.id
       
        const updateHelped = {
            id: postID,
            title: props.currentPost.title,
            description: props.currentPost.description,
            primaryAddress: props.currentPost.primaryAddress,
            secondaryAddress: props.currentPost.secondaryAddress,
            creator: props.currentPost.creator,
            is_helped: true
        }

        const favorSolvedData = {
            favorOwner: props.currentPost.creator,
            title: props.currentPost.title,
            description: props.currentPost.description,
            primaryAddress: props.currentPost.primaryAddress,
            secondaryAddress: props.currentPost.secondaryAddress,
            favorSolver:  props.comment.creator
        }
   
        if (currentPostCreatorID == currentLoggedInUserID) {
        
            const updateHelpedData = FavorightAPI.editPostByID(postID,updateHelped)
            const createdFavorSolvedData  = FavorightAPI.createFavorSolved(favorSolvedData)
            if (updateHelpedData && createdFavorSolvedData) {
                
                console.log("set helped succesffuly!!!!!!!!! !!!!!!!!!")
          
                navigate('/my-posts')
            } else {
                console.log("set helped failed !!!!!!!!!!!")
            }

        } else {
            console.log("you are not allowed to edit this post!!!!!!!")
        }
    }





    const checkUser = () => {
      
        if (props.currentPost.creator == props.userID && props.comment.creator != props.userID ){
            
            if (props.currentPost.is_helped === false){
                return (
                    <div>
                        <Button onClick={handleSolved} id='solvedButton' variant="info">Solved</Button>
                    </div>
                )
            }
                
        
           
        }
    }






    return (
        <div>
             <hr></hr>
            {checkUser()}
           
          
        </div>
    )
}

export default SolvedFavorButton