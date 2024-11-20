/* eslint-disable no-unused-vars */
import React from 'react'
import Logo from '../assests/logo.png'
import {Link} from 'react-router-dom'
import {FaUser} from 'react-icons/fa'
import {FaShoppingCart} from 'react-icons/fa'

const Header = () => {
  return (
    <header className='fixed w-full shadow-md h-16 px-2 md:px-4 -z-50'>
       {/* Desktop */}
      <div className="flex items-center h-full justify-between">
         <Link to={""}>
         <div className='h-10 '>
            <img src={Logo} className='h-full' alt="Logo" />
         </div>
         </Link>
         <div className="flex items-center gap-4 md:gap-7">
         <nav className='flex items-center gap-4 md:gap-7'>
         <Link to={'/'}>Home</Link>
         <Link to={'/menu'}>Menu</Link>
         <Link to={'/about'}>About</Link>
         <Link to={'contact'}>Contact Us</Link>

         </nav>
        
         <div className="text-slate-500 text-2xl relative">
         <FaShoppingCart />
         <div className="absolute -top-2 -right-2 w-5 h-auto bg-red-500 rounded-full  text-white text-sm text-center ">0</div>
         </div>
         <div className='text-slate-500 text-2xl'>
         <FaUser />
         </div>
         </div>
         
      </div>

       {/* /*Mobile*/ }

    </header>
 )
}

export default Header