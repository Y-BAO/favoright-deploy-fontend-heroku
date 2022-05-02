import ShowFavorMeHelpedComponent from "../components/ShowFavorMeHelpedComponent"





function FavorMeHelpedPage (props) {










    return (
        <div id="favor-me-helped-page">
           <h1>favor that i helped </h1>
            <ShowFavorMeHelpedComponent userID={props.userID} />
        </div>
    )
}

export default FavorMeHelpedPage