
// // src/routes/AppRouter.jsx
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useUser } from "./UserContext";
// import DashboardLayout from "../components/layout/DashboardLayout";
// import { ProtectedRoute } from "./ProtectedRoute";
// import { RoleRoute } from "../routes/RoleRoute"; // ← NEW

// // Pages
// import Login from "../pages/Login";
// import SignUp from "../pages/SignUp";
// import VerifyEmail from "../pages/VerifyEmail";
// import ForgetPassword from "../pages/ForgetPassword";
// import ResetPassword from "../pages/RestPassword";

// import Dashboardpage from "../pages/Dashboard/Dashboardpage";
// import UsersMangement from "../pages/Dashboard/UsersManagement";
// import Transaction from "../pages/Dashboard/Transaction";
// import PromotionsBanner from "../pages/Dashboard/PromotionsBanners";
// import Permission from "../pages/Dashboard/Permission";
// import UsersWallet from "../pages/Dashboard/UserWallet";
// import Setting from "../pages/Dashboard/Setting";
// import UsersWithDrawal from "../pages/Dashboard/UserWithDrawal";
// import UsersInternalWithDrawal from "../pages/Dashboard/UserInternalWithdraw";
// import PartnerPage from "../pages/Dashboard/Partners";
// import NotFound from "../pages/Dashboard/NotFound";

// import CompoundCalculator from "../pages/modules/CompoundCalculator";
// import ForexLotSize from "../pages/modules/ForexLotSize";
// import Courses from "../pages/modules/academy/Courses";
// import MarketOverviewCashFX from "../pages/network/RankAdvancement";
// import BookACall from "../pages/modules/BookACall";

// import LeaderBoard from "../pages/LeaderBoard";
// import CopyTrading from "../pages/copyTrading/CopyTrading";
// import Risk from "../pages/Risk/Risk";
// import Matrix from "../pages/network/Matrix";
// import LeadershipBonus from "../pages/network/LeadershipBonus";
// import FastStart from "../pages/network/FastStart";
// import Unilevel from "../pages/network/Unilevel";
// import PersonalMatchingBonus from "../pages/network/PersonalMatchingBonus";
// import VeloxCapitalSignals from "../pages/network/VeloxCapitalSignals";
// import RetirementBlog from "../pages/retirementbloq/RetirementBlog";
// import SupportPage from "../pages/SupportPage";
// import DownloadsPage from "../pages/Dashboard/DownloadsPage";

// import PerformanceReport from "../pages/Dashboard/PerformanceReport";
// import ReportHistoryTransaction from "../utlis/ReportHistoryTrancation";

// export default function AppRouter() {
//   const { user, isTokenValid, loading, userState } = useUser();

//   if (loading) return <div className="text-center mt-20">Loading...</div>;

//   const getInitialRoute = () => {
//     if (!user || !isTokenValid()) return "/login";
//     return userState === "academy" ? "/academy/courses" : "/dashboard";
//   };

//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to={getInitialRoute()} replace />} />

//       {/* Public */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/signup" element={<SignUp />} />
//       <Route path="/verify-email" element={<VerifyEmail />} />
//       <Route path="/forget-password" element={<ForgetPassword />} />
//       <Route path="/reset-password" element={<ResetPassword />} />

//       {/* === TRADING DASHBOARD (only trading users) === */}
//       <Route
//         path="/dashboard"
//         element={
//           <RoleRoute allowedRoles={["trading"]}>
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           </RoleRoute>
//         }
//       >
//         <Route index element={<Dashboardpage />} />
//         <Route path="users" element={<UsersMangement />} />
//         <Route path="wallet/withdrawal" element={<UsersWithDrawal />} />
//         <Route path="wallet/internal-withdraw" element={<UsersInternalWithDrawal />} />
//         <Route path="transactions" element={<Transaction />} />
//         <Route path="wallet/deposit" element={<UsersWallet />} />
//         <Route path="part" element={<PartnerPage />} />
//         <Route path="promotions" element={<PromotionsBanner />} />
//         <Route path="permission" element={<Permission />} />
//         <Route path="setting" element={<Setting />} />

//         {/* Modules */}
//         <Route path="modules/compound-calculator" element={<CompoundCalculator />} />
//         <Route path="modules/forex-lot-size" element={<ForexLotSize />} />

//         {/* Features */}
//         <Route path="leaderboard" element={<LeaderBoard />} />
//         <Route path="copy-trading" element={<CopyTrading />} />
//         <Route path="risk" element={<Risk />} />

//         {/* Network */}
//         <Route path="network/fast-start" element={<FastStart />} />
//         <Route path="network/unilevel" element={<Unilevel />} />
//         <Route path="network/matrix" element={<Matrix />} />
//         <Route path="network/leadership-bonus" element={<LeadershipBonus />} />
//         <Route path="network/personal-matching-bonus" element={<PersonalMatchingBonus />} />
//         <Route path="academy/signals" element={<VeloxCapitalSignals />} />

//         {/* Blog & Support */}
//         <Route path="retirement-blog" element={<RetirementBlog />} />
//         <Route path="support" element={<SupportPage />} />
//         <Route path="downloads" element={<DownloadsPage/>} />
//         <Route path="reports" element={<PerformanceReport/>} />
//         <Route path="reportshistory" element={<ReportHistoryTransaction/>} />
//       </Route>

//       {/* === ACADEMY SECTION (both roles, but academy forced here) === */}
//       <Route
//         path="/academy"
//         element={
//           <RoleRoute allowedRoles={["trading", "academy"]}>
//             <ProtectedRoute>
//               <DashboardLayout /> {/* or create AcademyLayout */}
//             </ProtectedRoute>
//           </RoleRoute>
//         }
//       >
//         <Route path="courses" element={<Courses />} />
//         <Route path="market-overview" element={<MarketOverviewCashFX />} />
//         <Route path="book-a-call" element={<BookACall />} />
//       </Route>

