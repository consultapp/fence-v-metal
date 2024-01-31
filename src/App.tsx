import { Provider } from "react-redux";
import { store } from "@/store";
import Fence from "@/components/Fence/Fence";
import "./App.css";
import "@/template/scss/fenceCalc.scss";
import "@/template/scss/fenceButton.scss";
import "@/template/scss/fenceSection.scss";
import "@/template/scss/fenceRadio.scss";
import "@/template/scss/fenceSelect.scss";

function App() {
  return (
    <Provider store={store}>
      <Fence />
    </Provider>
  );
}

export default App;
