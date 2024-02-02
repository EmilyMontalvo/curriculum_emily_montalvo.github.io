import React from 'react'
import {Outlet, Link, useLocation} from 'react-router-dom'

const Layout = () => {
    const location = useLocation()


  return (
    <div>
      <div className='md:flex md:min-h-screen'> 
        <aside className='md:w-1/6 bg-black px-5 py-10'>
            <h2 className='text-xl font-black text-center text-white '>EMILY MONTALVO CURRICULUM</h2>
            <nav className='mt-10 text-center'>
              <hr />      
                <Link to="/" className={`${location.pathname === '/'?'text-blue-300':'text-white'} block my-5 hover:text-blue-300 text-white uppercase`}>DATOS PERSONALES</Link><hr />
                <Link to="/education" className={`${location.pathname === '/education'?'text-blue-300':'text-white'} block my-5 hover:text-blue-300 text-white uppercase`}>EDUCACIÓN</Link> <hr /> 
                <Link to="/experience" className={`${location.pathname === '/experience'?'text-blue-300':'text-white'} block my-5 hover:text-blue-300 text-white uppercase`}>EXPERIENCIA</Link> <hr />
                <Link to="/personalReference" className={`${location.pathname === '/personalReference'?'text-blue-300':'text-white'} block my-5 hover:text-blue-300 text-white uppercase`}>REFERENCIAS PERSONALES</Link> <hr />
            </nav>
        </aside>
        <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'> 
        <Outlet/>
        </main>
      </div>
       
    </div>
  )
}

export default Layout
