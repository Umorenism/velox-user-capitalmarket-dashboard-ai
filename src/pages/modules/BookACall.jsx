import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  Send,
  CheckCircle,
  XCircle,
  PlayCircle,
  AlertTriangle,
} from "lucide-react";
import { getUserProfile } from "../../api/authApi";
import { apiClient } from "../../api/apiClient";
import { useUser } from "../../routes/UserContext";

export default function BookACall() {
  const { token } = useUser(); // 🔐 assumes token from context
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: "",
    experience: "",
    topic: "",
    date: "",
    time: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [userCourses, setUserCourses] = useState([]);
  const [eligible, setEligible] = useState(false);
  const [loading, setLoading] = useState(true);

  // ─── Fetch User Courses & Check Eligibility ────────────────────────────────
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, courseRes] = await Promise.all([
          getUserProfile(token),
          apiClient.get("/api/users/training/courses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUserCourses(courseRes.data);

        // check if any course progress >= 50%
        const hasEligibleCourse = courseRes.data.some(
          (c) => c.progress?.percent >= 50
        );
        setEligible(hasEligibleCourse);
      } catch (err) {
        console.error("Failed to load mentorship data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleChange = (field, value) => {
    setAnswers({ ...answers, [field]: value });
  };

  const handleNext = () => {
    if (step === 1 && answers.goal && answers.experience && answers.topic)
      setStep(2);
    else if (step === 2 && answers.date && answers.time)
      setSubmitted(true);
  };

  const handleClose = () => {
    setShowCard(false);
    setStep(1);
    setAnswers({ goal: "", experience: "", topic: "", date: "", time: "" });
    setSubmitted(false);
  };

  // ─── Loader State ─────────────────────────────────────────────
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin border-4 border-teal-500 border-t-transparent rounded-full w-12 h-12 mx-auto mb-4"></div>
          <p>Loading mentorship dashboard...</p>
        </motion.div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-950 flex flex-col items-center justify-center p-6">
      {showCard ? (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 70 }}
          className="w-full max-w-5xl bg-white dark:bg-neutral-800 shadow-xl rounded-2xl p-8 relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-600/10 to-transparent pointer-events-none rounded-2xl" />

          {/* Close Button */}
          {submitted && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
            >
              <XCircle size={22} />
            </button>
          )}

          {/* HEADER */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 relative z-10">
            {submitted
              ? "Call Scheduled!"
              : step === 1
              ? "Live Mentor Assistant"
              : "Book a Live Mentorship Call"}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6 relative z-10">
            {submitted
              ? "Your mentorship session has been successfully booked."
              : step === 1
              ? "Let's get to know you before connecting you to a VeloxCapital mentor."
              : "Select your preferred date and time for your live mentorship call."}
          </p>

          {/* ─── COURSE PROGRESS VALIDATION ───────────────────── */}
          {!eligible && !submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg mb-6 flex items-center gap-3"
            >
              <AlertTriangle size={20} />
              <p>
                You must complete at least <strong>50%</strong> of one course
                before booking a mentorship call.
              </p>
            </motion.div>
          )}

          {/* ─── COURSE PROGRESS LIST ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {userCourses.map((course, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between bg-gray-50 dark:bg-neutral-900 p-4 rounded-xl border border-gray-200 dark:border-neutral-700"
              >
                <div className="flex items-center gap-3">
                  <PlayCircle className="text-teal-500" size={28} />
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {course.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {course.progress?.percent ?? 0}% completed
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 text-sm rounded-full ${
                    course.progress?.percent >= 50
                      ? "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
                      : "bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {course.progress?.percent >= 50
                    ? "Eligible"
                    : "Incomplete"}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ─── Step 1 - AI QUESTIONS ─────────────────────────── */}
          <AnimatePresence>
            {step === 1 && !submitted && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-gray-700 dark:text-gray-200 text-sm font-medium">
                    🎯 What is your main financial goal?
                  </label>
                  <input
                    type="text"
                    value={answers.goal}
                    onChange={(e) => handleChange("goal", e.target.value)}
                    placeholder="e.g. Build a passive income portfolio"
                    className="w-full mt-2 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200 text-sm font-medium">
                    📈 Your trading experience level
                  </label>
                  <select
                    value={answers.experience}
                    onChange={(e) =>
                      handleChange("experience", e.target.value)
                    }
                    className="w-full mt-2 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Select one</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="text-gray-700 dark:text-gray-200 text-sm font-medium">
                    💬 Topic you want to discuss
                  </label>
                  <select
                    value={answers.topic}
                    onChange={(e) => handleChange("topic", e.target.value)}
                    className="w-full mt-2 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="">Choose topic</option>
                    <option value="Investment Strategies">
                      Investment Strategies
                    </option>
                    <option value="Crypto Trading">Crypto Trading</option>
                    <option value="Risk Management">Risk Management</option>
                    <option value="Financial Planning">
                      Financial Planning
                    </option>
                  </select>
                </div>

                <button
                  onClick={handleNext}
                  disabled={
                    !answers.goal || !answers.experience || !answers.topic
                  }
                  className="w-full mt-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 text-white rounded-lg transition"
                >
                  Continue to Booking →
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Step 2 - BOOKING FORM ─────────────────────────── */}
          <AnimatePresence>
            {step === 2 && !submitted && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div>
                  <label className="text-gray-700 dark:text-gray-200 text-sm font-medium flex items-center gap-2">
                    <User size={16} /> Preferred Mentor
                  </label>
                  <select className="w-full mt-2 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500">
                    <option>Choose a mentor</option>
                    <option>
                      Dr. Samuel Owolabi — Senior Investment Coach
                    </option>
                    <option>Amaka Uzo — Crypto Analyst</option>
                    <option>James White — Risk Management Expert</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-gray-700 dark:text-gray-200 text-sm font-medium flex items-center gap-2">
                      <Calendar size={16} /> Date
                    </label>
                    <input
                      type="date"
                      value={answers.date}
                      onChange={(e) => handleChange("date", e.target.value)}
                      className="w-full mt-2 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-gray-700 dark:text-gray-200 text-sm font-medium flex items-center gap-2">
                      <Clock size={16} /> Time
                    </label>
                    <input
                      type="time"
                      value={answers.time}
                      onChange={(e) => handleChange("time", e.target.value)}
                      className="w-full mt-2 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-neutral-900 text-gray-800 dark:text-white focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!eligible || !answers.date || !answers.time}
                  className={`w-full mt-4 py-2 rounded-lg text-white transition flex justify-center items-center gap-2 ${
                    eligible
                      ? "bg-teal-600 hover:bg-teal-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={16} /> Book Call
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── CONFIRMATION ─────────────────────────── */}
          {submitted && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center flex flex-col items-center justify-center py-10"
            >
              <CheckCircle size={60} className="text-teal-500 mb-4" />
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                Great! Your mentorship call is booked.
              </p>
              <p className="text-gray-500 mt-2">
                A confirmation email will be sent to you shortly.
              </p>

              <button
                onClick={handleClose}
                className="mt-6 px-6 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg flex items-center gap-2 transition"
              >
                <XCircle size={18} /> Close
              </button>
            </motion.div>
          )}
        </motion.div>
      ) : (
        // ─── Contact Info after closing ───────────────────────
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 bg-white dark:bg-neutral-800 shadow-md rounded-2xl p-6 max-w-md"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
            VeloxCapital Headquarters
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            12 Marina Street, Victoria Island, Lagos, Nigeria
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            📞 +234 (0) 908 555 2040
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            ✉️ support@veloxcapital.ng
          </p>
          <button
            onClick={() => setShowCard(true)}
            className="mt-6 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition"
          >
            Book Another Call
          </button>
        </motion.div>
      )}

      <p className="text-gray-400 text-xs mt-6">
        Powered by{" "}
        <span className="text-teal-500 font-semibold">
          VeloxCapital Mentorship AI
        </span>
      </p>
    </div>
  );
}
