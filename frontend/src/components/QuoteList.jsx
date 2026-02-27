import { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteList = ({ refreshTrigger }) => {
  const [quotes, setQuotes] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['', 'motivation', 'life', 'wisdom', 'success', 'courage', 'love', 'happiness'];

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const url = category
        ? `http://localhost:5000/api/quotes?category=${category}`
        : 'http://localhost:5000/api/quotes';
      const res = await axios.get(url);
      setQuotes(res.data);
    } catch (error) {
      console.error("Error fetching quotes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [category, refreshTrigger]);

  return (
    <div className="w-full max-w-6xl mx-auto my-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h3 className="text-2xl font-bold text-slate-100 mb-4 md:mb-0">Browse Quotes</h3>
        <div className="flex items-center space-x-3">
          <label htmlFor="category" className="text-slate-400 text-sm">Filter by Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <option value="">All Categories</option>
            {categories.filter(c => c).map(c => (
              <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-400"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <div key={quote.id} className="bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/50 rounded-2xl p-6 transition-all duration-300 group">
              <span className="text-xs font-semibold text-indigo-400 mb-3 uppercase tracking-wider block">
                {quote.category}
              </span>
              <p className="text-slate-200 text-lg mb-4 group-hover:text-white transition-colors line-clamp-4">
                "{quote.text}"
              </p>
              <p className="text-slate-400 italic font-medium text-sm text-right">
                — {quote.author}
              </p>
            </div>
          ))}
          {quotes.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              No quotes found in this category.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuoteList;
