import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PageNotFound from '../pages/PageNotFound';
import CreateProfile from '../pages/CreateProfile';
import ProfileContainer from '../pages/ProfileContainer';

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
