import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "./ProtectedRoute";

import MenteeDashboard from "../pages/mentee/MenteeDashboard";
import ViewFeedback from "../pages/mentor/ViewFeedback";
import AdminDashboard from "../pages/admin/AdminDashboard";
import GiveFeedback from "../pages/mentee/GiveFeedback";
 import ActivityMonitor from "../pages/admin/ActivityMonitor";
import ScheduleMeeting from "../pages/admin/ScheduleMeeting";

import AdminUsers from "../pages/admin/AdminUsers";
import AdminFeedback from "../pages/admin/AdminFeedback";
import AdminAssignMentor from "../pages/admin/AdminAssignMentor";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/mentor"
  element={
    <ProtectedRoute role="mentor">
      <ViewFeedback />
    </ProtectedRoute>
  }
/>

<Route
  path="/mentee"
  element={
    <ProtectedRoute role="mentee">
      <MenteeDashboard />
    </ProtectedRoute>
  }
/>
 {/* 🔥 THIS WAS MISSING */}
    <Route path="/mentee/give-feedback" element={<ProtectedRoute role="mentee"><GiveFeedback/></ProtectedRoute>} />

    <Route path="/mentor" element={<ProtectedRoute role="mentor"><ViewFeedback/></ProtectedRoute>} />
 
  
  <Route
  path="/admin/activity"
  element={<ProtectedRoute role="admin"><ActivityMonitor/></ProtectedRoute>}
/>

<Route
  path="/admin/schedule-meeting"
  element={<ProtectedRoute role="admin"><ScheduleMeeting/></ProtectedRoute>}
/>
<Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard/></ProtectedRoute>} />

<Route path="/admin/activity" element={<ProtectedRoute role="admin"><ActivityMonitor/></ProtectedRoute>} />

<Route path="/admin/schedule-meeting" element={<ProtectedRoute role="admin"><ScheduleMeeting/></ProtectedRoute>} />

<Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers/></ProtectedRoute>} />

<Route path="/admin/feedbacks" element={<ProtectedRoute role="admin"><AdminFeedback/></ProtectedRoute>} />

<Route
  path="/admin/assign"
  element={<ProtectedRoute role="admin"><AdminAssignMentor/></ProtectedRoute>}
/>


  </Routes>
);

export default AppRoutes;
