import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Send, Mail, User, MessageSquare } from 'lucide-react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-6 rounded-lg text-center border border-green-200 dark:border-green-800">
        <h3 className="text-xl font-bold mb-2">Message Sent! 🚀</h3>
        <p>Thanks for reaching out. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Mail className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        Send us a Message
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              id="name"
              type="text"
              name="name"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Your Name"
              required
            />
          </div>
          <ValidationError prefix="Name" field="name" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email or Mobile
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              id="email"
              type="text"
              name="email"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="your@email.com or +91..."
              required
            />
          </div>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message
          </label>
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="How can we help you?"
              required
            />
          </div>
          <ValidationError prefix="Message" field="message" errors={state.errors} />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full bg-purple-600 dark:bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 dark:hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-purple-200 dark:shadow-none"
        >
          {state.submitting ? 'Sending...' : (
            <>
              Send Message <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
