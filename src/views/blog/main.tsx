import { NavLink, Outlet, Route } from "react-router-dom";
import React from "react";
const Main = () => {
  return (
    <div className="Main">
      <Outlet />
    </div>
  );
};

class Admin extends React.Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }
  render() {
    return <div>hi</div>;
  }
}

export default Main;
