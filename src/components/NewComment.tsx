import { Card, Text, Divider, Button, TextInput, Textarea, Badge } from "@tremor/react"
import { FormEvent, useState } from "react"
import { Comment } from "../types.d"
import { toast } from "sonner"
import { RiAddFill } from "@remixicon/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "../services/fetchComment"


const NewComment = () => {

    const [form, setForm] = useState< 'error' | null >(null)
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: createComment,
        onMutate: async (newComment) => {
            await queryClient.cancelQueries({queryKey: ['comment']})

            const previousComments = queryClient.getQueryData(['comment'])

            queryClient.setQueryData(['comment'], (old: Comment[]) => [...old, newComment])

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
            
            toast.error('An error occurred while creating the new comment')
            queryClient.setQueryData(['comment'], context?.previousComments)
            
        },
        onSettled: () => {
           queryClient.invalidateQueries({queryKey: ['comment']})
        }
    })

    const handleSumit = ( event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if( isPending ) return

        setForm(null)
        const form = event.target as HTMLFormElement
        const formData = new FormData( event.currentTarget )
        const title = (formData.get('title') ?? '') as string
        const description = (formData.get('description') ?? '') as string
        if(!title || !description) {
            setForm('error')
            return
        }
        
        const id = crypto.randomUUID()

        const newComment: Comment = {
            id,
            title,
            description
        }

        mutate(newComment)
        form.reset()

        toast.success(`The comment with id: ${id} is create success`)
    }

  return (
    <Card className="max-w-lg mx-auto flex flex-col gap-6 border-blue-700 border-t-2">
        <Text className="font-bold uppercase">Add New Comment</Text>
        <form className="felx gap-5" onSubmit={handleSumit}>
        <TextInput name="title" placeholder="Enter your Title" className="mb-4" />
        <Textarea name="description" placeholder="Enter your Description"></Textarea>
        <Divider></Divider>
        <div className="flex justify-end">
            {
                form === 'error' && <Badge color='red' className="mr-5 px-4">Errors on the form</Badge>
            }
           <Button color="blue" className="flex gap-2 w-20" icon={RiAddFill} loading={isPending}> 
            Add
            </Button> 
        </div>
        
        </form>
    </Card>
  )
}

export default NewComment
