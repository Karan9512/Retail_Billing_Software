import Menubar from "./components/Menubar/Menubar.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import ManageCategory from "./pages/ManageCategory/ManageCategory.jsx";
import ManageItems from "./pages/ManageItems/ManageItems.jsx";
import ManageUsers from "./pages/ManageUsers/ManageUsers.jsx";
import {Route, Routes} from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import OrderHistory from "./pages/OrderHistory/OrderHistory.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Explore from "./pages/Explore/Explore.jsx";

function App() {

  return (
    <div>
      <Menubar/>
        <Routes>
            <Route path = "/dashboard" element ={<Dashboard />}/>
            <Route path = "/category" element ={<ManageCategory />}/>
            <Route path = "/users" element ={<ManageUsers />}/>
            <Route path = "/items" element ={<ManageItems />}/>
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />

        </Routes>
    </div>
  )
}

export default App
