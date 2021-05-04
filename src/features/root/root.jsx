import { BrowserRouter as Router, Link, Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { useSelector } from '../../app/store';
import { GlobalStyles } from '../../app/styles';
import { NotFound } from '../not-found';
import { SignInPagePresenter } from '../auth';
import { AccountsPagePresenter } from '../accounts';
import { BalancesPagePresenter } from '../balances';

export function Root ({ dependencies }) {
  const { identityService } = dependencies;
  const isSignedIn = useSelector(identityService, 'isSignedIn');

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
        <SignInPagePresenter dependencies={dependencies}/>
      </Route>
      <Redirect to={defaultOutRoute} />
    </Switch>
  );
}

function InPages ({ dependencies }) {
  const { path } = useRouteMatch();
  const defaultInRoute = `${path}/accounts`;

  return (
    <>
      <NavBar />
      <Switch>
        <Route path={`${path}/accounts`}>
          <AccountsPagePresenter dependencies={dependencies}/>
        </Route>
        <Route path={`${path}/balances`}>
          <BalancesPagePresenter dependencies={dependencies}/>
        </Route>
        <Redirect to={defaultInRoute} />
      </Switch>
    </>
  );
}

function NavBar () {
  return (
    <>
      <nav>
        <Link to="/i/accounts" >Accounts</Link>
        <span> | </span>
        <Link to="/i/balances" >Balances</Link>
      </nav>
      <hr />
    </>
  );
}
