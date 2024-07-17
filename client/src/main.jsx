import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ChatProvider } from './context/ChatProvider.jsx'
import {ChakraProvider} from '@chakra-ui/react'
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <BrowserRouter>
    <ToastContainer
position="top-right"
bodyClassName="toastBody"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>

  <ChatProvider>
  <ChakraProvider>
      <App />
      </ChakraProvider>
      </ChatProvider>
   
    </BrowserRouter>
   
  </React.StrictMode>,
)
