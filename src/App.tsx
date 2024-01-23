
import { Toaster } from 'sonner'
import './App.css'
import NewComment from './components/NewComment'
import ListsComments from './components/ListsComments'

function App() {

  return (
    <>
      <h1 className='text-center font-bold uppercase my-2'>Apps of Comments</h1>
      <NewComment />
      <ListsComments />
      <Toaster richColors />
    </>
  )
}

export default App
