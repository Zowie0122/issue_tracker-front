import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import Login from './pages/Login';
import Main from './layouts/main';
import Issues from './pages/Issue';
import IssueDetail from './pages/Issue/Detail';
import User from './pages/User';
import Department from './pages/Department';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* private routes */}
        <Route element={<Main children={<UserRoutes />} />}>
          <Route path="issues">
            <Route path=":id" element={<IssueDetail />} />
            <Route path="issued" element={<Issues tag="issued" />} />
            <Route path="received" element={<Issues tag="received" />} />
            <Route path="all" element={<Issues tag="all" />} />
          </Route>
          <Route element={<AdminRoutes />}>
            <Route path="/admin/users" element={<User />} />
            <Route path="/admin/departments" element={<Department />} />
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
