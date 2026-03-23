import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Feed from "./pages/feed/Feed";
import Profile from "./pages/profile/Profile";
import MainLayout from "./layout/MainLayout";
import Developers from "./pages/profile/Developers";
import ViewProfile from "./pages/profile/ViewProfile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <MainLayout>
              <Feed />
            </MainLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <MainLayout>
              <Profile />
            </MainLayout>
          }
        />

        <Route
          path="/developers"
          element={
            <MainLayout>
              <Developers />
            </MainLayout>
          }
        />

        <Route
          path="/profile/:userId"
          element={
            <MainLayout>
              <ViewProfile />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
