import React from "react";

import db from "./firebase";
function Footer() {
  const [user, setUser] = React.useState([]);
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

      <p className="footer__admin">Admin</p>
    </div>
  );
}

export default Footer;
