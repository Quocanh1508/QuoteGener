import { useState } from 'react';
import axios from 'axios';

const AddQuoteForm = ({ onQuoteAdded }) => {
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            await axios.post('http://localhost:5000/api/quotes', {
                text, author, category: category.toLowerCase()
            });
            setStatus({ type: 'success', message: 'Quote added successfully!' });
            setText('');
            setAuthor('');
            setCategory('');
            if (onQuoteAdded) onQuoteAdded();

            setTimeout(() => setStatus({ type: '', message: '' }), 3000);
        } catch (error) {
            console.error("Error adding quote", error);
            setStatus({ type: 'error', message: 'Failed to add quote. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto bg-slate-800/60 border border-slate-700 rounded-3xl p-8 my-12 shadow-xl">
            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center">
                <span className="bg-indigo-500 w-2 h-8 rounded-full mr-3 inline-block"></span>
                Add a New Quote
            </h3>

            {status.message && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'}`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="text" className="block text-sm font-medium text-slate-300 mb-2">Quote Text</label>
                    <textarea
                        id="text"
                        required
                        rows="3"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                        placeholder="Enter the quote..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label htmlFor="author" className="block text-sm font-medium text-slate-300 mb-2">Author</label>
                        <input
                            id="author"
                            type="text"
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="Who said it?"
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                        <input
                            id="category"
                            type="text"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                            placeholder="e.g. motivation, life"
                        />
                    </div>
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-3 px-4 rounded-xl font-bold text-white transition-all ${isSubmitting ? 'bg-indigo-500/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20'}`}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Quote'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuoteForm;
