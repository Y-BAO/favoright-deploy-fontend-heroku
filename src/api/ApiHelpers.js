

import Cookie from "js-cookie"

const ApiHelpers = {}

ApiHelpers.getCsrfConfig = () => {
    return {
        // withCredentials:true,
        // headers:{
        //     "X-CSRFToken":Cookie.get("csrftoken")
        // }

        headers:{
            "Authorization":`Bearer ${localStorage.getItem('token')}`
        }
    }
}






ApiHelpers.tryFetchCatch = async (axiosCall) => {
    try {
        const response = await axiosCall() 
        // console.log("response data:", response.data)
        return response?.data ? response?.data : {"message": "action succeed"}
    } catch (error) {
        
        if (error?.response?.data?.username) {
            alert(error?.response ? error?.response?.data?.username : error)
        } else if (error?.response?.data?.title || error?.response?.data?.description || error?.response?.data?.primaryAddress  ){
            alert("title, description, primary address may not be blank")
        } else {
            // alert(error?.response ? error?.response?.data : error)
            alert("invalid input")
        }
      
   
        // alert('not found')
        
        return null
    }
}
export default ApiHelpers