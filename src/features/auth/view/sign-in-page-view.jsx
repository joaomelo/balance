import styled from 'styled-components';
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
  Typography
} from '@material-ui/core';
import {
  EmailTwoTone,
  LaunchTwoTone,
  VpnKeyTwoTone,
  VisibilityTwoTone,
  VisibilityOffTwoTone
} from '@material-ui/icons';
import {
  usePayload,
  useToggle,
  Form,
  ErrorAlert,
  ProgressDivider
} from '../../../app/components';
import { createErrorReport } from '../../../app/error';
import { appName, appVersion } from '../../../app/helpers';

export function SignInPageView ({ onSignIn, error, isLoading, t }) {
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
              error={t(errorReport.email)}
            />
            <PasswordField
              {...bind('password')}
              error={t(errorReport.password)}
            />
            <ErrorAlert>{t(errorReport.escaped)}</ErrorAlert>
          </CardContent>
          <ProgressDivider isLoading={isLoading}/>
          <CardActionsStyled>
            <Button
              id="buttonSignIn"
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<LaunchTwoTone />}
              disabled={isLoading}
            >
              Sign in
            </Button>
          </CardActionsStyled>
        </FormWrapper>
      <AppVersion>v{appVersion()}</AppVersion>
    </PageWrapper>
  );
}

function PageWrapper (props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      {...props}
    />
  );
}

function PlainAppBar () {
  return (
    <AppBar position="sticky">
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
      <Box mt={4}>
        <Container maxWidth="xs">
          <Card>
            { children }
          </Card>
        </Container>
      </Box>
    </Form>
  );
}

function EmailField ({ error, ...rest }) {
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
      error={!!error}
      helperText={error}
      InputProps={{ startAdornment: <EmailAdornment /> }}
      {...rest}
    />
  );
}

function PasswordField ({ error, ...rest }) {
  const [showPassword, toggleShowPassword] = useToggle();

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
      error={!!error}
      helperText={error}
      InputProps={{
        startAdornment: <PasswordInfoAdornment />,
        endAdornment: <PasswordToggleAdornment onClick={toggleShowPassword}/>
      }}
      {...rest}
    />
  );
}

const CardActionsStyled = styled(CardActions)`
  justify-content: flex-end;
`;

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
