import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import  { connect } from 'react-redux';

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import HomePage from './HomePage.js';
import WechatChecker from './WechatChecker.js';
import NotFound from './NotFound.js';

import MainLayout from '../components/MainLayout.js';
import WeChatCharge from '../components/WeChatCharge.js';
// import {history} from "react-router"
import {getStore} from '../actions/localStore.js';




class AppRoutes extends React.Component {

  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>


          <MainLayout>
            <Switch>
            <Route exact path="/wechat_checker" component={WechatChecker}/>
            <Route exact path="/wechat_checker/:openid" component={WechatChecker}/>
            <Route exact path="/wechat/charge" component={WeChatCharge}/>

            <Route exact path="/404" component={NotFound}/>

            <Route component={NotFound}/>
            </Switch>

          </MainLayout>

        </Switch>
      </Router>
    );
  }
}



function mapToState(state){
  return {
      open: state.AppReducer.sideBarOpen,
      openid: state.AppReducer.openid,
      anchor: state.AppReducer.anchor,
  }
}

export default connect(mapToState)(AppRoutes);
