import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { SignInPagePresenter } from '../auth';

export function OutPagesLayout ({ dependencies }) {
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
