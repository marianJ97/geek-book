import React from "react";
import Topbar from "../topbar/Topbar";

function Layout({ children, user }) {
  return (
    <div>
      <Topbar user={user} />
      {children}
    </div>
  );
}

export default Layout;