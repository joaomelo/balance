import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { AccountsPagePresenter } from '../accounts';
import { BalancesPagePresenter } from '../balances';
import { GroupsPagePresenter } from '../groups';
import { HistoryPagePresenter } from '../history';
import { WrapperLayout } from './wrapper-layout';
import { WrapperPage } from './wrapper-page';
import { AppBarIn } from './app-bar-in';

export function LayoutIn (props) {
  return (
    <WrapperLayout id="wrapper-layout">
      <AppBarIn {...props}/>
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
