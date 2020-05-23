import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Layout from '../../components/Layout';
import RacePage from '../RacePage';
import LoginPage from '../LoginPage';
import ListPage from '../ListPage';
import {PrivateRoute} from '../../components/PrivateRoute';

// default themes
import theme from './Theme';

const App = () => {
  const RacePageRedirect = () => <Redirect to="/list" />;
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Layout>
          <Switch>
            <Route exact path="/" component={RacePageRedirect} />
            <PrivateRoute exact path="/game" component={RacePage} />
            <PrivateRoute exact path="/list" component={ListPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </Layout>
      </React.Fragment>
    </ThemeProvider>
  );
}

const mapStateToProps = state => {
  return {
    store: state.global,
    location: state.router,
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
)(App);