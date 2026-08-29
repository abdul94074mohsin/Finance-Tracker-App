import { useState } from "react";
import { Send } from "lucide-react";
import { useDispatch } from "react-redux";
import { getResponse } from "../../feature/MiniCA/miniSlice";

function ChatInput({ setMessages }) {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const send = () => {
    if (!text.trim()) return;

    // User message add
    setMessages(prev => [
      ...prev,
      { id: Date.now(), from: "user", text }
    ]);

    // AI ko request
    dispatch(getResponse(text));

    setText("");
  };

  return (
    <div className="pt-4 pb-4">
      <div className="flex gap-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-white/10 px-4 py-3 rounded-full text-white"
          placeholder="Ask something…"
        />

        <button
          onClick={send}
          className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-emerald-500 to-blue-500 text-white"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default ChatInput;
