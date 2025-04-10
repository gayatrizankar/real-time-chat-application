import React, { useState } from "react";

const Settings = () => {
  const [colors] = useState([
    { name: "Black", big:"" , bg: "bg-black", text: "text-white" },
    { name: "White",big:""   , bg: "bg-white", text: "text-black" },
    { name: "Blue", big:"bg-blue-700"   ,bg: "bg-blue-400", text: "text-blue-500" },
    { name: "Orange", big:"bg-red-700" ,bg: "bg-red-300", text: "text-red-500" },
    { name: "Green", big:"bg-green-700" ,bg: "bg-green-300", text: "text-green-500" },
    { name: "Pink", big:"bg-pink-700" ,bg: "bg-pink-300", text: "text-pink-500" },
    { name: "Yellow", big:"bg-yellow-700" ,bg: "bg-yellow-300", text: "text-yellow-500" },
    { name: "Indigo", big:"bg-indigo-700" ,bg: "bg-indigo-300", text: "text-indigo-700" },
    { name: "Purple", big:"bg-purple-700" ,bg: "bg-purple-300", text: "text-purple-500" },
  ]);

  const [selectedTheme, setSelectedTheme] = useState(colors[2]); 
  return (
    <div className={`bg-blue-300 h-full w-full flex flex-col items-center ${selectedTheme.big}`}>
      <h1 className={`p-5 text-2xl ${selectedTheme.text} font-bold`}>SET THE THEME</h1>

      <div className="w-[500px] flex flex-wrap justify-center gap-5 m-5">
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => setSelectedTheme(color)}
            className={`transition-transform duration-500 ease-in-out hover:scale-110 hover:animate-pulse h-[100px] w-[150px] rounded-xl cursor-pointer ${color.bg} ${color.text} flex items-center justify-center font-bold text-xl border-2 border-white`}
          >
            {color.name}
          </div>
        ))}
      </div>

      <div>
        <h1 className="text-3xl text-white font-bold p-5 text-xl text-black">Preview</h1>
        <div
          className={`h-[500px] w-[1000px]  flex flex-col justify-between items-center mb-10 p-5 rounded-xl`}
        >
          <div
            className={`h-[400px] w-[700px] ${selectedTheme.bg} rounded-xl flex flex-col p-5 shadow-md`}
          >
            <div className="border-b-2 border-white w-full p-3">
              <p className={`${selectedTheme.text} font-bold text-xl`}>Name</p>
            </div>

            <div className="w-full flex flex-col gap-4 p-5 flex-grow overflow-y-auto">
              <div
                className={`self-end ${selectedTheme.bg} text-white px-4 py-2 rounded-xl text-lg font-bold w-fit`}
              >
                Hii, How are you ???
              </div>

              <div className="self-start bg-gray-200 text-black px-4 py-2 rounded-xl text-lg font-bold w-fit">
                I am Fine, What About You ???
              </div>
            </div>
          </div>
          <div
            className={`w-full max-w-[700px] flex items-center gap-3 ${selectedTheme.bg} p-3 shadow-md`}
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full p-2 border border-gray-300 rounded-lg outline-none"
            />
            <button className="px-5 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
