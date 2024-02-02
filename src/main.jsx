import React from 'react'; 
import './index.css'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Layout from './components/Layout';
import PersonalInfo from './pages/PersonalInfo';
import Education from './pages/Education';
import Experience from './pages/Experience';
import PersonalReference from './pages/PersonalReference';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout/>,
      children: [
        {
          index: true, 
          element: <PersonalInfo/>, 
                
        },
        {
          path: '/education',
          element: <Education/>, 
        },
        {
          path: '/experience',
          element: <Experience/>,
        },
        {
          path: '/personalReference',
          element: <PersonalReference/>,
        }
      ]
    }, 
  ]
  )
  
  ReactDOM.createRoot(document.getElementById('root')).render(
  
    <React.StrictMode>
        <RouterProvider 
        router = {router}
        />
    </React.StrictMode>
  )
  