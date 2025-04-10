import React, { useState, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { Camera, Send, X } from "lucide-react";
import { toast } from "react-hot-toast";

const MessageInputs = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage, selectedUser } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("❌ File type not supported");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imageFile) return;
    if (!selectedUser) {
      toast.error("❌ No user selected");
      return;
    }

    const formData = new FormData();
    formData.append("text", text.trim());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await sendMessage(formData); // ✅ FIXED: Remove selectedUser._id from here
      setText("");
      removeImage();
    } catch (error) {
      console.error("❌ Error sending message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="p-4 w-full bg-blue-900 rounded-xl shadow-lg">
      {/* Image Preview */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-3 p-2 rounded-lg bg-blue-800">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-xl border-2 border-blue-700 shadow-md"
          />
          <button
            onClick={removeImage}
            className="bg-red-600 text-white p-2 rounded-full hover:bg-red-500 transition-all"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Input Form */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-3 bg-blue-800 rounded-full p-3"
      >
        {/* Image Upload Button */}
        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="text-blue-300 hover:text-white transition-all"
        >
          <Camera size={22} />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />

        {/* Message Input */}
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-white placeholder-blue-300 border-none focus:outline-none text-lg"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-500 transition-all"
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default MessageInputs;
