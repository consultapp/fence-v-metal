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
import "@/template/scss/fenceTooltip.scss";
import "@/template/scss/fenceTable.scss";

function App() {
  return (
    <Provider store={store}>
      <div className="fenceCalc">
        <div className="fenceCalc_header1">Калькулятор забора</div>
        <div className="fenceCalc_header2">
          Рассчитайте вес и длину необходимого вам товара
        </div>
        <Fence />
      </div>
    </Provider>
  );
}

export default App;
