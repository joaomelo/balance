import styled from 'styled-components';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { AccountsPagePresenter } from '../accounts';
import { BalancesPagePresenter } from '../balances';
import { HistoryPagePresenter } from '../history';
import { InPagesNavBar } from './in-pages-nav-bar';

export function InPagesLayout ({ dependencies }) {
  const { path } = useRouteMatch();
  const defaultInRoute = `${path}/accounts`;

  return (
    <LayoutWrapper>
      <InPagesNavBar />
      <StyledMain>
        <Switch>
          <Route path={`${path}/accounts`}>
            <AccountsPagePresenter dependencies={dependencies}/>
          </Route>
          <Route path={`${path}/balances`}>
            <BalancesPagePresenter dependencies={dependencies}/>
          </Route>
          <Route path={`${path}/history`}>
            <HistoryPagePresenter dependencies={dependencies}/>
          </Route>
          <Redirect to={defaultInRoute} />
        </Switch>
      </StyledMain>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--size-300);
`;

const StyledMain = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 var(--size-200);
`;
