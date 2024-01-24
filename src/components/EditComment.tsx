import { FormEvent, useState } from "react"
import { Comment } from "../types.d"
import { Badge, Button, Dialog, DialogPanel, Divider, Flex, TextInput, Textarea, Title } from "@tremor/react"
import { toast } from "sonner"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateComment } from "../services/fetchComment"
import { RiEditLine } from "@remixicon/react"


export interface EditCommentProp {
    isOpen: boolean
    changeOpen: ( val :boolean ) => void
    comment: Comment
}

const EditComment = ({isOpen, changeOpen, comment}: EditCommentProp) => {

    const [result, setResult] = useState<'ko' | null>(null)
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
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
                        description
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
            toast.error('An error occurred while updating the comment')
            queryClient.setQueryData(['comment'], context?.previousComments)
            
        },
        onSettled: () => {
           queryClient.invalidateQueries({queryKey: ['comment']})
        }
    })

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if( isPending ) return

        setResult(null)

        const form = new FormData(event.currentTarget)
        const title = form.get('title')  as string
        const description = form.get('description')  as string

        if( !title || !description){
            return setResult('ko')
        }

        const updateComment: Comment = {
            id: comment.id,
            title,
            description
        }

        mutate( updateComment )

        toast.success(`The comment ${comment.id} has been successfully updated`)
        changeOpen(false)
    }

  return (
    <Dialog open={isOpen} onClose={(val: boolean) => changeOpen(val)} static={true}>
        <DialogPanel className="flex flex-col space-y-6">
          <Title className="text-xl font-bold">Edit User</Title>
          <Divider></Divider>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <TextInput placeholder="Enter your title" name="title" defaultValue={comment.title}  />
                <Textarea name="description" placeholder="Enter your Description" defaultValue={comment.description}></Textarea>
                <Divider></Divider>
                <Flex justifyContent="end" className="space-x-2 border-t pt-4 mt-2">
                    {
                        result === 'ko' && <Badge color='red' className="mr-5 px-4">Errors on the form</Badge>
                    }
                    <Button color="blue" className="flex gap-2 w-20" icon={RiEditLine}> 
                        Add
                    </Button>
                    <Button type="button" className="bg-red-600" color="red"  onClick={() => changeOpen(false)}>
                        Cancel
                    </Button>
                </Flex>
            </form>
        </DialogPanel>
      </Dialog>
  )
}

export default EditComment
