// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { PlayCircle, Lock } from "lucide-react";

// export default function Course() {
//   const lessons = [
//     {
//       id: 1,
//       title: "Introduction to online Forex trading",
//       videoUrl: "https://www.youtube.com/embed/0j8J7HXvR4Y",
//       duration: "10:00",
//     },
//     {
//       id: 2,
//       title: "Terminologies in Forex Trading",
//       videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
//       duration: "10:00",
//     },
//     {
//       id: 3,
//       title: "Brokers Services and platforms",
//       videoUrl: "https://www.youtube.com/embed/lTTajzrSkCw",
//       duration: "10:00",
//     },
//     {
//       id: 4,
//       title: "Technical analysis and fundamental analysis",
//       videoUrl: "https://www.youtube.com/embed/3fumBcKC6RE",
//       duration: "10:00",
//     },
//     {
//       id: 5,
//       title: "Forex trading times and sessions",
//       videoUrl: "https://www.youtube.com/embed/VYOjWnS4cMY",
//       duration: "10:00",
//     },
//     {
//       id: 6,
//       title:
//         "Buying and selling currencies, types of orders and how to place them",
//       videoUrl: "https://www.youtube.com/embed/IcrbM1l_BoI",
//       duration: "10:00",
//     },
//     {
//       id: 7,
//       title:
//         "Order types and users",
//       videoUrl: "https://www.youtube.com/embed/IcrbM1l_BoI",
//       duration: "10:00",
//     },
//   ];

//   const [selectedLesson, setSelectedLesson] = useState(null);

//   // Default Landing UI
//   if (!selectedLesson) {
//     return (
//       <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-white flex flex-col items-center py-12 px-6 md:px-20 text-gray-800">
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full max-w-5xl mb-10">
//           <div className="flex flex-col items-center">
//             <div className="w-40 h-40 rounded-full bg-gradient-to-b from-teal-500 to-yellow-400 flex items-center justify-center shadow-lg">
//               <img
//                 src="https://i.pinimg.com/1200x/f4/e0/a2/f4e0a27ff4e330887be183d088863629.jpg"
//                 alt="badge"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//           </div>

//           <div className="text-center md:text-left max-w-md">
//             <p className="text-sm dark:bg-neutral-900 dark:text-white text-gray-500 font-semibold mb-1">
//               Course 1 of 11
//             </p>
//             <h2 className="text-4xl dark:bg-neutral-900 dark:text-white font-extrabold text-gray-800 mb-3">
//               Preschool
//             </h2>
//             <p className="text-gray-600 dark:bg-neutral-900 dark:text-white mb-5">
//               Currency trading? Forex trading? FX trading? Totally clueless about
//               forex? Here’s an introduction to the foreign exchange market.
//             </p>
//             <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-all">
//               Start Course →
//             </button>
//           </div>
//         </div>

//         <hr className="w-full max-w-5xl border-gray-200 my-6" />

//         {/* PROGRESS + OUTLINE SECTION */}
//         <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2 dark:bg-neutral-900 dark:text-white">Your Progress</h3>
//             <p className="text-sm dark:bg-neutral-900 dark:text-white text-teal-600 mb-4">
//               Sign in to unlock progress tracking.
//             </p>

//             <div className="flex items-center gap-3">
//               <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
//                 <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-yellow-400 w-1/4 opacity-70"></div>
//               </div>
//               <div className="bg-teal-500 p-2 rounded-full text-white">
//                 <Lock size={18} />
//               </div>
//             </div>
//           </div>

//           <div >
//             <h3 className="text-xl font-bold text-gray-800 mb-4 dark:bg-neutral-900 dark:text-white">Course Outline</h3>
//             <div className="relative ml-4">
//               <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300"></div>

//               {lessons.map((lesson) => (
//                 <div
//                   key={lesson.id}
//                   onClick={() => setSelectedLesson(lesson)}
//                   className="flex items-start mb-4 relative cursor-pointer"
//                 >
//                   <div className="z-10 bg-white">
//                     <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-teal-500 bg-white hover:bg-teal-100">
//                       <PlayCircle size={14} className="text-teal-500" />
//                     </div>
//                   </div>
//                   <p className="ml-4 dark:bg-neutral-900 dark:text-white text-gray-700 text-sm hover:text-yellow-500 transition">
//                     {lesson.title}
//                   </p>
//                 </div>
//               ))}
//             </div>

//           </div>

//         </div>
//       </div>
//     );
//   }

//   // Video Player UI
//   return (
//     <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center py-10 px-6 md:px-16 text-gray-800">
//       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* LEFT - VIDEO PLAYER */}
//         <motion.div
//           key={selectedLesson.id}
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
//         >
//           <div className="aspect-video bg-black">
//             <iframe
//               src={selectedLesson.videoUrl}
//               title={selectedLesson.title}
//               className="w-full h-full"
//               allowFullScreen
//             ></iframe>
//           </div>

//           <div className="p-6 flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 {selectedLesson.title}
//               </h2>
//               <p className="text-gray-600 text-sm leading-relaxed max-w-2xl">
//                 Learn the fundamentals of forex trading — including what it is,
//                 how it works, and when to trade effectively.
//               </p>
//             </div>
//             <button
//               onClick={() => setSelectedLesson(null)}
//               className="px-4 py-2 flex justify-center items-center bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-md font-medium shadow hover:opacity-90 transition-all"
//             >
//               ← Back
//             </button>
//           </div>
//         </motion.div>

//         {/* RIGHT - LESSON LIST */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Course Outline
//           </h3>
//           <div className="space-y-3 overflow-y-auto max-h-[70vh]">
//             {lessons.map((lesson) => (
//               <motion.div
//                 key={lesson.id}
//                 onClick={() => setSelectedLesson(lesson)}
//                 whileHover={{ scale: 1.02 }}
//                 className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-all ${
//                   selectedLesson.id === lesson.id
//                     ? "bg-gradient-to-r from-teal-500 to-yellow-400 text-white"
//                     : "bg-gray-50 hover:bg-gray-100"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <PlayCircle
//                     size={20}
//                     className={`${
//                       selectedLesson.id === lesson.id
//                         ? "text-white"
//                         : "text-teal-500"
//                     }`}
//                   />
//                   <span className="text-sm font-medium">
//                     {lesson.title.length > 45
//                       ? lesson.title.slice(0, 45) + "..."
//                       : lesson.title}
//                   </span>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { PlayCircle, Lock, CheckCircle, AlertCircle } from "lucide-react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { apiClient } from "../../../api/apiClient"; // Adjust path

// // ... (all imports same)

// export default function Course() {
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [course, setCourse] = useState(null);
//   const [lessons, setLessons] = useState([]);
//   const [progress, setProgress] = useState({ percent: 0, completed: 0, total: 0 });
//   const [currentVideoId, setCurrentVideoId] = useState(null);
//   const [videoCompleted, setVideoCompleted] = useState({});
//   const [showSubscribeModal, setShowSubscribeModal] = useState(false);
//   const [nextLockedPackage, setNextLockedPackage] = useState("");
//   const iframeRef = useRef(null);

//   // Fetch course + lessons
//   useEffect(() => {
//     const fetchCourse = async () => {
//       try {
//         const res = await apiClient.get("/api/users/training/courses");
//         const courseData = res.data[0];
//         setCourse(courseData);
//         setProgress(courseData.progress || { percent: 0, completed: 0, total: 0 });

//         const lessonsRes = await apiClient.get(`/api/users/training/courses/${courseData.id}`);
//         const fetchedLessons = lessonsRes.data.lessons || [];

//         const lessonsWithPackage = fetchedLessons.map((l, i) => ({
//           ...l,
//           packageRequired: i < 2 ? "basic" : i < 5 ? "pro" : "premium",
//         }));

//         setLessons(lessonsWithPackage);
//         setProgress((p) => ({ ...p, total: lessonsWithPackage.length }));
//       } catch (err) {
//         console.error("Failed to load course:", err);
//       }
//     };
//     fetchCourse();
//   }, []);

//   // YouTube API setup (same)
//   useEffect(() => {
//     if (!selectedLesson || !iframeRef.current) return;

//     const tag = document.createElement("script");
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScript = document.getElementsByTagName("script")[0];
//     firstScript.parentNode.insertBefore(tag, firstScript);

//     window.onYouTubeIframeAPIReady = () => {
//       new window.YT.Player(iframeRef.current, {
//         events: {
//           onStateChange: (event) => {
//             if (event.data === window.YT.PlayerState.ENDED) {
//               handleVideoComplete(selectedLesson.id);
//             }
//           },
//         },
//       });
//     };
//   }, [selectedLesson]);

//   const handleVideoComplete = async (videoId) => {
//     try {
//       await apiClient.post(`/api/users/training/videos/${videoId}/complete`);
//       setVideoCompleted((prev) => ({ ...prev, [videoId]: true }));

//       const newCompleted = progress.completed + 1;
//       const newPercent = Math.round((newCompleted / progress.total) * 100);
//       setProgress((prev) => ({ ...prev, completed: newCompleted, percent: newPercent }));

