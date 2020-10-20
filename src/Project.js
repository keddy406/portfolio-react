// TODO:BUTTON compnents
// TODO:redux api from firestore
// TODO:get admin token that can delete from db
// TODO:render wewbsite from db
// TODO:

import React from "react";
import db, { storage } from "./firebase";
// material ui

import DeleteIcon from "@material-ui/icons/Delete";

function Project({
  id,
  data: { description, githubUrl, img, name, url, language, imageName },
}) {
  const [user, setUser] = React.useState(true);
  //delete project from database and img from storage
  const deleteProject = () => {
    // database
    db.collection("projects")
      .doc(id)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
    // storage
    storage
      .ref("images")
      .child(imageName)
      .delete()
      .then(function () {
        // File deleted successfully
      })
      .catch(function (error) {
        // Uh-oh, an error occurred!
      });
  };
  // console.log(imageName);
  // console.log(storage.ref("images").child(imageName));
  return (
    <div className="project">
      <div className="project__container">
        <img className="project__image" src={img} alt="" />
        <div className="project__info">
          <h1>{name}</h1>
          <p>圖片名{imageName}</p>
          <DeleteIcon onClick={deleteProject} />
          {language &&
            Object.keys(language).map(
              (key, index) =>
                language[key] === true && <p key={index}>{`${key}`}</p>
            )}
        </div>
      </div>
    </div>
  );
}

export default Project;
