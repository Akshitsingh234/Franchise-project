import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import Navbar from "./Components/Navbar.jsx";
import DetailPage from "./pages/DetailPage.jsx";  
import UserRegistration from "./pages/UserRegistration.jsx";
import UserList from "./pages/UserList.jsx";  
import AdminLogin from "./pages/AdminLogin.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";
import WelcomePage  from "./pages/WelcomePage.jsx";  
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />   {/* ✅ Always visible at top */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
            <Route path="/categories" element={<Home />} />

          <Route path="/category/:categoryName" element={<CategoryPage />} />
         <Route
        path="/admin" element={ <ProtectedRoute> <AdminPage /> </ProtectedRoute> }/>
          <Route path="/franchise/:id" element={<DetailPage />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/userList" element={ <ProtectedRoute> <UserList /> </ProtectedRoute>  } />
            <Route path="/admin-login" element={<AdminLogin />} />

         </Routes>
      </div>
    </div>
  );
}

export default App;
