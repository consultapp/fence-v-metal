import { Provider } from "react-redux";
import { store } from "@/store";
import Fence from "@/components/Fence/Fence";
import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <Fence />
    </Provider>
  );
}

export default App;
