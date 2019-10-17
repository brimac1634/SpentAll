import React, { useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux'; 
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import ErrorBoundary from './components/error-boundary/error-boundary.component';
import Header from './components/header/header.component';
import Home from './pages/home/home.component';
import Loader from './components/loader/loader.component';
import Alert from './components/alert/alert.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { setAlert } from './redux/alert/alert.actions'; 
import { selectIsLoading, selectLoadingMessage } from './redux/loading/loading.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.scss';

const SignIn = lazy(() => import('./pages/sign-in/sign-in.component'))

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectIsLoading,
  loadingMessage: selectLoadingMessage
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()),
  setAlert: message => dispatch(setAlert(message))
})

const App = ({ setAlert, checkUserSession, currentUser, isLoading, loadingMessage }) => {

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession])

    useEffect(() => {
        if (currentUser) {
            const { displayName } = currentUser;
            setAlert(`Welcome, ${displayName}`)
        }
    }, [currentUser, setAlert])

    return (
      <div>
            <div>
                <ErrorBoundary>
                    <Suspense fallback={<Loader />}>
                        <Header />
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route 
                                exact 
                                path='/login' 
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
            </div>
            <Alert />
      </div>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

