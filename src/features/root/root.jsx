import { MuiProvider } from "../../libs/mui";
import { BrowserRouter } from "react-router-dom";
import { WrapperRoot } from "./wrapper-root";
import { WrapperPage } from "./wrapper-page";
import { AppNav } from "./app-nav";
import { CurrentPage } from "./current-page";

export function Root({ dependencies }) {
  return (
    <MuiProvider>
      <BrowserRouter>
        <WrapperRoot>
          <AppNav dependencies={dependencies} />
          <WrapperPage>
            <CurrentPage dependencies={dependencies} />
          </WrapperPage>
        </WrapperRoot>
      </BrowserRouter>
    </MuiProvider>
  );
}
