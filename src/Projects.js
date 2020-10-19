import React from "react";
import db, { storage } from "./firebase";
import Project from "./Project";
import firebase from "firebase";
import ProjectInput from "./ProjectInput";
import { Button } from "@material-ui/core";
function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [admin, setAdmin] = React.useState(true);
  React.useEffect(
    () =>
      db
        .collection("projects")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setProjects(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        ),
    []
  );

  return (
    <div className="projects">
      {admin && <ProjectInput />}
      {projects?.map(({ id, data }) => (
        <Project key={id} id={id} data={data} />
      ))}
      {/* <Project />
      <Project /> */}
    </div>
  );
}

export default Projects;
