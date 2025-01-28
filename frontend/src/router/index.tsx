import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from '@/pages/home';
import About from '@/pages/about';
import Contact from '@/pages/contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/contact',
    element: <Contact />,
  }
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;