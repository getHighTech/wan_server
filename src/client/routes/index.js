import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import  { connect } from 'react-redux';

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import HomePage from './HomePage';
import WechatChecker from './WechatChecker';
import NotFound from './NotFound';

import MainLayout from '../components/MainLayout';





class AppRoutes extends React.Component {


  isWeChat(){
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
  }
  componentDidMount(){
    if(this.isWeChat())
    {
      alert("这是微信端");
    }
  }



  render() {

    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>


              {
                this.isWeChat() &&
                <div>
                  <Route exact path="/wechat_checker" component={WechatChecker}/>
                  <Route exact path="/wechat_checker/:openid" component={WechatChecker}/>
                </div>

              }

            <MainLayout>
              <Route exact path="/404" component={NotFound}/>
              <Route component={NotFound}/>

            </MainLayout>
            <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}



function mapToState(state){
  return {
      open: state.AppReducer.sideBarOpen,
      anchor: state.AppReducer.anchor,
  }
}

export default connect(mapToState)(AppRoutes);
