import Menubar from './components/Menubar/Menubar.jsx';
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Explore from './pages/Explore/Explore.jsx';
import ManageItems from './pages/ManageItems/ManageItems.jsx';
import ManageCategory from './pages/ManageCategory/ManageCategory.jsx';
import ManageUsers from './pages/ManageUsers/ManageUsers.jsx';
import OrderHistory from './pages/OrderHistory/OrderHistory.jsx';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login.jsx';

const App = () => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem("token"); // or your auth logic

    return (
        <div>
            {location.pathname !== "/login" && <Menubar />}
            <Toaster />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                <Route path="/explore" element={isAuthenticated ? <Explore /> : <Navigate to="/login" />} />
                <Route path="/items" element={isAuthenticated ? <ManageItems /> : <Navigate to="/login" />} />
                <Route path="/category" element={isAuthenticated ? <ManageCategory /> : <Navigate to="/login" />} />
                <Route path="/users" element={isAuthenticated ? <ManageUsers /> : <Navigate to="/login" />} />
                <Route path="/orders" element={isAuthenticated ? <OrderHistory /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
};

export default App;