
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import { Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import FavorightAPI from '../api/FavorightAPI'
 


function AllPostPage(props){
    // state
    const [posts, setPosts] = useState([])
    const [postsBeingRendered, setPostsBeingRendered] = useState([])
    
    // effects
    useEffect(() => {
        loadPosts()
    }, [props.userName])


    // useEffect(() => {
    //     renderPosts()
    // }, [])

    const loadPosts = async () => {
        const data = await FavorightAPI.getAllPosts()
        setPosts(data ? data : [])
        setPostsBeingRendered(data ? data : [])
    }

    //  check is-helped property, then assign emoji!
    const checkIsHelped = (post) => {

        if (post.is_helped){
            return (
                <div id='post-solved'>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                    </svg>
                    &nbsp;
                    {checkIsPaid(post)}
                </div>
            )
        } else {
            return (
                <div id='post-not-solved'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-frown" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                    </svg>
                    &nbsp;
                    {checkIsPaid(post)}
                </div>
            )
        }
    }

        //  category translator 
    const checkPostCategory = (post) => {
        if (post.category == 1){
            return "delivery"
        } 
 
        if (post.category == 2) {
            return "repair"
        }
 
        if (post.category == 3){
            return "other"
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

    //  render post logic,    loop over given post obj,   return designed content 
    const renderPosts = (posts) => {
        let output = []
        for (let post of posts){
            if (post.creator != props.userID){
                output.push(
                <div key={post.id} className="all-post-page-detail" >
                <span>  {checkIsHelped(post)} <Link to={`/all-posts/${post.id}`}><h3>{post.title} </h3></Link>
        
                favor-owner:{post.creator} </span> 
                <p>category: {checkPostCategory(post)}</p>
             
                </div> )
            } else {
                output.push(
                    <div key={post.id} className="all-post-page-detail"  id="all-post-page-detail-my-post">
                   
                    <span> {checkIsHelped(post)} <Link to={`/all-posts/${post.id}`}> <h3>{post.title}  </h3></Link> 
           
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                      </span> 
                    <p>category: {checkPostCategory(post)}</p>
               
                    </div> )
      
                }
            }
         return output
          
    }

//  filter posts from posts state value  (take in category param)
    const filterPosts = (category) => {
        if (category == 0){     // category (all) has value '0'
            setPostsBeingRendered(posts)    // show all
        } else if (category){  // if given category
            
            const sameCategoryPosts = posts.filter(post => post.category == category)  // filter out all posts in same cateogry

            if (sameCategoryPosts.length === 0){  // if no posts found from same cateogry 
                setPostsBeingRendered([])            // set the post being rendered to the original post object (render original post obj)
                return <h1>this category does not has any posts yet</h1>
            } else {
                setPostsBeingRendered(sameCategoryPosts)    // found posts in same category, set to updated render value 
                
            }
     
        } else {
            console.log('no category given ')
            setPostsBeingRendered(posts)       // no category selected (initial render)  render all posts
        }
       
      
           
        }

    const handleFilter = (event) => {
        let category = event.target.value
        filterPosts(category)

    }


   

    return (

        <div id='all-post-page' >  
                  
              
                <div>
                {/* <div id='all-post-page-header'>
                    <h2>All Post Page</h2>
                </div>   */}

                <div id="all-post-page-header">

                <Form.Select id="all-post-page-select" onChange={handleFilter}>
                <option id="delivery"   value={0}>All</option>
                <option id="delivery" value={1}>Delivery</option>
                <option id="repair" value={2}>Repair</option>
                <option id="other" value={3}>Other</option>
                </Form.Select>
           
                </div>
                
                <div></div>
                your posts: 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-star-fill" viewBox="0 0 16 16">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>
                &nbsp;
                paid: <strong>$$$</strong>

                &nbsp;
                unsolved: 
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-emoji-frown" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                    </svg>
                
                &nbsp;
                solved:
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.354 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                    <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z"/>
                    </svg>
               
                <div >
                {renderPosts(postsBeingRendered)}  
                
                </div>
                </div>
            



               

        </div>
    )
}

export default AllPostPage