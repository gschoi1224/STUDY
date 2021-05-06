import React from 'react';
import { Route } from 'react-router-dom';
import loadable from '@loadable/component';

const LoginPage = loadable(() => import('./pages/LoginPage'));
const PostListPage = loadable(() => import('./pages/PostListPage'));
const PostPage = loadable(() => import('./pages/PostPage'));
const RegisterPage = loadable(() => import('./pages/RegisterPage'));
const WritePage = loadable(() => import('./pages/WritePage'));

const App = () => {
    return (
        <>
            <Route
                path={['/@:username', '/']}
                exact
                render={({ match }) => (
                    <PostListPage username={match.params.username} />
                )}
            />
            <Route component={LoginPage} path='/login' />
            <Route component={RegisterPage} path='/register' />
            <Route component={WritePage} path='/write' />
            <Route component={PostPage} path='/@:username/:postId' />
        </>
    );
};

export default App;
