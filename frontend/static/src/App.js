import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import Splash from "./components/Auth/Splash";
import Soil from './components/Main/Soil/Soil'
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";


function App() {
    const [isAuth, setIsAuth] = useState(false);

    let navBar;
    if (true) {
        navBar = <NavBar />;
    }

    return (
        <div className="App">
            <Header />

            <Switch>

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/registration">
                    <Registration />
                </Route>
                <Route path="/soil">
                    <Soil />
                </Route>
                <Route path="/vegetables">
                    <Soil />
                </Route>
                <Route path="/companion">
                    <Soil />
                </Route>
                <Route path="/layout">
                    <Soil />
                </Route>
                <Route path="/">
                    <Splash />
                </Route>
                <Route></Route>
                <Route></Route>
                <Route></Route>
                {/* <Registration setIsAuth={setIsAuth}/> */}
                {/* <Login setIsAuth={setIsAuth}/> */}

            </Switch>
            {navBar}
            <Footer />
        </div>
    );
}

export default App;
