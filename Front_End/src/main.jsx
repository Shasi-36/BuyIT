// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom';
import Home from './Pages/Home.jsx'
import Menu from './Pages/Menu.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index element={<Home/>}/>
      <Route path={'menu'} element={<Menu/>}/>
      <Route path={'about'} element={<About/>}/>
      <Route path={'contact'} element={<Contact/>}/>

    </Route>
  )
)

createRoot(document.getElementById('root')).render(
 <RouterProvider router={router}>

 </RouterProvider>
)
