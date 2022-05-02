 
 
const key = process.env.REACT_APP_MAP_API_KEY



function DropOffMapView (props) {

  

    const renderDropOffMapView =   () => {


        const dropOffAddressToRender = props.secondaryAddress
        
        if ( props.secondaryAddress){
          // loadMapData()
            return (
              <div>
                <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${key}
              &q=${dropOffAddressToRender ? dropOffAddressToRender: ""}`}
              width="600"
              height="450"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>  
              </div>
            )
           

        } else {
          return  "N/A"
        }

     
        }  
    

 

    return (
        <div>
            <h4>Drop Off/ Destination Address</h4>
            {renderDropOffMapView()}
            
        </div>
    )



}


export default DropOffMapView