import React, { useEffect, lazy, Suspense, useState } from 'react';
import { connect } from 'react-redux'; 
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';
import User from './pages/user/user.component';
import HoverBox from './components/hover-box/hover-box.component';
import ExpenseInputContainer from './components/expense-input/expense-input.container';
import Loader from './components/loader/loader.component';
import Alert from './components/alert/alert.component';

import { selectCurrentUser, selectIsUserFetching } from './redux/user/user.selectors';
import { setAlert } from './redux/alert/alert.actions'; 
import { fetchExpensesStart, toggleAddExpense } from './redux/expenses/expenses.actions';
import { selectShowAddExpense, selectExpenseIsLoading } from './redux/expenses/expenses.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.scss';

const Welcome = lazy(() => import('./pages/welcome/welcome.component'))
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy/privacy-policy.component'))

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isUserLoading: selectIsUserFetching,
  isExpenseLoading: selectExpenseIsLoading,
  showAddExpense: selectShowAddExpense
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchExpenses: () => dispatch(fetchExpensesStart()),
  setAlert: message => dispatch(setAlert(message)),
  toggleAddExpense: () => dispatch(toggleAddExpense())
})

const App = ({ setAlert, checkUserSession, currentUser, isExpenseLoading, fetchExpenses, showAddExpense, isUserLoading, toggleAddExpense }) => {
  const [isFetchingUser, setIsFetchingUser] = useState(true);
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession])

  useEffect(() => {
    if (currentUser) {
      fetchExpenses();
      const { userName } = currentUser;
      setAlert(`Welcome, ${userName}`)
    }
  }, [currentUser, fetchExpenses, setAlert])

  useEffect(()=>{
    if (!isUserLoading) setIsFetchingUser(false);
  }, [isUserLoading, setIsFetchingUser])
  
  return (
    <div>
      {
        isFetchingUser
          ? <Loader logo fixed />
          : <div>
              <Header />
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <Switch>
                      <Route 
                        path='/user' 
                        render={()=>
                          currentUser ? (
                            <User />
                          ) : (
                            <Redirect to={'/welcome'}/>
                          )
                        }/>
                      <Route path='/privacy-policy' component={PrivacyPolicy}/>
                      <Route 
                          path='/welcome' 
                          render={() => 
                              currentUser ? (
                                <Redirect to={'/account'}/>
                              ) : (
                                <Welcome />
                              )
                          }
                      />
                      <Redirect to='/user' />
                  </Switch>
                  {
                    currentUser &&
                    <HoverBox show={showAddExpense} backgroundClick={toggleAddExpense}>
                      <ExpenseInputContainer />
                    </HoverBox>
                  }
                </Suspense>
              </ErrorBoundary>
              {isExpenseLoading || isUserLoading
                ?  <Loader fixed />
                :  null
              }
              <Alert />
            </div>
      }
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

