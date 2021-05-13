import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import DataManager from "./DataManager";

function App() {
  const data = {
    "069": [
      "037e7dfb-dffd-45c6-adf6-0f8c6106f988",
      "0ddff9a2-9057-42bb-abb6-1a25a5d6cd03",
    ],
    420: ["a3139f6c-339e-48d0-bfeb-d384d69f532f"],
  };

  return (
    <div style={{ height: "100%" }} className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {Object.keys(data).map((userId, i) => (
          <Route key={i} exact path={`/users/${userId}`}>
            <DataManager userId={userId} data={data} />
          </Route>
        ))}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
