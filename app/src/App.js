import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import CreateProfile from './components/CreateProfile';

class App extends Component {
  render() {
    return (
        <Router>
            <Fragment>
                <div>
                    <Switch>
                        <Route component={CreateProfile} />
                        {/*<ProtectedRoute path='/' exact component={CreateProfile}*/}
                                        {/*isAuthenticated={this.props.authenticated}/>*/}
                        {/*<ProtectedRoute path='/question/:id' exact component={connect(mapStateToProps)(QuestionPoll)}*/}
                                        {/*isAuthenticated={this.props.authenticated}/>*/}
                        {/*<ProtectedRoute path='/question/:id/results'*/}
                                        {/*exact component={connect(mapStateToProps)(QuestionPollResults)}*/}
                                        {/*isAuthenticated={this.props.authenticated}/>*/}
                        {/*<ProtectedRoute path='/add' exact component={NewQuestion}*/}
                                        {/*isAuthenticated={this.props.authenticated}/>*/}
                        {/*<ProtectedRoute path='/leaderboard' exact component={Leaderboard}*/}
                                        {/*isAuthenticated={this.props.authenticated}/>*/}
                        {/*<Route path="/login" exact component={withRouter(Login)}/>*/}
                        {/*<Route path="/logout" exact component={withRouter(Logout)}/>*/}
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </Fragment>
        </Router>
    );
  }
}

export default App;
