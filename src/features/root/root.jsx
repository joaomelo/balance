import { BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useQuery } from '../../app/query';
import { GlobalStyles } from '../../app/styles';
import { NotFound } from '../not-found';
import { SignInPagePresenter } from '../auth';
import { InPagesLayout } from './in-pages-layout';

export function Root ({ dependencies }) {
  const { isSignedInSelector } = dependencies;
  const isSignedIn = useQuery(isSignedInSelector);

  return (
    <>
      <Router >
        <Switch>
          <Redirect exact from="/" to={isSignedIn ? '/i' : '/o'} />
          <Route path='/o'>
            { isSignedIn && <Redirect to="/i" /> }
            <OutPages dependencies={dependencies} />
          </Route>
          <Route path="/i">
            { !isSignedIn && <Redirect to="/o" /> }
            <InPagesLayout dependencies={dependencies} />
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>
          <Redirect to='/not-found' />
        </Switch>
      </Router>
      <GlobalStyles />
    </>
  );
}

function OutPages ({ dependencies }) {
  const { path } = useRouteMatch();
  const defaultOutRoute = `${path}/sign-in`;

  return (
    <Switch>
      <Route path={`${path}/sign-in`}>
        <SignInPagePresenter dependencies={dependencies}/>
      </Route>
      <Redirect to={defaultOutRoute} />
    </Switch>
  );
}
