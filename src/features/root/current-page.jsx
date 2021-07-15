import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { AccountsPagePresenter } from '../accounts';
import { BalancesPagePresenter } from '../balances';
import { GroupsPagePresenter } from '../groups';
import { HistoryPagePresenter } from '../history';
import { SignInPagePresenter } from '../auth';
import { NotFoundPageView } from '../not-found';

export function CurrentPage ({ isSignedIn, ...rest }) {
  return (
    <Switch>
      <Redirect exact from="/" to={isSignedIn ? '/i' : '/o'} />
      <Route path='/o'>
        { isSignedIn && <Redirect to="/i" /> }
        <OutPage {...rest} />
      </Route>
      <Route path="/i">
        { !isSignedIn && <Redirect to="/o" /> }
        <InPage {...rest} />
      </Route>
      <Redirect to='/o/not-found' />
    </Switch>
  );
}

function InPage (props) {
  const { path } = useRouteMatch();
  const defaultInRoute = `${path}/accounts`;

  return (
    <Switch>
      <Route path={`${path}/accounts`}>
        <AccountsPagePresenter {...props}/>
      </Route>
      <Route path={`${path}/balances`}>
        <BalancesPagePresenter {...props}/>
      </Route>
      <Route path={`${path}/groups`}>
        <GroupsPagePresenter {...props}/>
      </Route>
      <Route path={`${path}/history`}>
        <HistoryPagePresenter {...props}/>
      </Route>
      <Redirect to={defaultInRoute} />
    </Switch>
  );
}

function OutPage (props) {
  const { path } = useRouteMatch();
  const defaultOutRoute = `${path}/sign-in`;

  return (
    <Switch>
      <Route path={`${path}/sign-in`}>
        <SignInPagePresenter {...props}/>
      </Route>
      <Route path={`${path}/not-found`}>
        <NotFoundPageView />
      </Route>
      <Redirect to={defaultOutRoute} />
    </Switch>
  );
}
