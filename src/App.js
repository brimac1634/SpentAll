import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';
import Home from './pages/home/home.component';
import Loader from './components/loader/loader.component';
import Alert from './components/alert/alert.component';

import { selectCurrentUser, selectUserError } from './redux/user/user.selectors';
import { setAlert } from './redux/alert/alert.actions'; 
import { selectIsLoading, selectLoadingMessage } from './redux/loading/loading.selectors';
import { fetchExpensesStart } from './redux/expenses/expenses.actions';
import { checkUserSession } from './redux/user/user.actions';

import './App.scss';

const SignIn = lazy(() => import('./pages/sign-in/sign-in.component'))
const Expenses = lazy(() => import('./pages/expenses/expenses.component'))
const ProfileSettings = lazy(() => import('./pages/profile-settings/profile-settings.component'))

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userError: selectUserError,
  isLoading: selectIsLoading,
  loadingMessage: selectLoadingMessage
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchExpenses: () => dispatch(fetchExpensesStart()),
  setAlert: message => dispatch(setAlert(message))
})

const App = ({ setAlert, checkUserSession, currentUser, isLoading, loadingMessage, history, fetchExpenses, userError }) => {
    useEffect(() => {
      checkUserSession();
    }, [checkUserSession])

    useEffect(()=>{
      if (currentUser) fetchExpenses();
    }, [fetchExpenses, currentUser])

    useEffect(()=>{
      if (userError) history.push('/welcome');
    }, [history, userError])

    useEffect(() => {
        if (currentUser) {
            const { userName } = currentUser;
            setAlert(`Welcome, ${userName}`)
        }
    }, [currentUser, setAlert])

    return (
      <div>
        <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Header />
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path='/analytics' component={Expenses}/>
                  <Route path='/settings' component={ProfileSettings}/>
                  <Route 
                      exact 
                      path='/welcome' 
                      render={() => 
                          currentUser ? (
                            <Redirect to={'/'}/>
                          ) : (
                            <SignIn />
                          )
                      }
                  />
                  <Redirect to='/' />
              </Switch>
            </Suspense>
        </ErrorBoundary>
        {isLoading &&
            <Loader fixed message={loadingMessage} />
        }
        <Alert />
      </div>
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