//       const currentIndex = lessons.findIndex((l) => l.id === videoId);
//       const nextLesson = lessons[currentIndex + 1];

//       if (nextLesson) {
//         if (hasAccessToPackage(nextLesson.packageRequired)) {
//           setTimeout(() => setSelectedLesson(nextLesson), 1000);
//         } else {
//           setNextLockedPackage(nextLesson.packageRequired);
//           setShowSubscribeModal(true);
//         }
//       }
//     } catch (err) {
//       console.error("Failed to mark video complete:", err);
//     }
//   };

//   const hasAccessToPackage = (pkg) => {
//     const userPackage = localStorage.getItem("userPackage") || "basic";
//     const levels = { basic: 1, pro: 2, premium: 3 };
//     return levels[userPackage] >= levels[pkg];
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const pieData = [
//     { name: "Completed", value: progress.percent },
//     { name: "Remaining", value: 100 - progress.percent },
//   ];
//   const COLORS = ["#14b8a6", "#e5e7eb"];

//   // ———— FIXED: Only show landing when course & lessons are loaded ————
//   if (!course || lessons.length === 0) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
//         <div className="text-gray-600">Loading course...</div>
//       </div>
//     );
//   }

//   // ———— LANDING UI (unchanged) ————
//   if (!selectedLesson) {
//     return (
//       <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-white flex flex-col items-center py-12 px-6 md:px-20 text-gray-800">
//         {/* HEADER SECTION */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full max-w-5xl mb-10">
//           <div className="flex flex-col items-center">
//             <div className="w-40 h-40 rounded-full bg-gradient-to-b from-teal-500 to-yellow-400 flex items-center justify-center shadow-lg">
//               <img
//                 src={course.thumbnail}
//                 alt="badge"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//           </div>

//           <div className="text-center md:text-left max-w-md">
//             <p className="text-sm text-gray-500 font-semibold mb-1">
//               Course {course.order} of 11
//             </p>
//             <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
//               {course.title}
//             </h2>
//             <p className="text-gray-600 mb-5">
//               {course.description}
//             </p>
//             <button
//               onClick={() => setSelectedLesson(lessons[0])}
//               className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-all"
//             >
//               Start Course
//             </button>
//           </div>
//         </div>

//         <hr className="w-full max-w-5xl border-gray-200 my-6" />

//         {/* PROGRESS + OUTLINE */}
//         <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Your Progress</h3>
//             <p className="text-sm text-teal-600 mb-4">
//               {progress.completed} of {progress.total} videos completed
//             </p>

//             <div className="flex items-center gap-4">
//               <div className="w-32 h-32">
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={50}
//                       outerRadius={60}
//                       paddingAngle={0}
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                       ))}
//                     </Pie>
//                     <text
//                       x="50%"
//                       y="50%"
//                       textAnchor="middle"
//                       dominantBaseline="middle"
//                       className="text-2xl font-bold fill-gray-800"
//                     >
//                       {progress.percent}%
//                     </text>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="bg-teal-500 p-2 rounded-full text-white">
//                 {progress.percent === 100 ? <CheckCircle size={18} /> : <Lock size={18} />}
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Course Outline</h3>
//             <div className="relative ml-4">
//               <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300"></div>

//               {lessons.map((lesson, i) => {
//                 const isLocked = i > 0 && !videoCompleted[lessons[i - 1].id];
//                 const hasAccess = hasAccessToPackage(lesson.packageRequired);

//                 return (
//                   <div
//                     key={lesson.id}
//                     onClick={() => {
//                       if (!isLocked && hasAccess) setSelectedLesson(lesson);
//                     }}
//                     className={`flex items-start mb-4 relative cursor-pointer ${
//                       isLocked || !hasAccess ? "opacity-50" : ""
//                     }`}
//                   >
//                     <div className="z-10 bg-white">
//                       <div
//                         className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
//                           videoCompleted[lesson.id]
//                             ? "bg-teal-500 border-teal-500"
//                             : "border-teal-500 bg-white"
//                         }`}
//                       >
//                         {videoCompleted[lesson.id] ? (
//                           <CheckCircle size={14} className="text-white" />
//                         ) : (
//                           <PlayCircle size={14} className="text-teal-500" />
//                         )}
//                       </div>
//                     </div>
//                     <p className="ml-4 text-gray-700 text-sm hover:text-yellow-500 transition">
//                       {lesson.title}
//                       {!hasAccess && <Lock size={12} className="inline ml-1" />}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // ———— VIDEO PLAYER (unchanged) ————
//   return (
//     <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center py-10 px-6 md:px-16 text-gray-800">
//       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* VIDEO PLAYER */}
//         <motion.div
//           key={selectedLesson.id}
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
//         >
//           <div className="aspect-video bg-black">
//             <iframe
//               ref={iframeRef}
//               src={selectedLesson.videoUrl + "?enablejsapi=1"}
//               title={selectedLesson.title}
//               className="w-full h-full"
//               allowFullScreen
//             ></iframe>
//           </div>

//           <div className="p-6 flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 {selectedLesson.title}
//               </h2>
//               <p className="text-gray-600 text-sm">
//                 {formatTime(0)} / {selectedLesson.duration}
//               </p>
//             </div>
//             <button
//               onClick={() => setSelectedLesson(null)}
//               className="px-4 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-md font-medium shadow hover:opacity-90"
//             >
//               Back
//             </button>
//           </div>
//         </motion.div>

//         {/* LESSON LIST (same) */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Course Outline
//           </h3>
//           <div className="space-y-3 overflow-y-auto max-h-[70vh]">
//             {lessons.map((lesson) => {
//               const isLocked = lessons.indexOf(lesson) > 0 && !videoCompleted[lessons[lessons.indexOf(lesson) - 1].id];
//               const hasAccess = hasAccessToPackage(lesson.packageRequired);

//               return (
//                 <motion.div
//                   key={lesson.id}
//                   onClick={() => {
//                     if (!isLocked && hasAccess) setSelectedLesson(lesson);
//                   }}
//                   whileHover={{ scale: hasAccess && !isLocked ? 1.02 : 1 }}
//                   className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-all ${
//                     selectedLesson.id === lesson.id
//                       ? "bg-gradient-to-r from-teal-500 to-yellow-400 text-white"
//                       : isLocked || !hasAccess
//                       ? "bg-gray-100 opacity-60"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     {videoCompleted[lesson.id] ? (
//                       <CheckCircle size={20} className="text-green-500" />
//                     ) : (
//                       <PlayCircle
//                         size={20}
//                         className={`${
//                           selectedLesson.id === lesson.id ? "text-white" : "text-teal-500"
//                         }`}
//                       />
//                     )}
//                     <span className="text-sm font-medium">
//                       {lesson.title.length > 45 ? lesson.title.slice(0, 45) + "..." : lesson.title}
//                     </span>
//                   </div>
//                   {!hasAccess && <Lock size={16} />}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </div>

//       {/* SUBSCRIBE MODAL (same) */}
//       {showSubscribeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <AlertCircle className="text-yellow-500" size={28} />
//               <h3 className="text-xl font-bold">Upgrade Required</h3>
//             </div>
//             <p className="text-gray-600 mb-4">
//               To continue, you need the <strong>{nextLockedPackage.toUpperCase()}</strong> package.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowSubscribeModal(false)}
//                 className="flex-1 py-2 border border-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-md font-medium">
//                 Subscribe Now
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { PlayCircle, Lock, CheckCircle, AlertCircle } from "lucide-react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import images from '../../../assets/ver.jpeg'

// // DUMMY DATA (Replace with real API later)
// const DUMMY_COURSE = {
//   id: "507f1f77bcf86cd799439016",
//   title: "Crypto Trading 101",
//   description: "Learn the basics of crypto trading from scratch.",
//   order: 1,
//   thumbnail: "https://veloxcapital.com/courses/crypto101.jpg",
//   progress: { percent: 40, completed: 2, total: 7 },
// };

// const DUMMY_LESSONS = [
//   {
//     id: "vid1",
//     title: "Introduction to online Forex trading",
//     videoUrl: "https://www.youtube.com/embed/0j8J7HXvR4Y",
//     duration: "10:00",
//     packageRequired: "basic",
//   },
//   {
//     id: "vid2",
//     title: "Terminologies in Forex Trading",
//     videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
//     duration: "10:00",
//     packageRequired: "basic",
//   },
//   {
//     id: "vid3",
//     title: "Brokers Services and platforms",
//     videoUrl: "https://www.youtube.com/embed/lTTajzrSkCw",
//     duration: "10:00",
//     packageRequired: "pro",
//   },
//   {
//     id: "vid4",
//     title: "Technical analysis and fundamental analysis",
//     videoUrl: "https://www.youtube.com/embed/3fumBcKC6RE",
//     duration: "10:00",
//     packageRequired: "pro",
//   },
//   {
//     id: "vid5",
//     title: "Forex trading times and sessions",
//     videoUrl: "https://www.youtube.com/embed/VYOjWnS4cMY",
//     duration: "10:00",
//     packageRequired: "premium",
//   },
//   {
//     id: "vid6",
//     title: "Buying and selling currencies, types of orders",
//     videoUrl: "https://www.youtube.com/embed/IcrbM1l_BoI",
//     duration: "10:00",
//     packageRequired: "premium",
//   },
//   {
//     id: "vid7",
//     title: "Order types and users",
//     videoUrl: "https://www.youtube.com/embed/IcrbM1l_BoI",
//     duration: "10:00",
//     packageRequired: "premium",
//   },
// ];

