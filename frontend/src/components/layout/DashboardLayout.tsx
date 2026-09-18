import React from 'react';
import { Outlet } from 'react-router-dom';
import { BranchProvider } from '../../context/BranchContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { DemoErrorBoundary } from '../DemoErrorBoundary';
// import { Footer } from './Footer';

export const DashboardLayout: React.FC = () => {
  return (
    <BranchProvider>
      <div className="h-screen flex flex-col bg-background text-foreground font-inter text-sm overflow-hidden">
        <div className="bg-amber-400 text-amber-950 text-xs font-semibold text-center py-1.5 shrink-0">
          Demo Preview — sample data only, no live backend connected
        </div>
        <Header />
        <div className="flex flex-1 min-h-0 overflow-hidden">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto min-w-0">
            <DemoErrorBoundary>
              <Outlet />
            </DemoErrorBoundary>
          </main>
        </div>
        {/* <Footer /> */}
      </div>
    </BranchProvider>
  );
};

export default DashboardLayout;
