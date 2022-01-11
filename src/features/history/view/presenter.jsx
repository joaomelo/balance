import { useStream } from "../../../libs/hooks/stream";
import { HistoryPageView } from "./view";

export function HistoryPagePresenter({ dependencies }) {
  const { historyQuery } = dependencies;
  const history = useStream(historyQuery);

  return <HistoryPageView history={history} />;
}