// export default function Course() {
//   const [selectedLesson, setSelectedLesson] = useState(null);
//   const [course, setCourse] = useState(null);
//   const [lessons, setLessons] = useState([]);
//   const [progress, setProgress] = useState({ percent: 0, completed: 0, total: 0 });
//   const [videoCompleted, setVideoCompleted] = useState({});
//   const [showSubscribeModal, setShowSubscribeModal] = useState(false);
//   const [nextLockedPackage, setNextLockedPackage] = useState("");
//   const iframeRef = useRef(null);

//   // MOCK: Simulate API load
//   useEffect(() => {
//     setTimeout(() => {
//       setCourse(DUMMY_COURSE);
//       setLessons(DUMMY_LESSONS);
//       setProgress(DUMMY_COURSE.progress);
//     }, 800);
//   }, []);

//   // YouTube API to detect end
//   useEffect(() => {
//     if (!selectedLesson || !iframeRef.current) return;

//     const tag = document.createElement("script");
//     tag.src = "https://www.youtube.com/iframe_api";
//     const firstScript = document.getElementsByTagName("script")[0];
//     firstScript.parentNode.insertBefore(tag, firstScript);

//     window.onYouTubeIframeAPIReady = () => {
//       new window.YT.Player(iframeRef.current, {
//         events: {
//           onStateChange: (event) => {
//             if (event.data === window.YT.PlayerState.ENDED) {
//               handleVideoComplete(selectedLesson.id);
//             }
//           },
//         },
//       });
//     };
//   }, [selectedLesson]);

//   // MOCK: Mark video complete
//   const handleVideoComplete = async (videoId) => {
//     // Simulate API delay
//     await new Promise((r) => setTimeout(r, 500));

//     setVideoCompleted((prev) => ({ ...prev, [videoId]: true }));

//     const newCompleted = progress.completed + 1;
//     const newPercent = Math.round((newCompleted / progress.total) * 100);
//     setProgress((prev) => ({ ...prev, completed: newCompleted, percent: newPercent }));

//     const currentIndex = lessons.findIndex((l) => l.id === videoId);
//     const nextLesson = lessons[currentIndex + 1];

//     if (nextLesson) {
//       if (hasAccessToPackage(nextLesson.packageRequired)) {
//         setTimeout(() => setSelectedLesson(nextLesson), 1000);
//       } else {
//         setNextLockedPackage(nextLesson.packageRequired);
//         setShowSubscribeModal(true);
//       }
//     }
//   };

//   // MOCK: User package (change this to test)
//   const hasAccessToPackage = (pkg) => {
//     const userPackage = "basic"; // Change to "pro" or "premium" to test
//     const levels = { basic: 1, pro: 2, premium: 3 };
//     return levels[userPackage] >= levels[pkg];
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const pieData = [
//     { name: "Completed", value: progress.percent },
//     { name: "Remaining", value: 100 - progress.percent },
//   ];
//   const COLORS = ["#14b8a6", "#e5e7eb"];

//   // Loading state
//   if (!course || lessons.length === 0) {
//     return (
//       <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
//         <div className="text-gray-600">Loading course...</div>
//       </div>
//     );
//   }

//   // Landing UI
//   if (!selectedLesson) {
//     return (
//       <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-white flex flex-col items-center py-12 px-6 md:px-20 text-gray-800">
//         {/* HEADER */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full max-w-5xl mb-10">
//           <div className="flex flex-col items-center">
//             <div className="w-40 h-40 rounded-full bg-gradient-to-b from-teal-500 to-yellow-400 flex items-center justify-center shadow-lg">
//               <img
//                 src={course.thumbnail}
//                 alt="badge"
//                 className="w-full h-full object-cover rounded-full"
//               />
//             </div>
//           </div>

//           <div className="text-center md:text-left max-w-md">
//             <p className="text-sm text-gray-500 font-semibold mb-1">
//               Course {course.order} of 11
//             </p>
//             <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
//               {course.title}
//             </h2>
//             <p className="text-gray-600 mb-5">
//               {course.description}
//             </p>
//             <button
//               onClick={() => setSelectedLesson(lessons[0])}
//               className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-all"
//             >
//               Start Course
//             </button>
//           </div>
//         </div>

//         <hr className="w-full max-w-5xl border-gray-200 my-6" />

//         {/* PROGRESS + OUTLINE */}
//         <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Your Progress</h3>
//             <p className="text-sm text-teal-600 mb-4">
//               {progress.completed} of {progress.total} videos completed
//             </p>

//             <div className="flex items-center gap-4">
//               <div className="w-40 h-40">
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"

//                       innerRadius={50}
//                       outerRadius={60}
//                       paddingAngle={0}
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index]} />
//                       ))}
//                     </Pie>
//                     <text
//                       x="50%"
//                       y="50%"
//                       textAnchor="middle"
//                       dominantBaseline="middle"
//                       className="text-2xl font-bold fill-gray-800"
//                     >
//                       {progress.percent}%
//                     </text>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="bg-teal-500 p-2 rounded-full text-white">
//                 {progress.percent === 100 ? <CheckCircle size={18} /> : <Lock size={18} />}
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Course Outline</h3>
//             <div className="relative ml-4">
//               <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300"></div>

//               {lessons.map((lesson, i) => {
//                 const isLocked = i > 0 && !videoCompleted[lessons[i - 1].id];
//                 const hasAccess = hasAccessToPackage(lesson.packageRequired);

//                 return (
//                   <div
//                     key={lesson.id}
//                     onClick={() => {
//                       if (!isLocked && hasAccess) setSelectedLesson(lesson);
//                     }}
//                     className={`flex items-start mb-4 relative cursor-pointer ${
//                       isLocked || !hasAccess ? "opacity-50" : ""
//                     }`}
//                   >
//                     <div className="z-10 bg-white">
//                       <div
//                         className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
//                           videoCompleted[lesson.id]
//                             ? "bg-teal-500 border-teal-500"
//                             : "border-teal-500 bg-white"
//                         }`}
//                       >
//                         {videoCompleted[lesson.id] ? (
//                           <CheckCircle size={14} className="text-white" />
//                         ) : (
//                           <PlayCircle size={14} className="text-teal-500" />
//                         )}
//                       </div>
//                     </div>
//                     <p className="ml-4 text-gray-700 text-sm hover:text-yellow-500 transition">
//                       {lesson.title}
//                       {!hasAccess && <Lock size={12} className="inline ml-1" />}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Video Player
//   return (
//     <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center py-10 px-6 md:px-16 text-gray-800">
//       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* VIDEO PLAYER */}
//         <motion.div
//           key={selectedLesson.id}
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
//         >
//           <div className="aspect-video bg-black">
//             <iframe
//               ref={iframeRef}
//               src={selectedLesson.videoUrl + "?enablejsapi=1"}
//               title={selectedLesson.title}
//               className="w-full h-full"
//               allowFullScreen
//             ></iframe>
//           </div>

//           <div className="p-6 flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">
//                 {selectedLesson.title}
//               </h2>
//               <p className="text-gray-600 text-sm">
//                 {formatTime(0)} / {selectedLesson.duration}
//               </p>
//             </div>
//             <button
//               onClick={() => setSelectedLesson(null)}
//               className="px-4 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-md font-medium shadow hover:opacity-90"
//             >
//               Back
//             </button>
//           </div>
//         </motion.div>

//         {/* LESSON LIST */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6 }}
//           className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">
//             Course Outline
//           </h3>
//           <div className="space-y-3 overflow-y-auto max-h-[70vh]">
//             {lessons.map((lesson) => {
//               const isLocked = lessons.indexOf(lesson) > 0 && !videoCompleted[lessons[lessons.indexOf(lesson) - 1].id];
//               const hasAccess = hasAccessToPackage(lesson.packageRequired);

//               return (
//                 <motion.div
//                   key={lesson.id}
//                   onClick={() => {
//                     if (!isLocked && hasAccess) setSelectedLesson(lesson);
//                   }}
//                   whileHover={{ scale: hasAccess && !isLocked ? 1.02 : 1 }}
//                   className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-all ${
//                     selectedLesson.id === lesson.id
//                       ? "bg-gradient-to-r from-teal-500 to-yellow-400 text-white"
//                       : isLocked || !hasAccess
//                       ? "bg-gray-100 opacity-60"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     {videoCompleted[lesson.id] ? (
//                       <CheckCircle size={20} className="text-green-500" />
//                     ) : (
//                       <PlayCircle
//                         size={20}
//                         className={`${
//                           selectedLesson.id === lesson.id ? "text-white" : "text-teal-500"
//                         }`}
//                       />
//                     )}
//                     <span className="text-sm font-medium">
//                       {lesson.title.length > 45 ? lesson.title.slice(0, 45) + "..." : lesson.title}
//                     </span>
//                   </div>
//                   {!hasAccess && <Lock size={16} />}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </div>

