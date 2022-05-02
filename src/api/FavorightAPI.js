

import axios from 'axios'
import ApiHelpers from './ApiHelpers'

const BASE_URL = "http://localhost:8000/favoright"
// const BASE_URL = "https://favoright-fontend-heroku.herokuapp.com/"


const FavorightAPI = {}

// Favor Posts ------------------------------------------------------------------------------------------
// get
FavorightAPI.getAllPosts = async () => {
    return await ApiHelpers.tryFetchCatch(() => axios.get(`${BASE_URL}/posts/`,ApiHelpers.getCsrfConfig()))
}
// get
FavorightAPI.getPostByID = async (postID) => {
    return await ApiHelpers.tryFetchCatch(() => axios.get(`${BASE_URL}/posts/${postID}`, ApiHelpers.getCsrfConfig()))
  
}

// create
FavorightAPI.createPost = async (postData) => {
    return await ApiHelpers.tryFetchCatch(() => axios.post(`${BASE_URL}/posts/`, postData, ApiHelpers.getCsrfConfig()))
}

// Update
FavorightAPI.editPostByID = async (postID, editedPostData) => {
    return await ApiHelpers.tryFetchCatch(() => axios.patch(`${BASE_URL}/posts/${postID}/`, editedPostData, ApiHelpers.getCsrfConfig()))
}


// delete
FavorightAPI.deletePostByID = async(postID) => {
    return await ApiHelpers.tryFetchCatch(() => axios.delete(`${BASE_URL}/posts/${postID}`,ApiHelpers.getCsrfConfig()))
    
}

// All COMMENTS  ------------------------------------------------------------------------------------------
FavorightAPI.getAllComments = async () => {
    return await ApiHelpers.tryFetchCatch(() => axios.get(`${BASE_URL}/comments/`,ApiHelpers.getCsrfConfig()))
}
// Read
FavorightAPI.getCommentsByID = async (commentID) => {
    return await ApiHelpers.tryFetchCatch(() => axios.get(`${BASE_URL}/comments/${commentID}`, ApiHelpers.getCsrfConfig()))
}
// Create
FavorightAPI.createComment = async (commentData) => {
    return await ApiHelpers.tryFetchCatch(() => axios.post(`${BASE_URL}/comments/`, commentData, ApiHelpers.getCsrfConfig()))
}
// Update
FavorightAPI.editCommentByID = async (commentID,editedCommentData) => {
   return await ApiHelpers.tryFetchCatch(() => axios.patch(`${BASE_URL}/comments/${commentID}/`, editedCommentData, ApiHelpers.getCsrfConfig()))
}
// Delete
FavorightAPI.deleteCommentByID = async (commentID) => {
    return await ApiHelpers.tryFetchCatch(() => axios.delete(`${BASE_URL}/comments/${commentID}`, ApiHelpers.getCsrfConfig()))
}


// All SubComments

FavorightAPI.getSubCommentsByID = async (subCommentID) => {
    return await ApiHelpers.tryFetchCatch(() => axios.get(`${BASE_URL}/subcomments/${subCommentID}`, ApiHelpers.getCsrfConfig()))
}

FavorightAPI.createSubComment = async (subCommentData) => {
    return await ApiHelpers.tryFetchCatch(() => axios.post(`${BASE_URL}/subcomments/`, subCommentData, ApiHelpers.getCsrfConfig()))
}

FavorightAPI.deleteSubCommentByID = async (subCommentID) => {
    return await ApiHelpers.tryFetchCatch(() => axios.delete(`${BASE_URL}/subcomments/${subCommentID}`, ApiHelpers.getCsrfConfig()))
}




// --------------------------------------------------------------------------------------------------------------------------
// All favor solved 

// get  all favor solved 
FavorightAPI.getFavorSolved = async () => {
    return await ApiHelpers.tryFetchCatch(() => axios.get(`${BASE_URL}/solvedfavor/`,ApiHelpers.getCsrfConfig()))
}

FavorightAPI.createFavorSolved = async (favorData) => {
    return await ApiHelpers.tryFetchCatch(() => axios.post(`${BASE_URL}/solvedfavor/`, favorData, ApiHelpers.getCsrfConfig()))
}

FavorightAPI.deleteFavorSolved = async (favorSolvedID) => {
    return await ApiHelpers.tryFetchCatch(() => axios.delete(`${BASE_URL}/solvedfavor/${favorSolvedID}`, ApiHelpers.getCsrfConfig()))
}
 



// Authentication -----------------------------------------------------------------------------------------
FavorightAPI.login = async (loginData) => {
    return await ApiHelpers.tryFetchCatch(
        () => axios.post(`${BASE_URL}/login/`, loginData, ApiHelpers.getCsrfConfig())
    )
}

FavorightAPI.signUp = async (signUpData) => {
    return await ApiHelpers.tryFetchCatch(
        () => axios.post(`${BASE_URL}/users/`, signUpData, ApiHelpers.getCsrfConfig())
    )
}

FavorightAPI.logOut = async() => {
    return await ApiHelpers.tryFetchCatch(
        () => axios.post(`${BASE_URL}/logout/`, null, ApiHelpers.getCsrfConfig())
    )
}



// Yelp Api ===================================================================================

FavorightAPI.getYelp = async (inputParams) => {
    return await ApiHelpers.tryFetchCatch(
        () => axios.get(`${BASE_URL}/yelp_api?location=${inputParams.location}&term=${inputParams.term}&radius=${inputParams.radius}`, inputParams, ApiHelpers.getCsrfConfig())
    )
}


//  Google Api =====================================================================

FavorightAPI.getGoogleMap = async (addressInput) => {
    return await ApiHelpers.tryFetchCatch(
        () => axios.get(`${BASE_URL}/google_map_api?address=${addressInput}`, addressInput, ApiHelpers.getCsrfConfig())
    )
}









export default FavorightAPI
