import React from 'react';
import { BrowserRouter, Route, Switch, NavLink, Redirect } from 'react-router-dom';

import routes from './routes';

// components
import Login from './components/Login';
import E404 from './components/E404';
import Navbar from './components/Navbar';
import Channels from './components/Channels';
import Auth from './components/Auth';
import { ProvideAuth } from './helpers/auth-helper';
import Chat from './components/Chat';
import Register from './components/Register';

const App = () => {

    return (
        <div className="d-flex flex-column h-100">
            <BrowserRouter>
                <ProvideAuth>
                    <Navbar/>
                </ProvideAuth>
                <Switch>
                    <Route exact path={routes.mainPagePath()}>
                        <ProvideAuth>
                            <Auth/>
                        </ProvideAuth>
                        <h1>Main Page</h1>
                    </Route>
                    <Route path={routes.loginFormPath()}>
                        <ProvideAuth>
                            <Login/>
                        </ProvideAuth>
                    </Route>
                    <Route path={routes.registerPagePath()}>
                        <ProvideAuth>
                            <Register />
                        </ProvideAuth>
                    </Route>
                    <Route path={routes.channelsPagePath()}>
                        <ProvideAuth>
                            <Chat/>
                        </ProvideAuth>
                    </Route>
                    <Route path={routes.errorPagePath()}>
                        <E404/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
