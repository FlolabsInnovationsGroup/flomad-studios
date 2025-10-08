'use client'
 
import { useEffect } from 'react'
import Link from 'next/link'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Only log detailed errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Page error:', error)
    } else {
      // Log minimal information in production
      console.error('Application error occurred')
      // TODO: Send error to monitoring service
    }
  }, [error])
 
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-red-500">Something went wrong!</h2>
          <p className="text-foreground/70">
            We encountered an unexpected error. Don&apos;t worry, our team has been notified.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="px-6 py-3 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-3 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary/10 transition-colors inline-block"
          >
            Go home
          </Link>
        </div>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-foreground/60">
              Error Details (Development Only)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-3 rounded overflow-auto max-h-40">
              {error.message}
              {error.stack && (
                <>
                  {'\n\nStack trace:\n'}
                  {error.stack}
                </>
              )}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
