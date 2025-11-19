import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, BookOpen, FileText, GraduationCap } from "lucide-react";

const materials = [
  {
    title: "Forex Fundamentals",
    desc: "Learn the basics of currency markets, key terms, and trading principles.",
    type: "PDF",
    size: "2.4 MB",
  },
  {
    title: "Technical Analysis Mastery",
    desc: "Understand price patterns, trend lines, and indicators for better trades.",
    type: "Ebook",
    size: "4.1 MB",
  },
  {
    title: "Risk Management Essentials",
    desc: "Master position sizing, risk-reward ratios, and stop-loss strategies.",
    type: "PDF",
    size: "1.8 MB",
  },
  {
    title: "VeloxCapital Academy Guide",
    desc: "Full guide to our academy structure, courses, and mentorship roadmap.",
    type: "Doc",
    size: "3.5 MB",
  },
];

const DownloadsPage = () => {
  const [search, setSearch] = useState("");

  const filtered = materials.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-600 px-6 py-10 text-gray-900 dark:text-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          🎓 VeloxCapital Market Academy
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mb-8">
          Download professional resources, trading materials, and academy
          guides.
        </p>

        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            placeholder="Search materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl px-4 py-3 bg-white/10 border border-gray-300 dark:border-gray-500 dark:bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filtered.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.04, y: -5 }}
            className="bg-white dark:bg-neutral-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/40">
                {item.type === "PDF" ? (
                  <FileText className="text-blue-600 dark:text-blue-400" />
                ) : item.type === "Ebook" ? (
                  <BookOpen className="text-green-600 dark:text-green-400" />
                ) : (
                  <GraduationCap className="text-purple-600 dark:text-purple-400" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {item.type} • {item.size}
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-200 mb-4">
              {item.desc}
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
            >
              <Download size={18} /> Download
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DownloadsPage;
