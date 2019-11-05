import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux'; 
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';
import Account from './pages/account/account.component';
import HoverBox from './components/hover-box/hover-box.component';
import ExpenseInputContainer from './components/expense-input/expense-input.container';
import Loader from './components/loader/loader.component';
import Alert from './components/alert/alert.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { setAlert } from './redux/alert/alert.actions'; 
import { selectIsLoading, selectLoadingMessage } from './redux/loading/loading.selectors';
import { fetchExpensesStart } from './redux/expenses/expenses.actions';
import { selectShowAddExpense } from './redux/expenses/expenses.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.scss';

const Welcome = lazy(() => import('./pages/welcome/welcome.component'))
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy/privacy-policy.component'))

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsLoading,
  loadingMessage: selectLoadingMessage,
  showAddExpense: selectShowAddExpense
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  fetchExpenses: () => dispatch(fetchExpensesStart()),
  setAlert: message => dispatch(setAlert(message))
})

const App = ({ setAlert, checkUserSession, currentUser, isLoading, loadingMessage, fetchExpenses, showAddExpense }) => {
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
    
    return (
      <div>
        <ErrorBoundary>
          <Header />
          <Suspense fallback={<Loader />}>
            <Switch>
                <Route 
                  path='/account' 
                  render={()=>
                    currentUser ? (
                      <Account />
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
                <Redirect to='/welcome' />
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

