import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
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
  Typography,
  styled
} from '@material-ui/core';
import {
  EmailTwoTone,
  LaunchTwoTone,
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
    <PageWrapper>
      <PlainAppBar />
      <FormWrapper onSubmit={() => onSignIn(payload)}>
          <CardHeader title="Sign In" />
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
          <CardActionsStyled>
            <Button
              id="buttonSignIn"
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<LaunchTwoTone />}
            >
              Sign in
            </Button>
          </CardActionsStyled>
        </FormWrapper>
      <AppVersion>v{appVersion()}</AppVersion>
      <Loading isLoading={isLoading} />
    </PageWrapper>
  );
}

function PageWrapper (props) {
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

function FormWrapper ({ onSubmit, children }) {
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

const CardActionsStyled = styled(CardActions)({
  justifyContent: 'flex-end'
});

function AppVersion ({ children }) {
  return (
    <Box mt={2}>
      <Typography
        variant="caption"
        color="textSecondary"
      >
        {children}
      </Typography>
    </Box>
  );
}
