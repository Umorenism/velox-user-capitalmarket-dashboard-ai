

import React from "react";
import logo from "../assets/cr.png";

export default function LeaderBoard() {
  const rows = [
    { rank: 1, username: "*****888", country: "South Korea", flag: "kr", sales: "$1,525,000", userId: "****322", badge: "1st.png", className: "leaderboard_first" },
    { rank: 2, username: "******s30", country: "Philippines", flag: "ph", sales: "$1,320,000", userId: "****050", badge: "2nd.png", className: "leaderboard_second" },
    { rank: 3, username: "*****e02", country: "Malaysia", flag: "my", sales: "$1,205,000", userId: "****501", badge: "3rd.png", className: "leaderboard_third" },
    { rank: 4, username: "*****3cs", country: "Vietnam", flag: "vn", sales: "$960,000", userId: "****873", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
    { rank: 5, username: "*****092", country: "Indonesia", flag: "id", sales: "$940,000", userId: "****289", className: "leaderboard_lower" },
  ];

  const rankStyle = (className) => {
    switch (className) {
      case "leaderboard_first":
        return "bg-gradient-to-r from-[#6C4B2E] via-[#A17650] to-[#3B2619] border border-[#A17650]/60";
      case "leaderboard_second":
        return "bg-gradient-to-r from-[#4B4B4B] via-[#999999] to-[#3B3B3B] border border-gray-400/50";
      case "leaderboard_third":
        return "bg-gradient-to-r from-[#5C3C29] via-[#8B614F] to-[#3C251D] border border-[#8B614F]/50";
      default:
        return "bg-[#1E1510]/70 border border-[#A17650]/20";
    }
  };

  return (
    <div className="p-3 sm:p-6 md:p-8 text-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
        <img
          src="https://portal.internationalfinanceasia.com/assets/ifa_icon/leaderboard/crown.png"
          alt="Crown Icon"
          className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]"
        />
        <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#A17650] via-[#C09A6B] to-[#6C4B2E]">
          Leaderboard
        </h2>
      </div>

      {/* Leaderboard Container */}
      <section className="relative rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(161,118,80,0.6)] border border-[#A17650]/60 bg-gradient-to-b from-[#1A1109] to-[#000000]">
        {/* Decorative background */}
        <img
          src="https://portal.internationalfinanceasia.com/assets/ifa_icon/leaderboard/porsche/All_1.png"
          alt="Decor"
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        />

        {/* Top Gift Decorations */}
        <div className="relative flex justify-between items-center p-3 sm:p-6">
          <img
            src="https://portal.internationalfinanceasia.com/assets/ifa_icon/leaderboard/porsche/gift.png"
            alt="Gift Left"
            className="w-14 sm:w-20 md:w-28 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]"
          />
          <img
            src="https://portal.internationalfinanceasia.com/assets/ifa_icon/leaderboard/porsche/double_gift.png"
            alt="Gift Right"
            className="w-16 sm:w-24 md:w-36 drop-shadow-[0_0_10px_rgba(255,215,0,0.4)]"
          />
        </div>

        {/* Title Card */}
        <div className="relative mb-3 md:mb-20 w-[95%] sm:w-[90%] md:max-w-2xl mx-auto mt-4 sm:mt-6 rounded-2xl bg-gradient-to-br from-[#3b2a1b] via-[#5a3c22] to-[#1c1209] shadow-lg border border-[#C09A6B]/40 p-4 sm:p-6 text-center">
          <div className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8">
            <img src={logo} alt="Crown" className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" />
          </div>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#D6AC85] via-[#C09A6B] to-[#D6AC85] text-base sm:text-xl md:text-2xl font-bold uppercase tracking-wide">
            Top 30 IBO Lamborghini Challenge
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto px-2 sm:px-4 pb-6 mt-4">
          <table className="min-w-full border-separate border-spacing-y-2 text-left text-xs sm:text-sm md:text-base">
            <thead>
              <tr className="text-[#FFD580] uppercase tracking-wider bg-[#2A1C13]/60 backdrop-blur-md">
                <th className="p-2 sm:p-3 rounded-l-lg">Rank</th>
                <th className="p-2 sm:p-3">Username</th>
                <th className="p-2 sm:p-3">Country</th>
                <th className="p-2 sm:p-3">Sales</th>
                <th className="p-2 sm:p-3 rounded-r-lg">User ID</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr
                  key={index}
                  className={`${rankStyle(row.className)} rounded-xl transition-transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(161,118,80,0.6)]`}
                >
                  <td className="p-2 sm:p-3 text-center">
                    {row.badge ? (
                      <img
                        src={`https://portal.internationalfinanceasia.com/assets/ifa_icon/leaderboard/porsche/${row.badge}`}
                        alt={`${row.rank} Badge`}
                        className="w-6 sm:w-8 mx-auto"
                      />
                    ) : (
                      <span className="font-bold">{row.rank}</span>
                    )}
                  </td>
                  <td className="p-2 sm:p-3">{row.username}</td>
                  <td className="p-2 sm:p-3 flex items-center gap-2">
                    <img
                      src={`https://portal.internationalfinanceasia.com/assets/images/flag/1x1/${row.flag}.svg`}
                      alt={row.country}
                      className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm shadow"
                    />
                    <span className="hidden sm:inline">{row.country}</span>
                  </td>
                  <td className="p-2 sm:p-3 text-yellow-300 font-medium">{row.sales}</td>
                  <td className="p-2 sm:p-3">{row.userId}</td>
                </tr>
              ))}

              {/* YOU Row */}
              <tr className="bg-[#A17650]/20 border-t border-[#A17650]">
                <td className="p-2 sm:p-3 text-[#FFD580] text-center">–</td>
                <td className="p-2 sm:p-3">You</td>
                <td className="p-2 sm:p-3 flex items-center gap-2">
                  <img
                    src="https://portal.internationalfinanceasia.com/assets/images/flag/1x1/ng.svg"
                    alt="Nigeria"
                    className="w-4 h-4 sm:w-5 sm:h-5 rounded-sm"
                  />
                  <span className="hidden sm:inline">Nigeria</span>
                </td>
                <td className="p-2 sm:p-3">$0</td>
                <td className="p-2 sm:p-3 flex items-center gap-2">
                  ***04531
                  <img
                    src="https://portal.internationalfinanceasia.com/assets/ifa_icon/leaderboard/porsche/star_1.png"
                    alt="You"
                    className="hidden sm:block w-4 sm:w-5 drop-shadow-[0_0_6px_rgba(255,215,0,0.8)]"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom Glow */}
        <div className="absolute inset-x-0 bottom-0 h-8 sm:h-10 bg-gradient-to-t from-[#A17650]/40 to-transparent pointer-events-none"></div>
      </section>
    </div>
  );
}