//       {/* SUBSCRIBE MODAL */}
//       {showSubscribeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <AlertCircle className="text-yellow-500" size={28} />
//               <h3 className="text-xl font-bold">Upgrade Required</h3>
//             </div>
//             <p className="text-gray-600 mb-4">
//               To continue, you need the <strong>{nextLockedPackage.toUpperCase()}</strong> package.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowSubscribeModal(false)}
//                 className="flex-1 py-2 border border-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-md font-medium">
//                 Subscribe Now
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

// originals

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { PlayCircle, Lock, CheckCircle, AlertCircle } from "lucide-react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { apiClient } from "../../../api/apiClient"; // Adjust path if needed

// export default function Course() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [videoLoading, setVideoLoading] = useState(false);
//   const [progress, setProgress] = useState({ percent: 0, completed: 0, total: 0 });
//   const [completedVideos, setCompletedVideos] = useState(new Set());
//   const [showUpgradeModal, setShowUpgradeModal] = useState(false);
//   const videoRef = useRef(null);

//   // Fetch all active courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const res = await apiClient.get("/api/users/training/courses");
//         const data = res.data;

//         console.log("API Response - All Courses:", data); // Fixed: console.log

//         if (!Array.isArray(data) || data.length === 0) {
//           setError("No courses available at the moment.");
//           setLoading(false);
//           return;
//         }

//        setCourses(data);

//         // Simulate one unlocked/free course for testing UI
// // const testCourses = data.map((course, index) => {
// //   if (index === 0 && course.videos?.length) {
// //     course.isActive = true;
// //     course.videos[0].isFree = true; // unlock first video
// //   }
// //   return course;
// // });
// // setCourses(testCourses);

//         const firstActive = data.find(c => c.isActive) || data[0];
//         setSelectedCourse(firstActive);
//         setProgress(firstActive.progress || { percent: 0, completed: 0, total: 0 });

//         const completed = new Set();
//         firstActive.videos?.forEach(v => {
//           if (v.completed) completed.add(v._id);
//         });
//         setCompletedVideos(completed);

//       } catch (err) {
//         console.error("Failed to load courses:", err.response || err); // Fixed: console
//         setError("Failed to load courses. Please check your connection and try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   // Load course details
//   const loadCourseDetails = async (courseId) => {
//     try {
//       setVideoLoading(true);
//       setError(null);

//       const res = await apiClient.get(`/api/users/training/courses/${courseId}`);
//       const course = res.data;

//       console.log("Loaded Course Details:", course); // Debug

//       setSelectedCourse(course);
//       setProgress(course.progress || { percent: 0, completed: 0, total: 0 });

//       const completed = new Set();
//       course.videos?.forEach(v => {
//         if (v.completed) completed.add(v._id);
//       });
//       setCompletedVideos(completed);

//     } catch (err) {
//       console.error("Failed to load course details:", err.response || err); // Fixed
//       setError("Failed to load course. Please try again.");
//     } finally {
//       setVideoLoading(false);
//     }
//   };

//   // Mark video as complete
//   const markVideoComplete = async (videoId) => {
//     if (completedVideos.has(videoId)) return;

//     try {
//       const res = await apiClient.post(
//         `/api/users/training/courses/${selectedCourse._id}/videos/${videoId}/complete`
//       );

//       console.log("Video marked complete:", res.data); // Debug

//       setCompletedVideos(prev => new Set(prev).add(videoId));

//       const newCompleted = progress.completed + 1;
//       const newPercent = Math.round((newCompleted / progress.total) * 100);
//       setProgress(prev => ({ ...prev, completed: newCompleted, percent: newPercent }));

//       const currentIdx = selectedCourse.videos?.findIndex(v => v._id === videoId);
//       const nextVideo = selectedCourse.videos?.[currentIdx + 1];

//       if (nextVideo && nextVideo.isFree) {
//         setTimeout(() => setSelectedVideo(nextVideo), 800);
//       } else if (nextVideo && !nextVideo.isFree) {
//         setShowUpgradeModal(true);
//       }
//     } catch (err) {
//       console.error("Failed to mark video complete:", err.response || err); // Fixed
//     }
//   };

//   // Video ended handler
//   useEffect(() => {
//     if (!selectedVideo || !videoRef.current) return;

//     const video = videoRef.current;
//     const handleEnded = () => markVideoComplete(selectedVideo._id);

