import { createErrorReport } from "../../errors";
import { useI18n } from "../../../libs/hooks/i18n";
import { usePayload } from "../payload";
import { useCommand } from "../command";

export function useDialog({
  command,
  initialPayload = {},
  errorSchema = {},
  onSuccess = () => null,
}) {
  const { payload, bind, reset } = usePayload(initialPayload);
  const [act, isLoading, errorAct] = useCommand(command);

  const submit = async () => {
    const success = await act(payload);
    if (success) {
      reset();
      onSuccess();
    }
  };

  const errorReport = createErrorReport(errorAct, errorSchema);
  const t = useI18n();
  const error = (key) => t(errorReport[key]);

  return { submit, bind, error, isLoading };
}
