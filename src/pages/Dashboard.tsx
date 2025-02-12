import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ChatInterface from '../components/ChatInterface';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Aero-Chatbox</h1>
          <div className="flex items-center space-x-4">
            <span>{user?.email}</span>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">Welcome to Aero-Chatbox</h2>
        <ChatInterface />
      </main>
    </div>
  );
};

export default Dashboard; 