//     video.addEventListener("ended", handleEnded);
//     return () => video.removeEventListener("ended", handleEnded);
//   }, [selectedVideo, selectedCourse]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = Math.floor(seconds % 60);
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const pieData = [
//     { name: "Completed", value: progress.percent },
//     { name: "Remaining", value: 100 - progress.percent },
//   ];
//   const COLORS = ["#14b8a6", "#e5e7eb"];

//   // Loading State
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-gray-600 text-lg">Loading courses...</div>
//       </div>
//     );
//   }

//   // Error State
//   if (error) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-6">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <p className="text-gray-700 mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-full font-medium hover:opacity-90"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Course List (Landing)
//   if (!selectedCourse || (!selectedVideo && !selectedCourse.videos)) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6 md:px-20">
//         <div className="w-full max-w-5xl space-y-8">
//           <h1 className="text-3xl font-bold text-center mb-8">Academy Courses</h1>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {courses.map(course => (
//               <motion.div
//                 key={course._id}
//                 whileHover={{ scale: 1.03 }}
//                 onClick={() => loadCourseDetails(course._id)}
//                 className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer border hover:shadow-lg transition"
//               >
//                 <img
//                   src={course.thumbnail || "/placeholder.jpg"}
//                   alt={course.title}
//                   className="w-full h-48 object-cover"
//                   onError={(e) => e.target.src = "/placeholder.jpg"}
//                 />
//                 <div className="p-5">
//                   <h3 className="font-bold text-lg mb-1 line-clamp-1">{course.title}</h3>
//                   <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description || "No description."}</p>
//                   <div className="flex justify-between items-center">
//                     <span className="text-xs text-teal-600 font-medium">
//                       {course.progress?.completed || 0}/{course.progress?.total || 0} completed
//                     </span>
//                     <div className="w-10 h-10">
//                       <ResponsiveContainer>
//                         <PieChart>
//                           <Pie
//                             data={[
//                               { value: course.progress?.percent || 0 },
//                               { value: 100 - (course.progress?.percent || 0) }
//                             ]}
//                             innerRadius={12}
//                             outerRadius={18}
//                             dataKey="value"
//                           >
//                             <Cell fill="#14b8a6" />
//                             <Cell fill="#e5e7eb" />
//                           </Pie>
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Course Landing (Before video)
//   if (!selectedVideo) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6 md:px-20 text-gray-800">
//         <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full max-w-5xl mb-10">
//           <div className="flex flex-col items-center">
//             <div className="w-40 h-40 rounded-full bg-gradient-to-b from-teal-500 to-yellow-400 flex items-center justify-center shadow-lg overflow-hidden">
//               <img
//                 src={selectedCourse.thumbnail || "/placeholder.jpg"}
//                 alt={selectedCourse.title}
//                 className="w-full h-full object-cover"
//                 onError={(e) => e.target.src = "/placeholder.jpg"}
//               />
//             </div>
//           </div>

//           <div className="text-center md:text-left max-w-md">
//             <p className="text-sm text-gray-500 font-semibold mb-1">
//               Course {selectedCourse.order} of {courses.length}
//             </p>
//             <h2 className="text-4xl font-extrabold text-gray-800 mb-3">
//               {selectedCourse.title}
//             </h2>
//             <p className="text-gray-600 mb-5">{selectedCourse.description}</p>
//             <button
//               onClick={() => {
//                 const firstFree = selectedCourse.videos?.find(v => v.isFree);
//                 if (firstFree) setSelectedVideo(firstFree);
//               }}
//               className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white font-semibold rounded-full shadow-md hover:opacity-90 transition-all"
//             >
//               Start Course
//             </button>
//           </div>
//         </div>

//         <hr className="w-full max-w-5xl border-gray-200 my-6" />

//         <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10">
//           <div>
//             <h3 className="text-xl font-bold text-gray-800 mb-2">Your Progress</h3>
//             <p className="text-sm text-teal-600 mb-4">
//               {progress.completed} of {progress.total} videos completed
//             </p>
//             <div className="flex items-center gap-4">
//               <div className="w-40 h-40">
//                 <ResponsiveContainer>
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={50}
//                       outerRadius={60}
//                       paddingAngle={0}
//                       dataKey="value"
//                     >
//                       {pieData.map((_, i) => (
//                         <Cell key={i} fill={COLORS[i]} />
//                       ))}
//                     </Pie>
//                     <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-2xl font-bold fill-gray-800">
//                       {progress.percent}%
//                     </text>
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="bg-teal-500 p-2 rounded-full text-white">
//                 {progress.percent === 100 ? <CheckCircle size={18} /> : <PlayCircle size={18} />}
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Course Outline</h3>
//             <div className="relative ml-4">
//               <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gray-300"></div>
//               {selectedCourse.videos?.map((video, i) => {
//                 const prevVideo = selectedCourse.videos[i - 1];
//                 const isLocked = i > 0 && !completedVideos.has(prevVideo?._id);
//                 const canPlay = video.isFree || completedVideos.has(prevVideo?._id);

//                 return (
//                   <div
//                     key={video._id}
//                     onClick={() => canPlay && setSelectedVideo(video)}
//                     className={`flex items-start mb-4 relative cursor-pointer ${isLocked || !canPlay ? "opacity-50" : ""}`}
//                   >
//                     <div className="z-10 bg-white">
//                       <div
//                         className={`flex items-center justify-center w-5 h-5 rounded-full border-2 ${
//                           completedVideos.has(video._id)
//                             ? "bg-teal-500 border-teal-500"
//                             : "border-teal-500 bg-white"
//                         }`}
//                       >
//                         {completedVideos.has(video._id) ? (
//                           <CheckCircle size={14} className="text-white" />
//                         ) : (
//                           <PlayCircle size={14} className="text-teal-500" />
//                         )}
//                       </div>
//                     </div>
//                     <p className="ml-4 text-gray-700 text-sm hover:text-yellow-500 transition">
//                       {video.title}
//                       {!video.isFree && <Lock size={12} className="inline ml-1 text-gray-400" />}
//                     </p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Video Player View
//   return (
//     <div className="min-h-screen bg-[#f9fafb] flex flex-col items-center py-10 px-6 md:px-16 text-gray-800">
//       <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* VIDEO PLAYER */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="col-span-2 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
//         >
//           <div className="aspect-video bg-black">
//             <video
//               ref={videoRef}
//               src={selectedVideo.url}
//               controls
//               className="w-full h-full"
//               poster={selectedCourse.thumbnail || "/placeholder.jpg"}
//             />
//           </div>

//           <div className="p-6 flex justify-between items-center">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedVideo.title}</h2>
//               <p className="text-gray-600 text-sm">
//                 {formatTime(0)} / {formatTime(selectedVideo.duration)}
//               </p>
//             </div>
//             <button
//               onClick={() => setSelectedVideo(null)}
//               className="px-4 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-md font-medium shadow hover:opacity-90"
//             >
//               Back to Course
//             </button>
//           </div>
//         </motion.div>

//         {/* LESSON LIST */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col"
//         >
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Course Outline</h3>
//           <div className="space-y-3 overflow-y-auto max-h-[70vh]">
//             {selectedCourse.videos?.map((video) => {
//               const prevVideo = selectedCourse.videos[selectedCourse.videos.indexOf(video) - 1];
//               const isLocked = selectedCourse.videos.indexOf(video) > 0 && !completedVideos.has(prevVideo?._id);
//               const canPlay = video.isFree || completedVideos.has(prevVideo?._id);

//               return (
//                 <motion.div
//                   key={video._id}
//                   onClick={() => canPlay && setSelectedVideo(video)}
//                   whileHover={{ scale: canPlay ? 1.02 : 1 }}
//                   className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-all ${
//                     selectedVideo._id === video._id
//                       ? "bg-gradient-to-r from-teal-500 to-yellow-400 text-white"
//                       : isLocked || !canPlay
//                       ? "bg-gray-100 opacity-60"
//                       : "bg-gray-50 hover:bg-gray-100"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     {completedVideos.has(video._id) ? (
//                       <CheckCircle size={20} className="text-green-500" />
//                     ) : (
//                       <PlayCircle
//                         size={20}
//                         className={`${
//                           selectedVideo._id === video._id ? "text-white" : "text-teal-500"
//                         }`}
//                       />
//                     )}
//                     <span className="text-sm font-medium">
//                       {video.title.length > 40 ? video.title.slice(0, 40) + "..." : video.title}
//                     </span>
//                   </div>
//                   {!video.isFree && <Lock size={16} className="text-gray-400" />}
//                 </motion.div>
//               );
//             })}
//           </div>
//         </motion.div>
//       </div>

//       {/* UPGRADE MODAL */}
//       {showUpgradeModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <AlertCircle className="text-yellow-500" size={28} />
//               <h3 className="text-xl font-bold">Premium Content</h3>
//             </div>
//             <p className="text-gray-600 mb-4">
//               This lesson is part of the <strong>Premium Package</strong>. Upgrade to continue.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowUpgradeModal(false)}
//                 className="flex-1 py-2 border border-gray-300 rounded-md"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-md font-medium">
//                 Upgrade Now
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   Play,
//   Lock,
//   CheckCircle,
//   AlertCircle,
//   Volume2,
//   VolumeX,
// } from "lucide-react";
// import {apiClient} from "../../../api/apiClient";
// import { getUserPackages } from "../../../api/userPackageApi";
// import { useNavigate } from "react-router-dom";

// export default function Course() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [progress, setProgress] = useState({ percent: 0, completed: 0, total: 0 });
//   const [completedVideos, setCompletedVideos] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showUpgradeModal, setShowUpgradeModal] = useState(false);
//   const [userPackages, setUserPackages] = useState([]);
//   const [volume, setVolume] = useState(0.8); // ✅ Default volume at 80%
//   const [isMuted, setIsMuted] = useState(false);
//   const videoRef = useRef(null);
//   const navigate = useNavigate();

//   // ✅ Fetch user packages and courses
//   useEffect(() => {
//     const init = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const userPackages = await getUserPackages();
//         setUserPackages(userPackages);

//         if (!userPackages || userPackages.length === 0) {
//           setError("You currently have no active packages. Please buy a package to access courses.");
//           setLoading(false);
//           return;
//         }

//         const res = await apiClient.get("/api/users/training/courses");
//         const data = res.data;

//         if (!Array.isArray(data) || data.length === 0) {
//           setError("No courses available at the moment.");
//           setLoading(false);
//           return;
//         }

//         const accessibleCourses = data.filter(course =>
//           userPackages.some(pkg => pkg.level >= (course.requiredLevel || 1))
//         );

//         if (accessibleCourses.length === 0) {
//           setError("Your current package does not grant access to any courses. Please upgrade your package.");
//           setLoading(false);
//           return;
//         }

//         setCourses(accessibleCourses);
//         const first = accessibleCourses.find(c => c.isActive) || accessibleCourses[0];
//         setSelectedCourse(first);
//         setProgress(first.progress || { percent: 0, completed: 0, total: 0 });

//         const completed = new Set();
//         first.videos?.forEach(v => {
//           if (v.completed) completed.add(v._id);
//         });
//         setCompletedVideos(completed);
//       } catch (err) {
//         console.error("Failed to load data:", err);
//         setError("Failed to load data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     init();
//   }, []);

//   // ✅ Volume handler
//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (videoRef.current) videoRef.current.volume = newVolume;
//     if (newVolume > 0) setIsMuted(false);
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//     if (videoRef.current) videoRef.current.muted = !isMuted;
//   };

//   // ✅ Handle video completion
//   const handleVideoEnd = (videoId) => {
//     if (!completedVideos.has(videoId)) {
//       const updated = new Set(completedVideos);
//       updated.add(videoId);
//       setCompletedVideos(updated);
//       setProgress(prev => ({
//         ...prev,
//         completed: prev.completed + 1,
//         percent: Math.min(((prev.completed + 1) / prev.total) * 100, 100),
//       }));
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen bg-white">
//         <p className="text-gray-500 text-lg">Loading courses...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-6">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <p className="text-gray-700 mb-4">{error}</p>
//           <button
//            onClick={() => navigate("/dashboard/users")}
//             className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-full font-medium hover:opacity-90"
//           >
//             View Packages
//           </button>
//         </div>
//       </div>
//     );

//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-white">
//       {/* Video Section */}
//       <div className="flex-1 p-6">
//         {selectedCourse && (
//           <motion.div
//             key={selectedCourse._id}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-gray-50 rounded-2xl p-4 shadow"
//           >
//             <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedCourse.title}</h2>
//             <video
//               ref={videoRef}
//               key={selectedCourse._id}
//               src={selectedCourse.currentVideoUrl || ""}
//               controls
//               onEnded={() => handleVideoEnd(selectedCourse.currentVideoId)}
//               className="rounded-xl w-full mb-3"
//               style={{ aspectRatio: "16/9" }}
//               volume={volume}
//               muted={isMuted}
//             ></video>

//             {/* ✅ Volume Control */}
//             <div className="flex items-center gap-3 mt-2">
//               <button onClick={toggleMute} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
//                 {isMuted || volume === 0 ? (
//                   <VolumeX className="text-gray-600" size={20} />
//                 ) : (
//                   <Volume2 className="text-gray-600" size={20} />
//                 )}
//               </button>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 className="w-32 accent-teal-500"
//               />
//               <span className="text-gray-600 text-sm">{Math.round(volume * 100)}%</span>
//             </div>
//           </motion.div>
//         )}
//       </div>

//       {/* Course Outline */}
//       <div className="md:w-96 border-l border-gray-200 p-6 overflow-y-auto">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800">Course Outline</h3>
//         {courses.map((course) => (
//           <div key={course._id} className="mb-4">
//             <h4 className="font-medium text-gray-700 mb-2">{course.title}</h4>
//             {course.videos?.map((video, i) => {
//               const prevVideo = course.videos[i - 1];
//               const canPlay =
//                 video.isFree ||
//                 completedVideos.has(prevVideo?._id) ||
//                 userPackages.some(pkg => pkg.level >= (course.requiredLevel || 1));

//               return (
//                 <motion.div
//                   key={video._id}
//                   className={`flex items-center justify-between p-2 rounded-lg mb-2 cursor-pointer transition-all ${
//                     canPlay ? "hover:bg-gray-100" : "bg-gray-50 opacity-70 cursor-not-allowed"
//                   }`}
//                   onClick={() => {
//                     if (canPlay) {
//                       setSelectedCourse({
//                         ...course,
//                         currentVideoUrl: video.url,
//                         currentVideoId: video._id,
//                       });
//                     } else {
//                       setShowUpgradeModal(true);
//                     }
//                   }}
//                 >
//                   <div className="flex items-center gap-2">
//                     {completedVideos.has(video._id) ? (
//                       <CheckCircle className="w-5 h-5 text-green-500" />
//                     ) : (
//                       <Play className="w-5 h-5 text-gray-400" />
//                     )}
//                     <span className="text-sm text-gray-700">{video.title}</span>
//                   </div>
//                   {!canPlay && <Lock className="w-4 h-4 text-gray-400" />}
//                 </motion.div>
//               );
//             })}
//           </div>
//         ))}
//       </div>

//       {/* Upgrade Modal */}
//       {showUpgradeModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
//             <Lock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
//             <p className="text-sm text-gray-600 mb-5">
//               Upgrade your package to unlock this course and more exclusive lessons.
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowUpgradeModal(false)}
//                 className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => (window.location.href = "/packages")}
//                 className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-yellow-400 text-white font-semibold shadow hover:opacity-90"
//               >
//                 Upgrade
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import {
//   Play,
//   Lock,
//   CheckCircle,
//   AlertCircle,
//   Volume2,
//   VolumeX,
// } from "lucide-react";
// import { apiClient } from "../../../api/apiClient";
// import { getUserPackages } from "../../../api/userPackageApi";
// import { useNavigate } from "react-router-dom";
// import PackageSelection from "../../../utlis/PackageSelection"; // ✅ Adjust path

// export default function Course() {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [progress, setProgress] = useState({ percent: 0, completed: 0, total: 0 });
//   const [completedVideos, setCompletedVideos] = useState(new Set());
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showUpgradeModal, setShowUpgradeModal] = useState(false);
//   const [userPackages, setUserPackages] = useState([]);
//   const [volume, setVolume] = useState(0.8);
//   const [isMuted, setIsMuted] = useState(false);
//   const [showPackageModal, setShowPackageModal] = useState(false);
//   const videoRef = useRef(null);
//   const navigate = useNavigate();

