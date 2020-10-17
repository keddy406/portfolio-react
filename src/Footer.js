import React from "react";

import db, { storage } from "./firebase";

function Footer() {
  const [user, setUser] = React.useState([]);
  const Admin = () => {
    const admin = prompt("輸入Admin認證");
    if (admin === "keddy406") {
      // data layer pass
    }
  };
  React.useEffect(
    () =>
      db
        .collection("info")
        .onSnapshot((snapshot) =>
          setUser(snapshot.docs.map((doc) => doc.data()))
        ),
    []
  );

  return (
    <div className="footer">
      <p>Copyright @ {user[0]?.name} All Rights Reserved</p>

      <p className="footer__admin" onClick={Admin}>
        Admin
      </p>
    </div>
  );
}

export default Footer;
