import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

// This is a style-only preview build with no live backend, so pages that
// expect real record shapes for CRUD screens may throw on mock data. Contain
// that to the page instead of blanking the whole app.
export class DemoErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('Demo preview: page needs live data, showing fallback.', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-[50vh] p-8">
          <div className="text-center max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Preview unavailable for this section</h2>
            <p className="text-sm text-gray-500">
              This is a style-only demo with sample data. This particular screen needs a live URY backend to render.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default DemoErrorBoundary;
