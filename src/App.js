

import { BrowserRouter, Route, Switch } from "react-router-dom";
import AuthContext from "./AuthContext/AuthContext";
import Signup from "./component/Signup";
import Signin from "./component/Signin";
import Chat from "./component/Chat";
// import Dashboard from "./components/Dashboard";
// import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch>
          {/* <PrivateRoute exact path="/">
            <Dashboard />
          </PrivateRoute> */}
          <Route  exact path="/chat" component={Chat} />
          <Route  path="/signup" component={Signup} />
          <Route path="/" component={Signin} />
          <Route path="/signin" component={Signin} />
          {/* <Route path="/forgot_password" component={ForgotPassword} /> */}
        </Switch>
      </AuthContext>
    </BrowserRouter>
  );
}

export default App;