//   // ✅ Fetch user packages & courses
//   useEffect(() => {
//     const init = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const userPackages = await getUserPackages();
//         setUserPackages(userPackages);

//         if (!userPackages || userPackages.length === 0) {
//           setError("You currently have no active packages. Please buy a package to access courses.");
//           setLoading(false);
//           return;
//         }

//         const res = await apiClient.get("/api/users/training/courses");
//         const data = res.data;

//         if (!Array.isArray(data) || data.length === 0) {
//           setError("No courses available at the moment.");
//           setLoading(false);
//           return;
//         }

//         const accessibleCourses = data.filter(course =>
//           userPackages.some(pkg => pkg.level >= (course.requiredLevel || 1))
//         );

//         if (accessibleCourses.length === 0) {
//           setError("Your current package does not grant access to any courses. Please upgrade your package.");
//           setLoading(false);
//           return;
//         }

//         setCourses(accessibleCourses);
//         const first = accessibleCourses.find(c => c.isActive) || accessibleCourses[0];
//         setSelectedCourse(first);
//         setProgress(first.progress || { percent: 0, completed: 0, total: 0 });

//         const completed = new Set();
//         first.videos?.forEach(v => {
//           if (v.completed) completed.add(v._id);
//         });
//         setCompletedVideos(completed);
//       } catch (err) {
//         console.error("Failed to load data:", err);
//         setError("Failed to load data. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     init();
//   }, []);

//   // ✅ Volume handlers
//   const handleVolumeChange = (e) => {
//     const newVolume = parseFloat(e.target.value);
//     setVolume(newVolume);
//     if (videoRef.current) videoRef.current.volume = newVolume;
//     if (newVolume > 0) setIsMuted(false);
//   };

//   const toggleMute = () => {
//     setIsMuted(!isMuted);
//     if (videoRef.current) videoRef.current.muted = !isMuted;
//   };

//   // ✅ Handle video completion
//   const handleVideoEnd = (videoId) => {
//     if (!completedVideos.has(videoId)) {
//       const updated = new Set(completedVideos);
//       updated.add(videoId);
//       setCompletedVideos(updated);
//       setProgress(prev => ({
//         ...prev,
//         completed: prev.completed + 1,
//         percent: Math.min(((prev.completed + 1) / prev.total) * 100, 100),
//       }));
//     }
//   };

//   // ✅ Loading state
//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen bg-white">
//         <p className="text-gray-500 text-lg">Loading courses...</p>
//       </div>
//     );

//   // ✅ Error state with modal trigger
//   if (error)
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-6 relative">
//         <div className="text-center max-w-md">
//           <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
//           <p className="text-gray-700 mb-4">{error}</p>
//           <button
//             onClick={() => setShowPackageModal(true)}
//             className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-full font-medium hover:opacity-90"
//           >
//             View Packages
//           </button>
//         </div>

//         {/* ✅ Package Modal */}
//         {showPackageModal && (
//           <PackageSelection onClose={() => setShowPackageModal(false)} />
//         )}
//       </div>
//     );

//   // ✅ Main course UI
//   return (
//     <div className="flex flex-col md:flex-row min-h-screen bg-white">
//       {/* Video Section */}
//       <div className="flex-1 p-6">
//         {selectedCourse && (
//           <motion.div
//             key={selectedCourse._id}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-gray-50 rounded-2xl p-4 shadow"
//           >
//             <h2 className="text-xl font-bold text-gray-800 mb-4">
//               {selectedCourse.title}
//             </h2>

//             <video
//               ref={videoRef}
//               key={selectedCourse._id}
//               src={selectedCourse.currentVideoUrl || ""}
//               controls
//               onEnded={() => handleVideoEnd(selectedCourse.currentVideoId)}
//               className="rounded-xl w-full mb-3"
//               style={{ aspectRatio: "16/9" }}
//               volume={volume}
//               muted={isMuted}
//             ></video>

//             {/* Volume Control */}
//             <div className="flex items-center gap-3 mt-2">
//               <button
//                 onClick={toggleMute}
//                 className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
//               >
//                 {isMuted || volume === 0 ? (
//                   <VolumeX className="text-gray-600" size={20} />
//                 ) : (
//                   <Volume2 className="text-gray-600" size={20} />
//                 )}
//               </button>
//               <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={volume}
//                 onChange={handleVolumeChange}
//                 className="w-32 accent-teal-500"
//               />
//               <span className="text-gray-600 text-sm">
//                 {Math.round(volume * 100)}%
//               </span>
//             </div>
//           </motion.div>
//         )}
//       </div>

//       {/* Course Outline */}
//       <div className="md:w-96 border-l border-gray-200 p-6 overflow-y-auto">
//         <h3 className="text-lg font-semibold mb-4 text-gray-800">
//           Course Outline
//         </h3>
//         {courses.map((course) => (
//           <div key={course._id} className="mb-4">
//             <h4 className="font-medium text-gray-700 mb-2">
//               {course.title}
//             </h4>
//             {course.videos?.map((video, i) => {
//               const prevVideo = course.videos[i - 1];
//               const canPlay =
//                 video.isFree ||
//                 completedVideos.has(prevVideo?._id) ||
//                 userPackages.some(pkg => pkg.level >= (course.requiredLevel || 1));

//               return (
//                 <motion.div
//                   key={video._id}
//                   className={`flex items-center justify-between p-2 rounded-lg mb-2 cursor-pointer transition-all ${
//                     canPlay
//                       ? "hover:bg-gray-100"
//                       : "bg-gray-50 opacity-70 cursor-not-allowed"
//                   }`}
//                   onClick={() => {
//                     if (canPlay) {
//                       setSelectedCourse({
//                         ...course,
//                         currentVideoUrl: video.url,
//                         currentVideoId: video._id,
//                       });
//                     } else {
//                       setShowUpgradeModal(true);
//                     }
//                   }}
//                 >
//                   <div className="flex items-center gap-2">
//                     {completedVideos.has(video._id) ? (
//                       <CheckCircle className="w-5 h-5 text-green-500" />
//                     ) : (
//                       <Play className="w-5 h-5 text-gray-400" />
//                     )}
//                     <span className="text-sm text-gray-700">
//                       {video.title}
//                     </span>
//                   </div>
//                   {!canPlay && <Lock className="w-4 h-4 text-gray-400" />}
//                 </motion.div>
//               );
//             })}
//           </div>
//         ))}
//       </div>

