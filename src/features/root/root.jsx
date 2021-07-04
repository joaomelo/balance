import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MuiProvider } from '../../app/mui';
import { useQuery } from '../../app/query';
import { NotFound } from '../not-found';
import { LayoutIn } from './layout-in';
import { LayoutOut } from './layout-out';

export function Root ({ dependencies }) {
  const { isSignedInSelector } = dependencies;
  const isSignedIn = useQuery(isSignedInSelector);

  return (
    <MuiProvider>
      <Router >
        <Switch>
          <Redirect exact from="/" to={isSignedIn ? '/i' : '/o'} />
          <Route path='/o'>
            { isSignedIn && <Redirect to="/i" /> }
            <LayoutOut dependencies={dependencies} />
          </Route>
          <Route path="/i">
            { !isSignedIn && <Redirect to="/o" /> }
            <LayoutIn dependencies={dependencies} />
          </Route>
          <Route path="/not-found">
            <NotFound />
          </Route>
          <Redirect to='/not-found' />
        </Switch>
      </Router>
    </MuiProvider>
  );
}
