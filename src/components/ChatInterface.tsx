import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageToAI = async (userMessage: string) => {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://aero-chat.vercel.app',
          'X-Title': 'Aero Chat'
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-pro-exp-02-05:free",
          messages: [
            {
              role: 'system',
              content: "You are an assistant specialized in aerospace engineering,CFD and CAD. Only answer questions related to aerospace,CFD and CAD topics, politely decline other inquiries and do not provide any information about other topics"
            },

            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            })),
            {
              role: 'user',
              content: userMessage
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('AI response error:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await sendMessageToAI(input);
      
      const aiMessage: Message = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r hidden md:block">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Conversations</h2>
        </div>
        <div className="p-4">
          <button
            onClick={() => signOut()}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => signOut()} 
              className="text-gray-600 md:hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">Aero Chat</h1>
          </div>
          <button className="text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-12">
              <h2 className="text-2xl font-bold mb-3">Welcome to Aero Chat!</h2>
              <p className="text-lg">Start your conversation with our AI assistant.</p>
            </div>
          )}
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[60%] rounded-lg px-6 py-3 ${
                  message.role === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-800'
                } shadow-md`}
              >
                <p className="text-base leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-75 mt-2 block">
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-6">
              <div className="bg-gray-200 rounded-lg px-6 py-3">
                <div className="animate-pulse flex space-x-3">
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t px-6 py-4">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-6 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface; 