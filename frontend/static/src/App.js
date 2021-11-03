import "./App.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import Splash from "./components/Auth/Splash";
import GardenList from "./components/Main/Profile/GardenList";
import CreateAGarden from "./components/Main/Profile/CreateAGarden";
import Soil from './components/Main/Soil/Soil'
import Vegetables from './components/Main/Vegetables/Vegetables'
import Layout from "./components/Main/Layout/Layout";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Cookie from 'js-cookie';
import { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [currentGarden, setCurrentGarden] = useState();

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
    }, []);

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
                <Route path="/gardenlist">
                    <GardenList />
                </Route>
                <Route path="/creategarden">
                    <CreateAGarden/>
                </Route>
                <Route path="/:garden/soil">
                    <Soil />
                </Route>
                <Route path="/:garden/vegetables">
                    <Vegetables />
                </Route>
                <Route path="/:garden/layout">
                    <Layout />
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
