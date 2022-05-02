
   const key = process.env.REACT_APP_MAP_API_KEY



function PickUpMapView(props){

 
  const renderPickUpMapView = () => {
    
    
  const pickUpAddressToRender = props.primaryAddress
  if (pickUpAddressToRender) {
    return (
      <div>
        <iframe
      src={`https://www.google.com/maps/embed/v1/place?key=${key}
      &q=${pickUpAddressToRender?pickUpAddressToRender:""}`}
      width="600"
      height="450"
      style={{ border: "0" }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>  
      </div>
    )
  } else {
    return "N/A"
  }

   
  }



   
    return (

      <div>

      <h4>PickUp/Favor Owner address</h4>
     
       {renderPickUpMapView()}
    
    
          </div>
    )
}


export default PickUpMapView