import "./App.css";
// import "react-table/react-table.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import { IdeaManager } from "./Managers";

const userData = [
  {
    id: "069",
    sender: "+12062475036",
    tz: "mt",
  },
  {
    id: "420",
    sender: "+12089918389",
    tz: "mt",
  },
];

const App = () => (
  <div style={{ height: "100%" }} className="App">
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      {userData.map((user, i) => (
        <Route key={i} exact path={`/users/${user.id}`}>
          <IdeaManager user={user} />
        </Route>
      ))}
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  </div>
);

export default App;
