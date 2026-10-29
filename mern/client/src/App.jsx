import "./styles/App.css";

import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="w-full p-6">
      {/* add your <Navbar /> back here once you build a new one */}
      <Outlet />
    </div>
  );
};
export default App;