import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import { useStream } from "../../libs/hooks/stream";
import { AccountsPagePresenter } from "../accounts";
import { BalancesPagePresenter } from "../balances";
import { GroupsPagePresenter } from "../groups";
import { HistoryPagePresenter } from "../history";
import { UnsolvedPage, SignInPage } from "../auth";
import { NotFoundPageView } from "../not-found";

export function CurrentPage(props) {
  const { userQueries } = props.dependencies;
  const isSignedIn = useStream(userQueries.isSignedInStream);

  return (
    <Switch>
      <Redirect exact from="/" to={isSignedIn ? "/i" : "/o"} />
      <Route path="/o">
        {isSignedIn && <Redirect to="/i" />}
        <OutPage {...props} />
      </Route>
      <Route path="/i">
        {!isSignedIn && <Redirect to="/o" />}
        <InPage {...props} />
      </Route>
      <Route path="/not-found">
        <NotFoundPageView />
      </Route>
      <Redirect to="/not-found" />
    </Switch>
  );
}

function InPage(props) {
  const { path } = useRouteMatch();
  const defaultInRoute = `${path}/accounts`;

  return (
    <Switch>
      <Route path={`${path}/accounts`}>
        <AccountsPagePresenter {...props} />
      </Route>
      <Route path={`${path}/balances`}>
        <BalancesPagePresenter {...props} />
      </Route>
      <Route path={`${path}/groups`}>
        <GroupsPagePresenter {...props} />
      </Route>
      <Route path={`${path}/history`}>
        <HistoryPagePresenter {...props} />
      </Route>
      <Redirect to={defaultInRoute} />
    </Switch>
  );
}

function OutPage(props) {
  const { userQueries } = props.dependencies;
  const authStatus = useStream(userQueries.authStatusStream);
  const isUnsolved = authStatus === "UNSOLVED";

  const { path } = useRouteMatch();
  const defaultOutRoute = `${path}/unsolved`;

  return (
    <Switch>
      <Route path={`${path}/unsolved`}>
        {!isUnsolved && <Redirect to={`${path}/sign-in`} />}
        <UnsolvedPage {...props} />
      </Route>
      <Route path={`${path}/sign-in`}>
        <SignInPage {...props} />
      </Route>
      <Redirect to={defaultOutRoute} />
    </Switch>
  );
}
