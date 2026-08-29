import { Bot, User } from 'lucide-react';
import ReactMarkdown from "react-markdown";

function MessageBubble({ message }) {
  const isUser = message.from === 'user';

  return (
    <div
      className={`flex items-start gap-3 mb-3 animate-fade-in ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* ICON */}
      <div
        className={`w-9 h-9 flex items-center justify-center rounded-full shadow-md ${
          isUser
            ? 'bg-gradient-to-br from-emerald-500 to-blue-500 text-white'
            : 'bg-white/10 border border-white/20 text-emerald-400'
        }`}
      >
        {isUser ? <User size={18} /> : <Bot size={18} />}
      </div>

      {/* MESSAGE BUBBLE */}
      <div
        className={`max-w-[75%] p-3 rounded-2xl shadow-lg leading-relaxed text-sm ${
          isUser
            ? 'bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-tr-none'
            : 'bg-white/10 backdrop-blur-md border border-white/20 text-gray-100 rounded-tl-none'
        }`}
      >
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default MessageBubble;
