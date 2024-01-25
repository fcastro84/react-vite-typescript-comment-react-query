import { Button, Card, Divider, Flex, Text } from "@tremor/react"
import { CommentId, Comment } from "../types.d"
import { toast } from "sonner"
import EditComment from "./EditComment"
import { useState } from "react"
import { FadeLoader } from "react-spinners"
import useComment from "../hooks/useComment"

const ListsComments = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState({} as Comment);
  const { data, isLoading, isError, error, mutateDelete} = useComment()
  

  const handleDeleteComment = ( id: CommentId) => {
    mutateDelete(id)
    toast.success(`The comment with id: ${id} is delete success`)
  }


    const openOrClosedModal = ( val: boolean ) => {
      setIsOpen(val)
    }
  
  return (
    <div className="flex flex-col my-4">
      { (!isLoading && !isError) && (
        <>
          <h2 className="text-center font-bold mb-3">List of Comment</h2>
          <div className="grid grid-cols-3 mx-auto gap-2 w-[80%]">
                { data?.map( comment => {
                return (
                  <Card key={comment.id} className={`${comment.preview === true ? 'bg-gray-300' : 'bg-gray-100'}  border-blue-400 border-2 `}>
                    <Text className="text-center font-bold"> { comment.title } </Text>
                    <Divider></Divider>
                    <Text className="text-justify h-16"> { comment.description } </Text>
                    <Divider></Divider>
                    <Flex justifyContent="center" className="gap-3">
                      <Button type="button" color="blue" tooltip="Edit comment" onClick={() => {
                        openOrClosedModal(true)
                        setComment(comment)
                      }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>
                      </Button>
                      <Button type="button" color="red" tooltip="Remove comment" onClick={() => handleDeleteComment(comment.id) }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </Button>
                    </Flex>
                  </Card>
                )
              })
            }
            <EditComment isOpen={isOpen} changeOpen={openOrClosedModal} comment={comment} />
          </div>
        </>  
      )
      }
      { isLoading && <FadeLoader color="blue" loading={isLoading} cssOverride={{margin: '2rem auto', zIndex: '9999'}} aria-label="Loading Spinner" height={80} width={5} />}
      { isError && <span className=" text-center text-red-700 font-extrabold px-36">{error?.message}</span>}
      
    </div>
  )
}

export default ListsComments
