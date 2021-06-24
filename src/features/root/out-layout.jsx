import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { SignInPagePresenter } from '../auth';
import { WrapperLayout } from './wrapper-layout';
import { WrapperPage } from './wrapper-page';
import { OutAppBar } from './out-app-bar';
import { AppVersion } from './app-version';

export function OutLayout (props) {
  return (
    <WrapperLayout>
      <OutAppBar />
      <WrapperPage>
        <CurrentPage {...props}/>
      </WrapperPage>
      <AppVersion />
    </WrapperLayout>
  );
}

function CurrentPage (props) {
  const { path } = useRouteMatch();
  const defaultOutRoute = `${path}/sign-in`;

  return (
    <Switch>
      <Route path={`${path}/sign-in`}>
        <SignInPagePresenter {...props}/>
      </Route>
      <Redirect to={defaultOutRoute} />
    </Switch>
  );
}
