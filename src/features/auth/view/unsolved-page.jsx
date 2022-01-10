import { Card, CardContent, CardHeader, Container } from "@material-ui/core";
import { ProgressDivider } from "../../../libs/components/progress-divider";

export function UnsolvedPage() {
  return (
    <Container maxWidth="xs">
      <Card>
        <CardHeader title="Recovering User" />
        <ProgressDivider isLoading />
        <CardContent>
          We are trying to log you in automatically. Please wait.
        </CardContent>
      </Card>
    </Container>
  );
}