//       {/* Upgrade Modal */}
//       {showUpgradeModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
//             <Lock className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
//             <h3 className="text-lg font-semibold mb-2">Premium Content</h3>
//             <p className="text-sm text-gray-600 mb-5">
//               Upgrade your package to unlock this course and more exclusive lessons.
//             </p>
//             <div className="flex justify-center gap-4">
//               <button
//                 onClick={() => setShowUpgradeModal(false)}
//                 className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => setShowPackageModal(true)} // open the same modal
//                 className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-yellow-400 text-white font-semibold shadow hover:opacity-90"
//               >
//                 Upgrade
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Package Modal (from both error or upgrade trigger) */}
//       {showPackageModal && (
//         <PackageSelection onClose={() => setShowPackageModal(false)} />
//       )}
//     </div>
//   );
// }

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { PlayCircle, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { apiClient } from "../../../api/apiClient";
import { useNavigate, useLocation } from "react-router-dom";
import PackageSelection from "../../../utlis/PackageSelection";
import courseThumb from "../../../assets/veloximg1.jpeg";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [progress, setProgress] = useState({
    percent: 0,
    completed: 0,
    total: 0,
  });
  const [completedVideos, setCompletedVideos] = useState(new Set());
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [hasPurchasedPackage, setHasPurchasedPackage] = useState(false);

  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // === INIT: Check Package + Load Courses ===
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1. Check user's packages
        const pkgRes = await apiClient.get("/api/users/packages");
        const userPackages = pkgRes.data || [];

        const hasPaid = userPackages.some((p) => !p.isFree);
        const hasFreeTrial = userPackages.some((p) => p.isFree);

        setHasPurchasedPackage(hasPaid || hasFreeTrial);

        // 2. No package → force PackageSelection
        if (!hasPaid && !hasFreeTrial) {
          setShowPackageModal(true);
          setLoading(false);
          return;
        }

        // 3. Load courses
        const res = await apiClient.get("/api/users/training/courses");
        let data = res.data;

        if (!Array.isArray(data) || data.length === 0) {
          setError("No courses available.");
          setLoading(false);
          return;
        }

        // 4. Unlock first video IF Free Trial or Paid
        if (data[0]?.videos?.[0]) {
          if (hasFreeTrial || hasPaid) {
            data[0].videos[0].isFree = true;
          }
        }

        setCourses(data);
        const firstActive = data.find((c) => c.isActive) || data[0];
        setSelectedCourse(firstActive);
        setProgress(
          firstActive.progress || { percent: 0, completed: 0, total: 0 }
        );

        const completed = new Set();
        firstActive.videos?.forEach((v) => v.completed && completed.add(v._id));
        setCompletedVideos(completed);
      } catch (err) {
        console.error("Init failed:", err);
        setError("Failed to load. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // Always show PackageSelection on this route
  const handleClose = () => {
    // Optional: go back or stay
    navigate("/users");
  };

  // Auto-scroll on redirect
  useEffect(() => {
    if (location.state?.scrollToVideo && currentVideo) {
      setTimeout(() => {
        videoSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [currentVideo, location]);

  // Mark video complete
  // const markVideoComplete = async (videoId) => {
  //   if (completedVideos.has(videoId)) return;

  //   try {
  //     await apiClient.post(
  //       `/api/users/training/courses/${selectedCourse._id}/videos/${videoId}/complete`
  //     );

  //     const updated = new Set(completedVideos);
  //     updated.add(videoId);
  //     setCompletedVideos(updated);

  //     const newCompleted = progress.completed + 1;
  //     const newPercent = Math.round((newCompleted / progress.total) * 100);
  //     setProgress(prev => ({ ...prev, completed: newCompleted, percent: newPercent }));

  //     const currentIdx = selectedCourse.videos?.findIndex(v => v._id === videoId);
  //     const nextVideo = selectedCourse.videos?.[currentIdx + 1];

  //     if (nextVideo) {
  //       if (nextVideo.isFree) {
  //         setTimeout(() => setCurrentVideo(nextVideo), 800);
  //       } else {
  //         setShowUpgradeModal(true);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Failed to mark complete:", err);
  //   }
  // };

  const markVideoComplete = async (videoId) => {
    if (completedVideos.has(videoId)) return;

    try {
      // 1️⃣ Mark current video as complete
      await apiClient.post(
        `/api/users/training/courses/${selectedCourse._id}/videos/${videoId}/complete`
      );

      const updated = new Set(completedVideos);
      updated.add(videoId);
      setCompletedVideos(updated);

      const newCompleted = progress.completed + 1;
      const newPercent = Math.round((newCompleted / progress.total) * 100);
      setProgress((prev) => ({
        ...prev,
        completed: newCompleted,
        percent: newPercent,
      }));

      // 2️⃣ Get the index of current video
      const currentIdx = selectedCourse.videos?.findIndex(
        (v) => v._id === videoId
      );

      // 3️⃣ Find the next video in the list
      const nextVideo = selectedCourse.videos?.[currentIdx + 1];

      // 4️⃣ Auto-play next video
      if (nextVideo) {
        // Only play if unlocked/free
        if (nextVideo.isFree || completedVideos.has(videoId)) {
          setTimeout(() => {
            setCurrentVideo(nextVideo);
          }, 1000); // slight delay for smooth transition
        } else {
          setShowUpgradeModal(true);
        }
      } else {
        // 5️⃣ No next video — course completed
        console.log("🎉 Course completed!");
      }
    } catch (err) {
      console.error("Failed to mark complete:", err);
    }
  };

  // Video end handler
  useEffect(() => {
    if (!currentVideo || !videoRef.current) return;

    const video = videoRef.current;
    const handleEnded = () => markVideoComplete(currentVideo._id);

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [currentVideo, selectedCourse]);

  // Load course details
  const loadCourseDetails = async (courseId) => {
    try {
      setVideoLoading(true);
      setError(null);

      const res = await apiClient.get(
        `/api/users/training/courses/${courseId}`
      );
      const course = res.data;

      setSelectedCourse(course);
      setProgress(course.progress || { percent: 0, completed: 0, total: 0 });

      const completed = new Set();
      course.videos?.forEach((v) => v.completed && completed.add(v._id));
      setCompletedVideos(completed);

      const firstFree = course.videos?.find((v) => v.isFree);
      if (firstFree) {
        setCurrentVideo(firstFree);
      }
    } catch (err) {
      console.error("Failed to load course:", err);
      setError("Failed to load course.");
    } finally {
      setVideoLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const pieData = [
    { name: "Completed", value: progress.percent },
    { name: "Remaining", value: 100 - progress.percent },
  ];
  const COLORS = ["#14b8a6", "#e5e7eb"];

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-white flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading courses...</div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-full font-medium hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Course List
  if (!selectedCourse || (!currentVideo && !selectedCourse.videos)) {
    return (
      <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-white flex flex-col items-center py-12 px-6 md:px-20">
        <div className="w-full max-w-5xl space-y-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Academy Courses
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 dark:bg-neutral-900 dark:text-white lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div
                key={course._id}
                whileHover={{ scale: 1.03 }}
                onClick={() => loadCourseDetails(course._id)}
                className="bg-white dark:bg-neutral-900 dark:text-white rounded-xl shadow-md overflow-hidden cursor-pointer border hover:shadow-lg transition"
              >
                <img
                  src={course.thumbnail || "/placeholder.jpg"}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />
                <div className="p-5 dark:bg-neutral-900 dark:text-white">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {course.description || "No description."}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-teal-600 font-medium">
                      {course.progress?.completed || 0}/
                      {course.progress?.total || 0} completed
                    </span>
                    <div className="w-10 h-10">
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={[
                              { value: course.progress?.percent || 0 },
                              { value: 100 - (course.progress?.percent || 0) },
                            ]}
                            innerRadius={12}
                            outerRadius={18}
                            dataKey="value"
                          >
                            <Cell fill="#14b8a6" />
                            <Cell fill="#e5e7eb" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Course Landing
  if (!currentVideo) {
    return (
      <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-white flex flex-col items-center py-12 px-6 md:px-20 text-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 w-full max-w-5xl mb-10">
          <div className="flex dark:bg-neutral-900 dark:text-white flex-col items-center">
            <div className="w-40 h-40 rounded-full bg-gradient-to-b from-teal-500 to-yellow-400 flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src={selectedCourse.thumbnail || courseThumb}
                alt={selectedCourse.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = courseThumb;
                }}
              />
            </div>
          </div>

          <div className="text-center md:text-left max-w-md">
            <p className="text-sm dark:bg-neutral-900 dark:text-white text-gray-500 font-semibold mb-1">
              Course {selectedCourse.order} of {courses.length}
            </p>
            <h2 className="text-4xl font-extrabold text-gray-800 dark:bg-neutral-900 dark:text-white mb-3">
              {selectedCourse.title}
            </h2>
            <p className="text-gray-600 dark:bg-neutral-900 dark:text-white mb-5">
              {selectedCourse.description}
            </p>
            <button
              onClick={() => {
                const firstFree = selectedCourse.videos?.find((v) => v.isFree);
                if (firstFree) {
                  setCurrentVideo(firstFree);
                } else {
                  setShowPackageModal(true);
                }
              }}
              className="px-6 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white font-semibold dark:bg-neutral-900 dark:text-white rounded-full shadow-md hover:opacity-90 transition-all"
            >
              Start Course
            </button>
          </div>
        </div>

        <hr className="w-full max-w-5xl border-gray-200 my-6" />

        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm">
          {/* ─── Progress Section ─── */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Your Progress
            </h3>
            <p className="text-sm text-teal-600 dark:text-teal-400 mb-6">
              {progress.completed} of {progress.total} videos completed
            </p>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 w-full">
              {/* Pie chart */}
              <div className="w-full sm:w-72 h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={85}
                      outerRadius={105}
                      paddingAngle={1}
                      dataKey="value"
                    >
                      {pieData.map((_, i) => (
                        <Cell key={i} fill={COLORS[i]} />
                      ))}
                    </Pie>
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-4xl sm:text-5xl font-extrabold fill-gray-800 dark:fill-gray-100"
                    >
                      {progress.percent}%
                    </text>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Icon */}
              <div
                className={`p-4 rounded-full shadow-md mt-4 sm:mt-0 ${
                  progress.percent === 100
                    ? "bg-teal-600 text-white"
                    : "bg-yellow-500 text-white"
                }`}
              >
                {progress.percent === 100 ? (
                  <CheckCircle size={28} />
                ) : (
                  <PlayCircle size={28} />
                )}
              </div>
            </div>
          </div>

          {/* ─── Course Outline Section ─── */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
              Course Outline
            </h3>

            <div className="space-y-2">
              {selectedCourse.videos?.map((video, i) => {
                const prevVideo = selectedCourse.videos[i - 1];
                const isLocked = i > 0 && !completedVideos.has(prevVideo?._id);
                const canPlay =
                  video.isFree || completedVideos.has(prevVideo?._id);
                const isCompleted = completedVideos.has(video._id);
                const isActive = currentVideo?._id === video._id;

                return (
                  <div
                    key={video._id}
                    onClick={() =>
                      canPlay
                        ? setCurrentVideo(video)
                        : setShowPackageModal(true)
                    }
                    className={`grid grid-cols-[50px_1fr_60px] dark:bg-neutral-900 dark:text-white sm:grid-cols-[70px_1fr_80px] items-start gap-2 sm:gap-4 py-3 sm:py-4 px-2 sm:px-4 rounded-lg transition-all cursor-pointer
              ${
                isLocked || !canPlay
                  ? "opacity-60"
                  : "hover:bg-gray-50 dark:hover:bg-neutral-800"
              }
              ${
                isActive
                  ? "bg-teal-50 dark:bg-neutral-800 ring-2 ring-teal-500/30"
                  : ""
              }`}
                  >
                    {/* Icon column */}
                    <div className="flex flex-col items-center relative">
                      <div
                        className={`flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-full border-2 z-10
                  ${
                    isCompleted
                      ? "bg-teal-500 border-teal-500"
                      : "bg-white dark:bg-neutral-900 border-teal-500"
                  }`}
                      >
                        {isCompleted ? (
                          <CheckCircle size={18} className="text-white" />
                        ) : (
                          <PlayCircle
                            size={18}
                            className={`${
                              isActive ? "text-yellow-500" : "text-teal-500"
                            }`}
                          />
                        )}
                      </div>

                      {i < selectedCourse.videos.length - 1 && (
                        <div
                          className="absolute top-[50%] translate-y-[20px] w-[2px] bg-gray-300 dark:bg-neutral-700"
                          style={{
                            height: "calc(100% - 10px)",
                            left: "50%",
                            transform: "translateX(-50%) translateY(20px)",
                          }}
                        />
                      )}
                    </div>

                    {/* Title column */}
                    <div className="flex flex-col">
                      <p
                        className={`text-sm sm:text-base md:text-lg font-medium leading-tight ${
                          isLocked
                            ? "text-gray-400 dark:text-gray-600"
                            : "text-gray-800 dark:text-gray-200"
                        }`}
                      >
                        {video.title}
                        {!video.isFree && (
                          <Lock
                            size={16}
                            className="inline ml-1 sm:ml-2 text-gray-400 dark:text-gray-500"
                          />
                        )}
                      </p>
                      <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {video.duration ? `${video.duration} mins` : "—"}
                      </span>
                    </div>

                    {/* Time column */}
                    <div className="flex items-center justify-end">
                      <div className="h-6 sm:h-8 w-[1.5px] bg-gray-300 dark:bg-neutral-700 rounded-sm mr-2 sm:mr-4" />
                      <div className="text-xs sm:text-sm font-semibold text-gray-600 dark:text-gray-400 min-w-[50px] sm:min-w-[60px] text-right">
                        {video.length || video.time || "10:00"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Video Player
  return (
    <div className="min-h-screen dark:bg-neutral-900 dark:text-white bg-[#f9fafb] flex flex-col items-center py-10 px-6 md:px-16 text-gray-800">
      <div className="w-full dark:bg-neutral-900 dark:text-white max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ─────────────── Main Video Section ─────────────── */}
        <motion.div
          ref={videoSectionRef}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-2 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-neutral-800"
        >
          {/* Video Player */}
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              src={currentVideo.url}
              controls
              autoPlay
              className="w-full h-full object-cover"
              poster={selectedCourse.thumbnail || "/placeholder.jpg"}
            />

            {/* Subtle Overlay for Depth */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 flex justify-between items-end">
              <div className="text-white">
                <h2 className="text-xl md:text-2xl font-semibold mb-1">
                  {currentVideo.title}
                </h2>
                <p className="text-sm text-gray-200">
                  {formatTime(0)} / {formatTime(currentVideo.duration || 0)}
                </p>
              </div>
              <button
                onClick={() => setCurrentVideo(null)}
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-lg font-medium shadow hover:opacity-90"
              >
                Back to Course
              </button>
            </div>
          </div>

          {/* Divider Line */}
          <div className="h-[1px] bg-gray-200 dark:bg-neutral-700" />

          {/* Video Description / Controls area (optional future use) */}
          <div className="p-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                Now Playing
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {selectedCourse.title || "Course Module"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─────────────── Course Outline Section ─────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 p-5 flex flex-col"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-between">
            Course Outline
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {selectedCourse.videos?.length || 0} Lessons
            </span>
          </h3>

          <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700">
            {selectedCourse.videos?.map((video) => {
              const prevVideo =
                selectedCourse.videos[selectedCourse.videos.indexOf(video) - 1];
              const isLocked =
                selectedCourse.videos.indexOf(video) > 0 &&
                !completedVideos.has(prevVideo?._id);
              const canPlay =
                video.isFree || completedVideos.has(prevVideo?._id);

              return (
                <motion.div
                  key={video._id}
                  onClick={() =>
                    canPlay ? setCurrentVideo(video) : setShowPackageModal(true)
                  }
                  whileHover={{ scale: canPlay ? 1.03 : 1 }}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer border transition-all ${
                    currentVideo._id === video._id
                      ? "bg-gradient-to-r from-teal-500 to-yellow-400 text-white border-none"
                      : isLocked || !canPlay
                      ? "bg-gray-100 dark:bg-neutral-800 opacity-60 border-gray-200 dark:border-neutral-700"
                      : "bg-gray-50 dark:bg-neutral-800 hover:bg-gray-100 dark:hover:bg-neutral-700 border-gray-200 dark:border-neutral-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {completedVideos.has(video._id) ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : (
                      <PlayCircle
                        size={20}
                        className={`${
                          currentVideo._id === video._id
                            ? "text-white"
                            : "text-teal-500"
                        }`}
                      />
                    )}
                    <span className="text-sm font-medium truncate max-w-[200px]">
                      {video.title}
                    </span>
                  </div>
                  {!video.isFree && (
                    <Lock size={16} className="text-gray-400" />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* UPGRADE MODAL */}
      {showUpgradeModal && (
        <div className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-neutral-900 dark:text-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="text-yellow-500" size={28} />
              <h3 className="text-xl font-bold dark:bg-neutral-900 dark:text-white">
                Premium Content
              </h3>
            </div>
            <p className="text-gray-600 dark:bg-neutral-900 dark:text-white mb-4">
              This lesson is part of the <strong>Premium Package</strong>.
              Upgrade to continue.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="flex-1 py-2 border border-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowPackageModal(true);
                  setShowUpgradeModal(false);
                }}
                className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-yellow-400 text-white rounded-md font-medium"
              >
                Upgrade Now
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
