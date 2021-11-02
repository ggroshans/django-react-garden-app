import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import Splash from "./components/Auth/Splash";
import GetStarted from "./components/Main/GetStarted/GetStarted";
import Soil from './components/Main/Soil/Soil'
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Cookie from 'js-cookie';
import { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [currentGarden, setCurrentGarden] = useState({
        created_at: "",
        id: null,
        name: "",
        username: "",
        soil: null,
    })

    console.log("currentGarden", currentGarden);

    useEffect( () => {
        const checkAuth  = () => {
            let cookie = Cookie.get('Authorization');
            if (cookie) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        }
        checkAuth()
    }, [])

    let navBar;
    if (isAuth) {
        navBar = <NavBar />;
    } else {
        navBar = ""
    }


    return (
        <div className="App">
            <Header />

            <Switch>

                <Route path="/login">
                    <Login setIsAuth={setIsAuth} isAuth={isAuth}/>
                </Route>
                <Route path="/registration">
                    <Registration setIsAuth={setIsAuth} isAuth={isAuth}/>
                </Route>
                <Route path="/getstarted">
                    <GetStarted setCurrentGarden={setCurrentGarden}/>
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

            </Switch>
            {navBar}
            <Footer />
        </div>
    );
}

export default withRouter(App);
