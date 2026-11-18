import { Routes, Route, Outlet } from "react-router-dom";
import { SettingsProvider } from "./context/SettingsContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLayout from "./components/AdminLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Overview from "./pages/admin/Overview";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/checkout/:tripId" element={<Checkout />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="*" element={<p>Coming soon</p>} />
        </Route>
      </Routes>
    </SettingsProvider>
  );
}
