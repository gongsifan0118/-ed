
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import FilterSection from './components/FilterSection';
import ContentList from './components/ContentList';
import TopicDrawer from './components/TopicDrawer';

const App: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[1600px] mx-auto w-full p-4 space-y-4">
        {/* Top Filter Area */}
        <FilterSection onTopicListClick={() => setIsDrawerOpen(true)} />

        {/* Bottom Content Area */}
        <ContentList />
      </main>

      {/* Floating Scroll to Top - Aesthetic Element from Screenshot */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2">
        <div className="bg-slate-200 dark:bg-slate-800 w-16 h-3 rounded-t-full flex items-center justify-center border border-slate-300 dark:border-slate-700 border-b-0 cursor-pointer shadow-lg opacity-80 hover:opacity-100 transition-all hover:h-4 group">
          <span className="material-icons text-xs text-slate-500 group-hover:text-primary">expand_less</span>
        </div>
      </div>

      {/* Side Drawer for Topics */}
      <TopicDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </div>
  );
};

export default App;
