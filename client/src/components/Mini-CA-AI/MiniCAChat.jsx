import { Bot, Sparkles } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function MiniCAChat({ handleQuickAction }) {

  const { response, isAILoading } = useSelector(state => state.miniCA)

  const handleClose = () => {
    handleQuickAction('ai')
  }

  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "ai",
      text: "Hello! I'm your Mini-CA. How can I help you today?"
    }
  ]);

  // --- AI response ko messages me add karo ---
  useEffect(() => {
    if (response && !isAILoading) {
      setMessages(prev => [
        ...prev,
        { id: Date.now(), from: "ai", text: response }
      ]);
    }
  }, [response, isAILoading]);

  return (

    <div className="min-h-screen z-2 absolute top-20 right-40 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      
      <div className="w-full max-w-3xl h-[90vh] flex flex-col bg-gray-800/50 rounded-2xl overflow-hidden shadow-2xl border border-white/10">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-blue-600/20 px-6 py-4 flex items-center gap-4 relative">

          {/* Left Icon */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Bot size={24} className="text-white" />
          </div>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              Mini-CA <Sparkles size={16} className="text-emerald-400" />
            </h1>
            <p className="text-sm text-gray-300">Your financial advisor</p>
          </div>

          {/* CLOSE BUTTON */}
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

        </div>

        {/* CHAT BODY */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3 custom-scrollbar">
          {messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* AI Typing Indicator */}
          {isAILoading && (
            <p className="text-emerald-400 text-sm animate-pulse">
              Mini-CA is thinking…
            </p>
          )}
        </div>

        {/* INPUT SECTION */}
        <div className="px-6">
          <ChatInput setMessages={setMessages} />
        </div>

      </div>
    </div>
  );
}

export default MiniCAChat;
