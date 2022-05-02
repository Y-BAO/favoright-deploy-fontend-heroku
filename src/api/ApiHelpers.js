

import Cookie from "js-cookie"

const ApiHelpers = {}

ApiHelpers.getCsrfConfig = () => {
    return {
        withCredentials:true,
        headers:{
            "X-CSRFToken":Cookie.get("csrftoken")
        }
    }
}



ApiHelpers.tryFetchCatch = async (axiosCall) => {
    try {
        const response = await axiosCall() 
        console.log("response data:", response.data)
        return response.data ? response.data : {"message": "action succeed"}
    } catch (error) {
        console.log("tryFetchCatch error!!!:", error.response ? error.response.data : error)
        // window.location.href('http://localhost:3000')
        alert('not found')
        
        return null
    }
}
export default ApiHelpers