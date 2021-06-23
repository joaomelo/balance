import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { AccountsPagePresenter } from '../accounts';
import { BalancesPagePresenter } from '../balances';
import { HistoryPagePresenter } from '../history';
import { WrapperLayout } from './wrapper-layout';
import { WrapperPage } from './wrapper-page';
import { InAppBar } from './in-app-bar';

export function InLayout (props) {
  return (
    <WrapperLayout id="wrapper-layout">
      <InAppBar {...props}/>
      <WrapperPage id="wrapper-page">
        <CurrentPage {...props}/>
      </WrapperPage>
    </WrapperLayout>
  );
}

function CurrentPage (props) {
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
      <Route path={`${path}/history`}>
        <HistoryPagePresenter {...props}/>
      </Route>
      <Redirect to={defaultInRoute} />
    </Switch>
  );
}
