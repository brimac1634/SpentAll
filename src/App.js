import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux'; 
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';
import Home from './pages/home/home.component';
import HoverBox from './components/hover-box/hover-box.component';
import ExpenseInputContainer from './components/expense-input/expense-input.container';
import Loader from './components/loader/loader.component';
import Alert from './components/alert/alert.component';

import { selectCurrentUser, selectUserError } from './redux/user/user.selectors';
import { setAlert } from './redux/alert/alert.actions'; 
import { selectIsLoading, selectLoadingMessage } from './redux/loading/loading.selectors';
import { fetchExpensesStart } from './redux/expenses/expenses.actions';
import { selectShowAddExpense } from './redux/expenses/expenses.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.scss';

const SignIn = lazy(() => import('./pages/sign-in/sign-in.component'))
const SignUp = lazy(() => import('./pages/sign-up/sign-up.component'))
const Analytics = lazy(() => import('./pages/analytics/analytics.component'))
const Expenses = lazy(() => import('./pages/expenses/expenses.component'))
const ProfileSettings = lazy(() => import('./pages/profile-settings/profile-settings.component'))

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  userError: selectUserError,
  isLoading: selectIsLoading,
  loadingMessage: selectLoadingMessage,
  showAddExpense: selectShowAddExpense
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchExpenses: () => dispatch(fetchExpensesStart()),
  setAlert: message => dispatch(setAlert(message))
})

const App = ({ setAlert, checkUserSession, currentUser, isLoading, loadingMessage, history, fetchExpenses, userError, showAddExpense }) => {
    useEffect(() => {
      checkUserSession();
    }, [checkUserSession])

    useEffect(()=>{
      if (userError) history.push('/welcome');
    }, [history, userError])

    useEffect(() => {
        if (currentUser) {
          fetchExpenses();
          const { userName } = currentUser;
          setAlert(`Welcome, ${userName}`)
        }
    }, [currentUser, fetchExpenses, setAlert])
    
    return (
      <div>
        <ErrorBoundary>
            <Suspense fallback={<Loader />}>
              <Header />
              <Switch>
                  <Route exact path='/' component={Home}/>
                  <Route path='/analytics' component={Analytics}/>
                  <Route path='/expenditures' component={Expenses}/>
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
                  <Route 
                    exact 
                    path='/register' 
                    render={() => 
                        currentUser ? (
                          <Redirect to={'/'}/>
                        ) : (
                          <SignUp />
                        )
                    }
                  />
                  <Redirect to='/' />
              </Switch>
              {
                currentUser &&
                <HoverBox show={showAddExpense}>
                  <ExpenseInputContainer />
                </HoverBox>
              }
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

