import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Issues from "./pages/Issues";
import Issue from "./pages/Issue";
import UserProfile from "./pages/UserProfile";
import AdminUsers from "./pages/AdminUsers";
import AdminDepartment from "./pages/AdminDepartments";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* private routes */}
        <Route element={<UserRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="issues">
            <Route path=":id" element={<Issue />} />
            <Route path="sent" element={<Issues tag={"sent"} />} />
            <Route path="received" element={<Issues tag={"received"} />} />
            <Route path="all" element={<Issues />} />
          </Route>
          <Route path="/user/:id" element={<UserProfile />} />
          <Route element={<AdminRoutes />}>
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/departments" element={<AdminDepartment />} />
          </Route>
        </Route>
        {/* Unprotected routes */}
        <Route element={<Login />} path="/login" />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
