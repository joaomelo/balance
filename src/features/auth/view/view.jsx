import styled from "styled-components";
import {
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
} from "@material-ui/core";
import {
  EmailTwoTone,
  LaunchTwoTone,
  VpnKeyTwoTone,
  VisibilityTwoTone,
  VisibilityOffTwoTone,
} from "@material-ui/icons";
import { usePayload } from "../../../components/payload";
import { useToggle } from "../../../components/switch";
import { Form } from "../../../components/form";
import { ErrorAlert } from "../../../components/error-alert";
import { ProgressDivider } from "../../../components/progress-divider";
import { useI18n } from "../../../app/i18n";
import { createErrorReport } from "../../../libs/errors";

export function SignInPageView({ onSignIn, error, isLoading }) {
  const t = useI18n();
  const initialPayload = { email: "", password: "" };
  const { payload, bind } = usePayload(initialPayload);

  const errorReport = createErrorReport(error, {
    email: "AUTH/EMAIL_INVALID",
    password: "AUTH/PASSWORD_INVALID",
  });

  return (
    <FormWrapper onSubmit={() => onSignIn(payload)}>
      <CardHeader title="Sign In" />
      <Divider />
      <CardContent>
        <EmailField {...bind("email")} error={t(errorReport.email)} />
        <PasswordField {...bind("password")} error={t(errorReport.password)} />
        <ErrorAlert>{t(errorReport.escaped)}</ErrorAlert>
      </CardContent>
      <ProgressDivider isLoading={isLoading} />
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
  );
}

function FormWrapper({ onSubmit, children }) {
  return (
    <Form onSubmit={onSubmit}>
      <Container maxWidth="xs">
        <Card>{children}</Card>
      </Container>
    </Form>
  );
}

function EmailField({ error, ...rest }) {
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

function PasswordField({ error, ...rest }) {
  const [showPassword, toggleShowPassword] = useToggle();

  const PasswordToggleAdornment = ({ onClick }) => (
    <InputAdornment position="end">
      <IconButton onClick={onClick}>
        {showPassword ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}
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
      type={showPassword ? "text" : "password"}
      fullWidth
      margin="normal"
      required
      error={!!error}
      helperText={error}
      InputProps={{
        startAdornment: <PasswordInfoAdornment />,
        endAdornment: <PasswordToggleAdornment onClick={toggleShowPassword} />,
      }}
      {...rest}
    />
  );
}

const CardActionsStyled = styled(CardActions)`
  justify-content: flex-end;
`;
