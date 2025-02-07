import React from 'react';
import { Message } from '../types/supabase';
import { useAuth } from '../contexts/AuthContext';

interface MessageBubbleProps {
  message: Message;
  onDelete: (messageId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onDelete }) => {
  const { user } = useAuth();
  const isOwnMessage = message.user_id === user?.id;

  return (
    <div className={`flex items-start space-x-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      {!isOwnMessage && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
          {message.avatar_url ? (
            <img src={message.avatar_url} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
              {message.role === 'assistant' ? 'A' : 'U'}
            </div>
          )}
        </div>
      )}
      <div className={`group relative max-w-[70%] ${message.deleted_at ? 'opacity-50' : ''}`}>
        <div
          className={`rounded-lg p-3 ${
            isOwnMessage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800'
          }`}
        >
          {message.deleted_at ? (
            <em>This message has been deleted</em>
          ) : (
            message.content
          )}
        </div>
        {isOwnMessage && !message.deleted_at && (
          <button
            onClick={() => onDelete(message.id)}
            className="absolute -right-8 top-1 opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        <div className="text-xs text-gray-500 mt-1">
          {new Date(message.created_at).toLocaleTimeString()}
        </div>
      </div>
      {isOwnMessage && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
          {user?.user_metadata?.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white">
              {user?.email?.[0].toUpperCase()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBubble; 