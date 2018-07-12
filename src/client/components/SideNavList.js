import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';


import { HashRouter as Router, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { APP_SWITCH_SIDEBAR } from '../actions/app';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  
});

class SideNavList extends React.Component {


  handleClick= () => {
      const { dispatch } = this.props;
      dispatch({
          type: APP_SWITCH_SIDEBAR
      });
  }


  render() {
    const {classes } = this.props;
    const testIcon = {
        icon: <InboxIcon />,
    }
    return (
      <List className={classes.root}>
        <Router>
            <div>
            <NavLink  exact to="/orders" style={{textDecoration: 'none'}}>

            <ListItem button   >
            
                <ListItemIcon>
                    {testIcon.icon}
                </ListItemIcon>
            
                <ListItemText primary="订单管理" />
            
            </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/番号" style={{textDecoration: 'none'}}>

                <ListItem button   >
                <ListItemIcon>
                    <StarIcon />
                </ListItemIcon>
                <ListItemText primary="用户管理" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/站长推荐" style={{textDecoration: 'none'}}>

                <ListItem button   >
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="财务管理" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/站长推荐" style={{textDecoration: 'none'}}>

                <ListItem button   >
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="微信账户管理" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/美剧" style={{textDecoration: 'none'}}>

                <ListItem button   >
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="用户管理" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/英剧" style={{textDecoration: 'none'}}>

                <ListItem button   >
                    <ListItemIcon>
                        <MailIcon />
                    </ListItemIcon>
                    <ListItemText primary="文章管理" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/动漫" style={{textDecoration: 'none'}}>

                <ListItem button   >
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="推送消息管理" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/动漫" style={{textDecoration: 'none'}}>

                <ListItem button   >
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="店铺管理" />
                </ListItem>
            </NavLink>
            <NavLink  exact to="/tags/动漫" style={{textDecoration: 'none'}}>

            <ListItem button   >
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="商品管理" />
            </ListItem>
            </NavLink>

            <NavLink  exact to="/tags/动漫" style={{textDecoration: 'none'}}>

            <ListItem button   >
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="角色管理" />
            </ListItem>
            </NavLink>

            <NavLink  exact to="/tags/动漫" style={{textDecoration: 'none'}}>

            <ListItem button   >
            <ListItemIcon>
                <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="积分管理" />
            </ListItem>
            </NavLink>

            </div>
        </Router>
           
            </List>
    );
  }
}

SideNavList.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapToState(state){
    return {
        open: state.AppReducer.sideBarOpen,
        locked: state.MoviesReducer.loading,
    }
}

export default connect(mapToState)(withStyles(styles, { withTheme: true })(SideNavList));