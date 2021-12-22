import { useStream } from "../../../libs/hooks/stream";
import { HistoryPageView } from "./view";

export function HistoryPagePresenter({ dependencies }) {
  const { composedHistorySelector } = dependencies;
  const history = useStream(composedHistorySelector);

  return <HistoryPageView history={history} />;
}
