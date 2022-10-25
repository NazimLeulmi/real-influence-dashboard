import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminForm from "./adminForm";
import Admins from "./admins";
import Dashboard from "./dashboard";
import Influencers from "./influencers";
import SignIn from "./signin";
import Users from "./users";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/influencers" element={<Influencers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/admins" element={<Admins />} />
        <Route path="/admin-form" element={<AdminForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
