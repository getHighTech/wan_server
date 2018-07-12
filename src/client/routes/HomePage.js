import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import  { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {isWeChat, logWechat} from '../actions/wechat.js';
import {getStore} from '../actions/localStore.js';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 2,
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

class HomePage extends React.Component {

  componentDidMount(){

    if(isWeChat()){
      // alert(getStore("openid"));
      if(!getStore("openid")){
        logWechat(this.props.history);
      }
    }
  }



  render(){
    const { classes } = this.props;

    return (
        <div className={classes.root}>
         <Typography variant="headline" gutterBottom>乐多多营销解决方案</Typography>
            <Divider light />

        <Divider light />

        </div>
      );

  }


}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapToState(state){
    return {
        tag: state.MoviesReducer.tag
      }
}

export default connect(mapToState)(withStyles(styles)(HomePage));
