import { Comment, CommentId } from "../types.d"

const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = 'https://api.jsonbin.io/v3/b/65afc9f51f5677401f23d05a'

export const getComments = async () => {
    
        const resp = await fetch(API_URL, {
            method: 'GET',
            headers: {
                "X-Master-Key": API_KEY
            }
        })

        if(! resp.ok) {
            throw new Error("Cannot access the API"); 
        }
        const { record: comments} = await resp.json() as { record: Comment[]}
        return comments
    

}

export const createComment = async( newComment: Comment) => {
    
        const comments = await getComments()
        const newCommentsArray = [...comments, newComment]
        
        const resp = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                "X-Master-Key": API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCommentsArray)
        })

        if(!resp.ok){
            throw new Error("Could not create new comment");  
        }

        return newComment
}

export const deleteComment = async( id: CommentId) => {
    
    const comments = await getComments()
    const commentsUpdate = comments.filter( comment => comment.id !== id)
    
    const resp = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            "X-Master-Key": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(commentsUpdate)
    })

    if(!resp.ok){
        throw new Error("Could not delete the comment");  
    }
}

export const updateComment = async( updateComment: Comment ) => {
    const { id, title, description } = updateComment
    const comments = await getComments()
    const newCommentsArray = [...comments].map( comment => {

        if( comment.id === id){
            return {
                ...comment,
                title,
                description
            }
        }

        return comment
    })
    
    const resp = await fetch(API_URL, {
        method: 'PUT',
        headers: {
            "X-Master-Key": API_KEY,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCommentsArray)
    })

    if(!resp.ok){
        throw new Error("Could not update the comment");  
    }

    return updateComment
}