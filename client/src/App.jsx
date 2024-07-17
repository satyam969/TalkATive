
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/Login'
import Layout from './layout/layout.jsx'
import ChatPage from './pages/ChatPage'
function App() {


  return (
    <>
     <Routes>
<Route path='/' element={<Home/>}></Route>
<Route path="/chats" element={<ChatPage/>} />
<Route path='/register' element={<Layout><RegisterPage/></Layout>}></Route>
<Route path='/login' element={<Layout><Login/></Layout>}></Route>


     </Routes>
    </>
  )
}

export default App
