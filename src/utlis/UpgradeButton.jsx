// import React from 'react';
// import { Sparkles } from 'lucide-react';

// export default function UpgradeButton() {
//   return (
//     <button className="
//       relative group
//       px-8 py-2
//       bg-gradient-to-r from-violet-600 to-indigo-600
//       text-white font-semibold
//       rounded-xl
//       shadow-lg
//       overflow-hidden
//       transform transition-all duration-300 ease-out
//       hover:scale-105 hover:shadow-2xl
//       active:scale-95
//       focus:outline-none focus:ring-4 focus:ring-violet-300
//     ">
//       {/* Animated Background Layer */}
//       <div className="
//         absolute inset-0 
//         bg-gradient-to-r from-violet-500 to-indigo-500
//         transform translate-x-[-100%] group-hover:translate-x-[100%]
//         transition-transform duration-1000 ease-in-out
//       " />

//       {/* Pulse Ring */}
//       <div className="
//         absolute -inset-1
//         bg-gradient-to-r from-violet-600 to-indigo-600
//         rounded-xl blur-lg
//         opacity-75 group-hover:opacity-100
//         animate-pulse
//       " />

//       {/* Content */}
//       <div className="relative flex items-center gap-3">
//         <Sparkles className="
//           w-5 h-5
//           transform transition-transform duration-300
//           group-hover:rotate-12 group-hover:scale-110
//         " />
//         <span className="relative z-10 text-lg">
//           Upgrade Package
//         </span>
//       </div>

//       {/* Shine Effect */}
//       <div className="
//         absolute inset-0 -top-1/2
//         bg-gradient-to-r from-transparent via-white to-transparent
//         opacity-0 group-hover:opacity-30
//         transform -skew-x-12 translate-x-[-200%]
//         group-hover:translate-x-[200%]
//         transition-transform duration-700 ease-out
//       " />
//     </button>
//   );
// }





// UpgradeButton.tsx
import React from 'react';
import { Sparkles } from 'lucide-react';


export default function UpgradeButton({ 
  text = "Upgrade Package", 
  disabled = false, 
  onClick 
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group w-full
        px-5 py-2
        bg-gradient-to-r from-violet-600 to-indigo-600
        text-white font-semibold text-lg
        rounded-xl shadow-lg overflow-hidden
        transform transition-all duration-300
        ${disabled 
          ? 'opacity-70 cursor-not-allowed' 
          : 'hover:scale-105 hover:shadow-2xl active:scale-95'
        }
        focus:outline-none focus:ring-4 focus:ring-violet-300
      `}
    >
      {/* Animated Background Layer */}
      <div className="
        absolute inset-0 
        bg-gradient-to-r from-violet-500 to-indigo-500
        transform translate-x-[-100%] group-hover:translate-x-[100%]
        transition-transform duration-1000 ease-in-out
      " />

      {/* Pulse Ring */}
      <div className="
        absolute -inset-1
        bg-gradient-to-r from-violet-600 to-indigo-600
        rounded-xl blur-lg
        opacity-75 group-hover:opacity-100
        animate-pulse
      " />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-3">
        <Sparkles className="
          w-5 h-5
          transform transition-transform duration-300
          group-hover:rotate-12 group-hover:scale-110
        " />
        <span className="relative z-10">{text}</span>
      </div>

      {/* Shine Effect */}
      <div className="
        absolute inset-0 -top-1/2
        bg-gradient-to-r from-transparent via-white to-transparent
        opacity-0 group-hover:opacity-30
        transform -skew-x-12 translate-x-[-200%]
        group-hover:translate-x-[200%]
        transition-transform duration-700 ease-out
      " />
    </button>
  );
}