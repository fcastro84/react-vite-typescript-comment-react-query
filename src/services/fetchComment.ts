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
            throw new Error("No fetch to the API"); 
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
            throw new Error("Can not have create comment");  
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
        throw new Error("Can not have delete comment");  
    }
}