//       {/* Fallback */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }






// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useUser } from "./UserContext";
import DashboardLayout from "../components/layout/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "../routes/RoleRoute";

// Pages
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import VerifyEmail from "../pages/VerifyEmail";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/RestPassword";

import Dashboardpage from "../pages/Dashboard/Dashboardpage";
import UsersMangement from "../pages/Dashboard/UsersManagement";
import Transaction from "../pages/Dashboard/Transaction";
import PromotionsBanner from "../pages/Dashboard/PromotionsBanners";
import Permission from "../pages/Dashboard/Permission";
import UsersWallet from "../pages/Dashboard/UserWallet";
import Setting from "../pages/Dashboard/Setting";
import UsersWithDrawal from "../pages/Dashboard/UserWithDrawal";
import UsersInternalWithDrawal from "../pages/Dashboard/UserInternalWithdraw";
import PartnerPage from "../pages/Dashboard/Partners";
import NotFound from "../pages/Dashboard/NotFound";

import CompoundCalculator from "../pages/modules/CompoundCalculator";
import ForexLotSize from "../pages/modules/ForexLotSize";
import Courses from "../pages/modules/academy/Courses";
import MarketOverviewCashFX from "../pages/network/RankAdvancement";
import BookACall from "../pages/modules/BookACall";

import LeaderBoard from "../pages/LeaderBoard";
import CopyTrading from "../pages/copyTrading/CopyTrading";
import Risk from "../pages/Risk/Risk";
import Matrix from "../pages/network/Matrix";
import LeadershipBonus from "../pages/network/LeadershipBonus";
import FastStart from "../pages/network/FastStart";
import Unilevel from "../pages/network/Unilevel";
import PersonalMatchingBonus from "../pages/network/PersonalMatchingBonus";
import VeloxCapitalSignals from "../pages/network/VeloxCapitalSignals";
import RetirementBlog from "../pages/retirementbloq/RetirementBlog";
import SupportPage from "../pages/SupportPage";
import DownloadsPage from "../pages/Dashboard/DownloadsPage";

import PerformanceReport from "../pages/Dashboard/PerformanceReport";
import ReportHistoryTransaction from "../utlis/ReportHistoryTrancation";
import UserProfile from "../pages/profile/UserProfile";

export default function AppRouter() {
  const { user, isTokenValid, loading, userState } = useUser();

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  const getInitialRoute = () => {
    if (!user || !isTokenValid()) return "/login";
    return userState === "academy" ? "/academy/courses" : "/dashboard";
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={getInitialRoute()} replace />} />

      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forget-password" element={<ForgetPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* === TRADING DASHBOARD === */}
      <Route
        path="/dashboard"
        element={
          <RoleRoute allowedRoles={["trading"]}>
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          </RoleRoute>
        }
      >
        <Route index element={<Dashboardpage />} />
        <Route path="users" element={<UsersMangement />} />
        <Route path="wallet/withdrawal" element={<UsersWithDrawal />} />
        <Route path="wallet/internal-withdraw" element={<UsersInternalWithDrawal />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="wallet/deposit" element={<UsersWallet />} />
        {/* <Route path="part" element={<PartnerPage />} /> */}
        <Route path="promotions" element={<PromotionsBanner />} />
        <Route path="permission" element={<Permission />} />
        <Route path="setting" element={<Setting />} />
       

        {/* Modules */}
        <Route path="modules/compound-calculator" element={<CompoundCalculator />} />
        <Route path="modules/forex-lot-size" element={<ForexLotSize />} />

        {/* Features */}
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="copy-trading" element={<CopyTrading />} />
        <Route path="risk" element={<Risk />} />

        {/* Network */}
        <Route path="network/fast-start" element={<FastStart />} />
        <Route path="network/unilevel" element={<Unilevel />} />
        <Route path="network/matrix" element={<Matrix />} />
        <Route path="network/leadership-bonus" element={<LeadershipBonus />} />
        <Route path="network/personal-matching-bonus" element={<PersonalMatchingBonus />} />

        {/* Blog & Support */}
        <Route path="retirement-blog" element={<RetirementBlog />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="downloads" element={<DownloadsPage />} />
        <Route path="reports" element={<PerformanceReport />} />
        <Route path="reportshistory" element={<ReportHistoryTransaction />} />

        {/* Academy-like (for dashboard view) */}
        <Route path="courses" element={<Courses />} />
        <Route path="academy/market-overview" element={<MarketOverviewCashFX />} />
        <Route path="signals" element={<VeloxCapitalSignals />} />
        <Route path="book-a-call" element={<BookACall />} />
         <Route path="companyprofile" element={<UserProfile />} />
      </Route>

      {/* === ACADEMY DASHBOARD === */}
      <Route
        path="/academy"
        element={
          <RoleRoute allowedRoles={["trading", "academy"]}>
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          </RoleRoute>
        }
      >
        <Route path="courses" element={<Courses />} />
        <Route path="market-overview" element={<MarketOverviewCashFX />} />
        <Route path="modules/compound-calculator" element={<CompoundCalculator />} />
        <Route path="signals" element={<VeloxCapitalSignals />} />
        <Route path="book-a-call" element={<BookACall />} />
        <Route path="downloads" element={<DownloadsPage />} />
        <Route path="reports" element={<PerformanceReport />} />
        <Route path="support" element={<SupportPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
