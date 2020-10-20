import React from "react";
import db from "./firebase";

function Home() {
  return (
    <div className="home">
      <p>1.前端使用React</p>
      <p>2.後端使用Firebase</p>
      <p>3.使用React-router-dom 來實現render不同頁面不重新整理</p>
      <p>4.使用Redux 來實現Admin 登入後的project新增跟刪除</p>
      <p>TODO:UI美化</p>
      <p>
        TODO:single project:title, info, time, redirect url /github ,languages
      </p>
      <p>TODO:loading img while page is loading</p>
    </div>
  );
}

export default Home;
