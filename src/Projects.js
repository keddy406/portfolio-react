import React from "react";
import db, { storage } from "./firebase";
import Project from "./Project";
import firebase from "firebase";
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
  // upload
  const [name, setName] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [githubUrl, setGithubUrl] = React.useState("");
  const [websiteUrl, setWebsiteUrl] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [progress, setProgress] = React.useState(0);

  const [image, setImage] = React.useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // completed function
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // post image inside db
            db.collection("projects").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              description: caption,
              img: url,
              githubUrl,
              url: websiteUrl,
              name,
              language,
              // username: username,
            });
            setProgress(0);
            setCaption("");
            setLanguage("");
            setName("");
            setLanguage("");
            setWebsiteUrl("");
            setGithubUrl("");
            setImage(null);
          });
      }
    );
  };

  //

  return (
    <div className="projects">
      {admin && (
        <div className="imageupload">
          <progress
            className="imageupload_progress"
            value={progress}
            max="100"
          />
          <input
            type="text"
            placeholder="輸入作品名"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            placeholder="輸入敘述"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          />
          <input
            type="text"
            placeholder="輸入使用語言"
            onChange={(e) => setLanguage(e.target.value)}
            value={language}
          />
          <input
            type="text"
            placeholder="輸入網站網址"
            onChange={(e) => setWebsiteUrl(e.target.value)}
            value={websiteUrl}
          />
          <input
            type="text"
            placeholder="輸入Github網址"
            onChange={(e) => setGithubUrl(e.target.value)}
            value={githubUrl}
          />
          <input type="file" onChange={handleChange} />
          <Button onClick={handleUpload}>Upload</Button>
        </div>
      )}
      {projects?.map(({ id, data }) => (
        <Project key={id} id={id} data={data} />
      ))}
      {/* <Project />
      <Project /> */}
    </div>
  );
}

export default Projects;
