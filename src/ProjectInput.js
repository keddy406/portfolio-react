import React from "react";
import db, { storage } from "./firebase";
import firebase from "firebase";
import { Button } from "@material-ui/core";
import { LanguageTwoTone } from "@material-ui/icons";
function ProjectInput() {
  const [admin, setAdmin] = React.useState(true);

  // upload
  const [name, setName] = React.useState("");
  const [caption, setCaption] = React.useState("");
  const [githubUrl, setGithubUrl] = React.useState("");
  const [websiteUrl, setWebsiteUrl] = React.useState("");

  const [progress, setProgress] = React.useState(0);

  const [image, setImage] = React.useState(null);

  //   set Languages....
  const languageDefault = {
    React: false,
    Js: false,
    Css: false,
    Firebase: false,
    Context: false,
    Redux: false,
    NodeJs: false,
    Strapi: false,
  };
  const [language, setLanguage] = React.useState(languageDefault);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = (e) => {
    e.preventDefault();
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
              imageName: image.name,
              // username: username,
            });
            setProgress(0);
            setCaption("");
            setLanguage(languageDefault);
            setName("");
            setWebsiteUrl("");
            setGithubUrl("");
            setImage(null);
          });
      }
    );
  };

  //   console.log("Js:", UseJs);
  return (
    <div className="projectInput">
      <progress className="imageupload_progress" value={progress} max="100" />

      <div className="upload__info">
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
      </div>
      <form>
        <input type="file" onChange={handleChange} />

        <div className="upload__language">
          <p>勾選使用語言</p>
          {/* checkbox React 1*/}
          <input
            type="checkbox"
            onChange={(e) =>
              setLanguage({
                ...language,
                React: !language.React,
              })
            }
            value={language}
            checked={language.React}
          />
          <label for="React">使用React</label>
          {/* checkbox Js 2 */}
          <input
            type="checkbox"
            onChange={(e) =>
              setLanguage({
                ...language,

                Js: !language.Js,
              })
            }
            value={language}
            checked={language.Js}
          />
          <label for="使用Javascript">使用Javascript</label>
          {/* checkbox Css 3 */}
          <input
            type="checkbox"
            onChange={(e) =>
              setLanguage({
                ...language,

                Css: !language.Css,
              })
            }
            value={language}
            checked={language.Css}
          />
          <label for="使用Css">使用Css</label>
          {/* checkbox Firebase 4 */}
          <input
            type="checkbox"
            onChange={(e) =>
              setLanguage({
                ...language,

                Firebase: !language.Firebase,
              })
            }
            value={language}
            checked={language.Firebase}
          />
          <label for="Firebase">使用Firebase</label>
          {/* checkbox Context 5 */}
          <input
            type="checkbox"
            onChange={(e) =>
              setLanguage({
                ...language,

                Context: !language.Context,
              })
            }
            value={language}
            checked={language.Context}
          />
          <label for="Context">使用Context</label>
          {/* checkbox Redux 6 */}
          <input
            type="checkbox"
            onChange={(e) =>
              setLanguage({
                ...language,

                Redux: !language.Redux,
              })
            }
            value={language}
            checked={language.Redux}
          />
          <label for="Redux">使用Redux</label>
          {/* checkbox NodeJs 7 */}
          <input
            type="checkbox"
            onChange={(e) =>
              setLanguage({
                ...language,

                NodeJs: !language.NodeJs,
              })
            }
            value={language}
            checked={language.NodeJs}
          />
          <label for="NodeJs">使用NodeJs</label>
          {/* checkbox Strapi 8 */}
          <input
            type="checkbox"
            onChange={(e) =>
              setLanguage({
                ...language,

                Strapi: !language.Strapi,
              })
            }
            value={language}
            checked={language.Strapi}
          />
          <label for="Strapi">使用Strapi</label>
        </div>
        <div className="upload__url">
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
        </div>
        <Button className="upload__button" onClick={handleUpload}>
          Upload
        </Button>
      </form>
    </div>
  );
}

export default ProjectInput;
