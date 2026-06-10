import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { PropsWithChildren } from 'react';

function ErrorFallback() {
  return (
    <main>
      <h1>Something went wrong</h1>
      <button onClick={() => window.location.reload()}>Reload</button>
    </main>
  );
}

export function ErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}