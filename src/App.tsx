
import { Toaster } from 'sonner'
import './App.css'
import NewComment from './components/NewComment'
import ListsComments from './components/ListsComments'
import { Flex, Subtitle } from '@tremor/react'

function App() {

  return (
    <>
    <Flex flexDirection='col' className='my-5 border-2 mx-auto gap-2 w-[80%] border-blue-400'>
      <h1 className='text-center font-bold uppercase my-2'>Apps of Comments: (React + React Query + Tremor + Tailwindcss + Sonner + React Spinner)</h1>
      <Subtitle>The repository code can be found at the following link: <a href="https://github.com/fcastro84/react-vite-typescript-comment-react-query" target='_blank' className='text-blue-700 font-bold'>Here</a></Subtitle>
    </Flex>
      
      <NewComment />
      <ListsComments />
      <Toaster richColors position='top-right' />
    </>
  )
}

export default App
