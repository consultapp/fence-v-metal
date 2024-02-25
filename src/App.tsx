import { Provider } from "react-redux";
import { store } from "@/store";
import Fence from "@/components/Fence/Fence";

import "./App.css";
import "@fontsource/open-sans";
import "@fontsource/open-sans/400.css"; // Specify weight
import "@fontsource/open-sans/600.css"; // Specify weight
import "@/template/scss/fenceCalc.scss";
import "@/template/scss/fenceButton.scss";
import "@/template/scss/fenceSection.scss";
import "@/template/scss/fenceRadio.scss";
import "@/template/scss/fenceSelect.scss";
import "@/template/scss/fenceTable.scss";
import { CALC_HEADERS } from "./fixtures/CALC_HEADERS";

function App() {
  return (
    <Provider store={store}>
      <div className="calculator__head">
        <h2>{CALC_HEADERS?.header1}</h2>
        <h4>{CALC_HEADERS?.header2}</h4>
      </div>
      <div className="fenceCalc">
        <Fence />
      </div>
    </Provider>
  );
}

export default App;
