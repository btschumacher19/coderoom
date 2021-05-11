import { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import { CustomThemeContext } from "./Themes/CustomThemeProvider";

// all imports from  pages
import {
  Landing,
  Dashboard,
  EditChallenge,
  StudentChallengePage,
  Submissions,
  SamplePage,
} from "./Pages/_index";

// all imports from components
import { MenuAppBar, ProtectedRoute } from "./Components/_index";

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const theme = useContext(CustomThemeContext);

  useEffect(() => {
    try {
      let userObj = JSON.parse(localStorage.getItem("user"));
      if (userObj) {
        setUser(userObj);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Return to base state
  const clearUserData = () => {
    setUser({});
    setIsLoggedIn(null);
    if (localStorage.getItem("user")) {
      localStorage.removeItem("user");
    }
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
  };

  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const renderLanding =( props )=> {
    if (isLoggedIn) {
      return <Redirect to='/dashboard' />
    } else {
      return (
        <Landing theme={theme} handleLogin={handleLogin} {...props} />
      )
    }
  }

  return (
    <>
      <Router>
        {isLoggedIn ? (
          <MenuAppBar user={user} clearUserData={clearUserData} />
        ) : undefined}

        { 
        /* 
        Saving the previous route until review is finished
        <Route
          exact
          path="/"
          render={(props) => (
            <Landing {...props} theme={theme} handleLogin={handleLogin} />
          )}
        /> */}

        <Route 
          exact path="/" 
          component={ renderLanding }/>

        <ProtectedRoute
          exact
          path="/dashboard"
          theme={theme}
          clearUserData={clearUserData}
          isLoggedIn={isLoggedIn}
          component={Dashboard}
        />

        <ProtectedRoute
          exact
          path="/challenge/new"
          theme={theme}
          isLoggedIn={isLoggedIn}
          new={true}
          user={user}
          component={EditChallenge}
        />

        <ProtectedRoute
          exact
          path="/challenge/:challengeID/edit"
          theme={theme}
          isLoggedIn={isLoggedIn}
          component={EditChallenge}
        />

        <ProtectedRoute
          exact
          path="/challenge/:challengeID/submissions"
          theme={theme}
          isLoggedIn={isLoggedIn}
          component={Submissions}
        />

        <ProtectedRoute
          exact
          path="/samples"
          theme={theme}
          user={user}
          isLoggedIn={isLoggedIn}
          component={SamplePage}
        />

        <Route
          path="/challenges/:challengeID"
          render={(props) => <StudentChallengePage {...props} theme={theme} />}
        />

      </Router>
    </>
  );
}

export default App;
