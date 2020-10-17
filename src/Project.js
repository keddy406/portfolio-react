// TODO:BUTTON compnents
// TODO:redux api from firestore
// TODO:get admin token that can delete from db
// TODO:render wewbsite from db
// TODO:

import React from "react";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    maxHeight: 800,
    height: 500,
  },
});
function Project({ id, data: { description, githubUrl, img, name, url } }) {
  const classes = useStyles();
  const [user, setUser] = React.useState(true);

  const deleteProject = () => {
    //   delete project from redux
  };

  return (
    <div className="project">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className="project__image"
            component="img"
            alt="Contemplative Reptile"
            image={img}
            title="造訪網站"
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button size="small" className="project__button">
            Github
          </Button>
          <Button size="small" className="project__button">
            React.js
          </Button>
          <Button size="small" className="project__button">
            Javascript
          </Button>
          <Button size="small" className="project__button">
            Css
          </Button>
          <Button size="small" className="project__button">
            Firebase
          </Button>
          <Button size="small" className="project__button">
            material ui
          </Button>
        </CardActions>
      </Card>
      {user && (
        <DeleteIcon className="project__delete" onClick={() => deleteProject} />
      )}
    </div>
  );
}

export default Project;
