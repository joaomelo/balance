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
import { useCommand } from "../../../libs/hooks/command";
import { usePayload } from "../../../libs/hooks/payload";
import { useToggle } from "../../../libs/hooks/switch";
import { Form } from "../../../libs/components/form";
import { ErrorAlert } from "../../../libs/components/error-alert";
import { ProgressDivider } from "../../../libs/components/progress-divider";
import { useI18n } from "../../../libs/i18n";
import { createErrorReport } from "../../../libs/errors";

export function SignInPageView({ dependencies }) {
  const t = useI18n();

  const { authCommands } = dependencies;
  const [signIn, isLoading, error] = useCommand(authCommands.signIn);
  const errorReport = createErrorReport(error, {
    email: "AUTH/EMAIL_INVALID",
    password: "AUTH/PASSWORD_INVALID",
  });

  const initialPayload = { email: "", password: "" };
  const { payload, bind } = usePayload(initialPayload);

  return (
    <FormWrapper onSubmit={() => signIn(payload)}>
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
