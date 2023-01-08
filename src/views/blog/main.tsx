import { NavLink, Outlet, Route } from "react-router-dom";

const Main = () => {
  return (
    <div className="Main">
      <Outlet />
    </div>
  );
};

export default Main;
