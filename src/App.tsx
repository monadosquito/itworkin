import React from "react";
import cs from "./App.module.scss";
import { Clicker } from "./components/Clicker";

const App: React.FC = () => {
  return <Clicker elem={cs["root__clicker"]} />;
};

export default App;
