import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import CreateProfile from './components/CreateProfile';
import ProfileContainer from './containers/ProfileContainer';

const App = () => {
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route path="/" exact component={CreateProfile}/>
          <Route path="/armory/wow/profile/:id?" component={ProfileContainer}/>
          <Route component={PageNotFound}/>
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
