import { Link } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-(--color-background)">
     {/* NAVBAR */}
      <nav className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-(--color-primary) font-bold">DevConnect</h1>
        
        <div className="flex gap-4">
          <Link to="/">Feed</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/developers">Developers</Link>
        </div>
      </nav>
     {/* CONTENT */}
      <div className="p-4 max-w-3xl mx-auto">{children}</div>
    </div>
  );
};

export default MainLayout;
