import { useState } from 'react';
import QuoteDisplay from './components/QuoteDisplay';
import QuoteList from './components/QuoteList';
import AddQuoteForm from './components/AddQuoteForm';

function App() {
  const [activeTab, setActiveTab] = useState('random');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleQuoteAdded = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab('browse');
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-900/40 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/30 blur-[120px] pointer-events-none"></div>

      <header className="py-8 border-b border-white/5 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <img
              src="/logo.png"
              alt="LibraryOfQuote Logo"
              className="w-16 h-16 object-cover rounded-xl mr-3 shadow-lg shadow-indigo-500/20 bg-white/5 p-1"
            />
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              LibraryOf<span className="text-indigo-400">Quote</span>
            </h1>
          </div>

          <nav className="flex space-x-2 bg-slate-800/80 p-1 rounded-2xl border border-slate-700/50 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('random')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'random' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              Daily Inspiration
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'browse' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              Browse Library
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${activeTab === 'add' ? 'bg-indigo-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'}`}
            >
              Contribute
            </button>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className={`transition-opacity duration-500 ${activeTab === 'random' ? 'opacity-100' : 'hidden'}`}>
          <QuoteDisplay />
        </div>

        <div className={`transition-opacity duration-500 ${activeTab === 'browse' ? 'opacity-100' : 'hidden'}`}>
          <QuoteList refreshTrigger={refreshTrigger} />
        </div>

        <div className={`transition-opacity duration-500 ${activeTab === 'add' ? 'opacity-100' : 'hidden'}`}>
          <AddQuoteForm onQuoteAdded={handleQuoteAdded} />
        </div>
      </main>

      <footer className="py-8 mt-auto border-t border-white/5 relative z-10 text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} LibraryOfQuote. Powered by React, Vite, and tailwindCss. Made by Quoc Anh.</p>
      </footer>
    </div>
  );
}

export default App;
