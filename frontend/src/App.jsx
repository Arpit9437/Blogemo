import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import NavbarLogin from "./components/NavbarLogin";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

const AuthUsers = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const ProtectRoutes = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (
    <>
      {isAuthenticated ? <NavbarLogin /> : <Navbar />}
      <Routes>
        <Route index element={<HomePage />} />
        <Route
          path="/login"
          element={
            <AuthUsers>
              <LoginPage />
            </AuthUsers>
          }
        />
        <Route
          path="/register"
          element={
            <AuthUsers>
              <RegisterPage />
            </AuthUsers>
          }
        />
        <Route
          path="/createPost"
          element={
            <ProtectRoutes>
              <CreatePostPage />
            </ProtectRoutes>
          }
        />
        <Route
          path="/post/:id"
          element={

              <PostPage />
            
          }
        />
        <Route
          path="/post/edit/:id"
          element={
            <ProtectRoutes>
              <EditPost />
            </ProtectRoutes>
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </>
  );
}

export default App;
