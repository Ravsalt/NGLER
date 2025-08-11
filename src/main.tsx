import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Spinner } from './components/ui/spinner/Spinner';
import './index.css';

// Lazy load components with error handling
const lazyWithRetry = (componentImport: any) =>
  lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.error('Error loading component:', error);
      throw error;
    }
  });

// Lazy load components
const App = lazyWithRetry(() => import('./App'));
const About = lazyWithRetry(() => import('./pages/About'));
const Contact = lazyWithRetry(() => import('./pages/Contact'));

// Error boundary component
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<Spinner />}>
      {children}
    </Suspense>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
  },
  {
    path: "/about",
    element: (
      <ErrorBoundary>
        <About />
      </ErrorBoundary>
    ),
  },
  {
    path: "/contact",
    element: (
      <ErrorBoundary>
        <Contact />
      </ErrorBoundary>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
