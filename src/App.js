import { useState } from "react";
import "./App.css";
import IntroUpload from "./components/Introimage/IntroUpload";
import Login from "./components/login/Login";
import Navbar from "./components/nav/Navbar";
import TopNav from "./components/topNav/TopNav";
import UserPage from "./components/userPage/UserPage";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Protected from "./components/Protected";

function App() {
  // const [login, setLogin] = useState(false);
  const loggedInState = useSelector((state) => state.user.value.isLoggedIn);

  console.log(loggedInState);
  console.log(loggedInState);
  return (
    <div className="App">
      {loggedInState == 0 && (
        <Route exact path="/">
          <Login />
        </Route>
      )}
      {loggedInState == 1 && (
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
