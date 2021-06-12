import { useState } from 'react';
import {
  AppBar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  EmailTwoTone,
  VpnKeyTwoTone,
  VisibilityTwoTone,
  VisibilityOffTwoTone
} from '@material-ui/icons';
import { createErrorReport } from '../../../app/error';
import { appName, appVersion } from '../../../app/helpers';
import { Loading, Form, ErrorMessage, usePayload } from '../../../app/components';

export function SignInPageView ({ onSignIn, error, isLoading }) {
  const initialPayload = { email: '', password: '' };
  const { payload, bind } = usePayload(initialPayload);

  const errorReport = createErrorReport(error, {
    email: 'AUTH/EMAIL_INVALID',
    password: 'AUTH/PASSWORD_INVALID'
  });

  return (
    <SignInPage>
      <PlainAppBar />
      <SignInWrapper onSubmit={() => onSignIn(payload)}>
          <CardHeader
            title="Sign In"
            titleTypographyProps={{ align: 'center' }}
          />
          <Divider />
          <CardContent>
            <EmailField
              {...bind('email')}
              errorCode={errorReport.email}
            />
            <PasswordField
              {...bind('password')}
              errorCode={errorReport.password}
            />
            <ErrorMessage code={errorReport.escaped}/>
          </CardContent>
          <Divider />
          <CardActions>
            <Button />
          </CardActions>
        </SignInWrapper>
      <p>v{appVersion()}</p>

      <Loading isLoading={isLoading} />
    </SignInPage>
  );
}

function SignInPage (props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
      {...props}
    />
  );
}

function SignInWrapper ({ onSubmit, children }) {
  return (
    <Form onSubmit={onSubmit}>
      <Container maxWidth="xs">
        <Card>
          { children }
        </Card>
      </Container>
    </Form>
  );
}

function PlainAppBar () {
  return (
    <AppBar>
      <Toolbar>
        <Typography
          component="h1"
          variant="h6"
        >
          {appName().toUpperCase()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

function EmailField ({ errorCode, ...rest }) {
  const EmailAdornment = () => (
    <InputAdornment position="start">
      <EmailTwoTone />
    </InputAdornment>
  );

  return (
    <TextField
      id="inputEmail"
      label="Email"
      variant="outlined"
      type="email"
      fullWidth
      margin="normal"
      required
      error={!!errorCode}
      helperText={errorCode}
      inputProps={{ 'data-error': errorCode }}
      InputProps={{ startAdornment: <EmailAdornment /> }}
      {...rest}
    />
  );
}

function PasswordField ({ errorCode, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const onToggle = () => setShowPassword(state => !state);

  const PasswordToggleAdornment = ({ onClick }) => (
    <InputAdornment position="end">
      <IconButton onClick={onClick}>
        { showPassword ? <VisibilityTwoTone /> : <VisibilityOffTwoTone /> }
      </IconButton>
    </InputAdornment>
  );

  const PasswordInfoAdornment = () => (
    <InputAdornment position="start">
      <VpnKeyTwoTone />
    </InputAdornment>
  );

  return (
    <TextField
      id="inputPassword"
      label="Password"
      variant="outlined"
      type={showPassword ? 'text' : 'password'}
      fullWidth
      margin="normal"
      required
      helperText={errorCode}
      inputProps={{ 'data-error': errorCode }}
      InputProps={{
        startAdornment: <PasswordInfoAdornment />,
        endAdornment: <PasswordToggleAdornment onClick={onToggle}/>
      }}
      {...rest}
    />
  );
}

function Button () {
  return (
    <button
      id="buttonSignIn"
      type="submit"
    >
      Sign in
    </button>
  );
}
