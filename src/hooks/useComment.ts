import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createComment, deleteComment, getComments, updateComment } from "../services/fetchComment"
import { toast } from "sonner"
import { Comment } from "../types.d"


const useComment = () => {
  
    const queryClient = useQueryClient()
  
  const { data, isLoading, isError, error} = useQuery({
    queryKey: ['comment'],
    queryFn: getComments,
    refetchOnWindowFocus: false

  })

  const { mutate: mutateCreate, isPending } = useMutation({
    mutationFn: createComment,
    onMutate: async (newComment) => {
        await queryClient.cancelQueries({queryKey: ['comment']})

        const previousComments = queryClient.getQueryData(['comment'])
        

        queryClient.setQueryData(['comment'], (old: Comment[]) => {
            const newCommentPreview = structuredClone(newComment)
            newCommentPreview.preview = true
            if(old === null) return [newCommentPreview]
            return [...old, newCommentPreview]
        })

        return { previousComments }
    },
    onSuccess: (/*data*/) => {

        //Update of Query data manually
        // const comment = queryClient.getQueriesData({ queryKey: ['comment']})[0][1] as Comment[]
        // const newState = comment ? [...comment, data] : [data]
        // queryClient.setQueryData(['comment'], () => newState)

        //Refresh de la query
        //queryClient.invalidateQueries({queryKey: ['comment']})
    },
    onError: (error, newComment, context) => {
        console.log(error,newComment)
        
        toast.error('An error occurred while creating the new comment')
        queryClient.setQueryData(['comment'], context?.previousComments)
        
    },
    onSettled: () => {
       queryClient.invalidateQueries({queryKey: ['comment']})
    }
})

const { mutate: mutateUpdate, isPending: isPendingUpdate } = useMutation({
    mutationFn: updateComment,
    onMutate: async ( updateComment ) => {
        await queryClient.cancelQueries({queryKey: ['comment']})

        const previousComments = queryClient.getQueryData(['comment'])
        const { id, title, description } = updateComment

        queryClient.setQueryData(['comment'], (old: Comment[]) => [...old].map( comment => {
            if( comment.id === id ){
                return {
                    ...comment,
                    title,
                    description,
                    preview: true
                }
            }
            return comment
        }))

        return { previousComments }
    },
    onSuccess: () => {

        //Refresh de la query
        //queryClient.invalidateQueries({queryKey: ['comment']})
    },
    onError: (error, updateComment, context) => {
        console.log(error,updateComment)
        toast.error('An error occurred while updating the comment')
        queryClient.setQueryData(['comment'], context?.previousComments)
        
    },
    onSettled: () => {
       queryClient.invalidateQueries({queryKey: ['comment']})
    }
})

  const { mutate: mutateDelete } = useMutation({
    mutationFn: deleteComment,
    onMutate: async (id) => {
        await queryClient.cancelQueries({queryKey: ['comment']})

        const previousComments = queryClient.getQueryData(['comment'])

        queryClient.setQueryData(['comment'], (old: Comment[]) => [...old].filter( comment => comment.id !== id))

        return { previousComments }
    },
    onSuccess: () => {

        //Refresh de la query
        //queryClient.invalidateQueries({queryKey: ['comment']})
    },
    onError: (error, newComment, context) => {
        console.log(error,newComment)
        toast.error('An error occurred while deleting the comment')
        queryClient.setQueryData(['comment'], context?.previousComments)
        
    },
    onSettled: () => {
       queryClient.invalidateQueries({queryKey: ['comment']})
    }
})

return {
    data, 
    isLoading,
    isError,
    error,
    mutateDelete,
    mutateCreate,
    isPending,
    mutateUpdate,
    isPendingUpdate
}

}

export default useComment
