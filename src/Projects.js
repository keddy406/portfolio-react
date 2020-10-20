import React from "react";
import Project from "./Project";
import ProjectInput from "./ProjectInput";

import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";

import db from "./firebase";
function Projects() {
  const user = useSelector(selectUser);
  const [projects, setProjects] = React.useState([]);
  // const [admin, setAdmin] = React.useState(true);
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
      {user && <ProjectInput />}
      {projects?.map(({ id, data }) => (
        <Project key={id} id={id} data={data} />
      ))}
      {/* <Project />
      <Project /> */}
    </div>
  );
}

export default Projects;
