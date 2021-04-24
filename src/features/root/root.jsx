import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from 'react-router-dom';
import { useGetter } from '../../app/store';
import { GlobalStyles } from '../../app/styles';
import { NotFound } from '../not-found';
import { SignInPresenter } from '../auth';
import { ArcsPresenter } from '../arcs';
import { ChallengesPresenter } from '../challenges';

export function Root ({ dependencies }) {
  const { authStore } = dependencies;
  const isSignedIn = useGetter(authStore, 'isSignedIn');

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
            <InPages dependencies={dependencies} />
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
        <SignInPresenter dependencies={dependencies}/>
      </Route>
      <Redirect to={defaultOutRoute} />
    </Switch>
  );
}

function InPages ({ dependencies }) {
  const { path } = useRouteMatch();
  const defaultInRoute = `${path}/arcs`;

  return (
    <Switch>
      <Route path={`${path}/arcs/:arcId/challenges`}>
        <ChallengesPresenter dependencies={dependencies}
        />
      </Route>
      <Route path={`${path}/arcs`}>
        <ArcsPresenter dependencies={dependencies}/>
      </Route>
      <Redirect to={defaultInRoute} />
    </Switch>
  );
}
