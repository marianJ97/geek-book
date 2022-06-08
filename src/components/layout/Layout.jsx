import React from "react";
import Topbar from "../topbar/Topbar";

function Layout({ children, user }) {
  // const { user } = useContext(AuthContext);

  return (
    <div>
      {user && <Topbar user={user} />}
      {children}
    </div>
  );
}

export default Layout;
