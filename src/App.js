import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/users">users</Route>
      </Switch>
    </div>
  );
}

export default App;
