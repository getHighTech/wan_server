import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Gun from 'gun/gun';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class Creeper extends React.Component {
  constructor(props){
    super(props);
    this.gun = new Gun(['http://jiangshan.ml:8083/gun']);
    this.gun.get('mark').put({
      name: "Mark",
      email: "mark@gunDB.io",
    });

  }
  componentDidMount(){
    this.gun.get('mark').on(function(data, key){
      console.log("update:", data);
    });
  }
  render(){
    const { classes, movie } = this.props;
      return (<div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          title={"title"}
        />
        <CardContent>

          <Typography variant="title">
          title
          </Typography>
          <Typography gutterBottom variant="subheading">
            actor
          </Typography>
        </CardContent>

      </Card>
    </div>)
  }

}

Creeper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Creeper);
