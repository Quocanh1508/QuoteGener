import { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteDisplay = () => {
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchRandomQuote = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/quotes/random');
            setQuote(res.data);
        } catch (error) {
            console.error("Error fetching quote", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomQuote();
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-6 md:p-12 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 relative overflow-hidden my-8">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-indigo-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 left-0 -mt-4 -ml-4 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob animation-delay-2000"></div>

            {loading ? (
                <div className="flex justify-center items-center h-48">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-400"></div>
                </div>
            ) : quote ? (
                <div className="relative z-10 text-center">
                    <span className="inline-block py-1 px-3 mb-6 bg-indigo-500/20 text-indigo-300 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {quote.category}
                    </span>
                    <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200 leading-tight mb-8">
                        "{quote.text}"
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 font-medium italic mb-8">
                        — {quote.author}
                    </p>
                    <button
                        onClick={fetchRandomQuote}
                        className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        Get Another Quote
                    </button>
                </div>
            ) : (
                <p className="text-center text-slate-400">No quotes available.</p>
            )}
        </div>
    );
};

export default QuoteDisplay;
