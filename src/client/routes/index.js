import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import  { connect } from 'react-redux';

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";

import HomePage from './HomePage';

import MainLayout from '../components/MainLayout';





class AppRoutes extends React.Component {



  render() {

    return (
      <Router>
      <Switch>
      <Route exact path="/" component={HomePage}/>

          <MainLayout>

          </MainLayout>

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
