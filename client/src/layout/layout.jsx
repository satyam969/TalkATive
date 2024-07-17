

import logo from '../assets/logo.png';

const Layout = ({children}) => {
  return (<>
   <header className='flex mt-3 mb-2 justify-center items-center py-3 h-20 shadow-md bg-white'>

<img className='logo' src={logo} alt="logo"   width={180}
              height={40}/>


   

   </header>

{children}
</>

  )
}

export default Layout
