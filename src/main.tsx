import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Spinner } from './components/ui/spinner/Spinner.tsx'
import './index.css'

const App = lazy(() => import('./App.tsx'));
const About = lazy(() => import('./pages/About.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<Spinner />}><App /></Suspense>,
  },
  {
    path: "/about",
    element: <Suspense fallback={<Spinner />}><About /></Suspense>,
  },
  {
    path: "/contact",
    element: <Suspense fallback={<Spinner />}><Contact /></Suspense>,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
