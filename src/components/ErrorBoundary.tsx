import React, { Suspense } from 'react';
import { Spinner } from './ui/spinner/Spinner';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      {children}
    </Suspense>
  );
};
