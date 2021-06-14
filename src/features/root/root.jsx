import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LuxonUtils from '@date-io/luxon';
import { MuiStyles } from '../../app/styles';
import { useQuery } from '../../app/query';
import { NotFound } from '../not-found';
import { InPagesLayout } from './in-pages-layout';
import { OutPagesLayout } from './out-pages-layout';

export function Root ({ dependencies }) {
  const { isSignedInSelector } = dependencies;
  const isSignedIn = useQuery(isSignedInSelector);

  return (
    <MuiStyles>
      <MuiPickersUtilsProvider utils={LuxonUtils}>
        <Router >
          <Switch>
            <Redirect exact from="/" to={isSignedIn ? '/i' : '/o'} />
            <Route path='/o'>
              { isSignedIn && <Redirect to="/i" /> }
              <OutPagesLayout dependencies={dependencies} />
            </Route>
            <Route path="/i">
              { !isSignedIn && <Redirect to="/o" /> }
              <InPagesLayout dependencies={dependencies} />
            </Route>
            <Route path="/not-found">
              <NotFound />
            </Route>
            <Redirect to='/not-found' />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </MuiStyles>
  );
}
