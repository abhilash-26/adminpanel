import { useState } from "react";
import "./App.css";
import IntroUpload from "./components/Introimage/IntroUpload";
import Login from "./components/login/Login";
import Navbar from "./components/nav/Navbar";
import TopNav from "./components/topNav/TopNav";
import UserPage from "./components/userPage/UserPage";
import { Switch, Route, withRouter, useHistory } from "react-router-dom";

function App() {
  const [login, setLogin] = useState(true);
  return (
    <div className="App">
      {!login && <Login />}
      {login && (
        <div>
          <TopNav />
          <Navbar />

          <div className="mid_section">
            <Switch>
              <Route path="/intro" component={IntroUpload} />
              <Route path="/users" component={UserPage} />
            </Switch>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
