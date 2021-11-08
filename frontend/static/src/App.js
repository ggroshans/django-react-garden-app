import "./App.css";
import Header from "./components/Header/Header";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import Splash from "./components/Auth/Splash";
import GardenList from "./components/Main/Profile/GardenList";
import GardenDetail from "./components/Main/Profile/GardenDetail";
import CreateAGarden from "./components/Main/Profile/CreateAGarden";
import Soil from './components/Main/Soil/Soil'
import Vegetables from './components/Main/Vegetables/Vegetables'
import Layout from "./components/Main/Layout/Layout";
import Summary from "./components/Main/Summary/Summary";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import Cookie from 'js-cookie';
import { useState, useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Varieties from "./components/Main/Varieties/Varieties";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [currentGarden, setCurrentGarden] = useState();
    const [showNav, setShowNav] = useState(false);
    const [showHeader, setShowHeader] = useState(true);

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
    if (isAuth && showNav) {
        navBar = <NavBar />;
    } else {
        navBar = ""
    }


    return (
        <div className="App">
            <Header isAuth={isAuth} setIsAuth={setIsAuth} showHeader={showHeader}/>
            <Switch>
                <Route path="/login">
                    <Login setIsAuth={setIsAuth} isAuth={isAuth} setShowHeader={setShowHeader}/>
                </Route>
                <Route path="/registration">
                    <Registration setIsAuth={setIsAuth} isAuth={isAuth} setShowHeader={setShowHeader}/>
                </Route>
                <Route path="/gardenlist/:garden">
                    <GardenDetail setShowNav={setShowNav}/>
                </Route>
                <Route path="/gardenlist">
                    <GardenList isAuth={isAuth} setShowNav={setShowNav} setShowHeader={setShowHeader}/>
                </Route>
                <Route path="/creategarden">
                    <CreateAGarden/>
                </Route>
                <Route path="/:garden/soil">
                    <Soil setShowNav={setShowNav}/>
                </Route>
                <Route path="/:garden/vegetables">
                    <Vegetables setShowNav={setShowNav}/>
                </Route>
                <Route path="/:garden/varieties">
                    <Varieties setShowNav={setShowNav}/>
                </Route>
                <Route path="/:garden/layout">
                    <Layout setShowNav={setShowNav}/>
                </Route>
                <Route path="/:garden/summary">
                    <Summary setShowNav={setShowNav}/>
                </Route>

                <Route path="/">
                    <Splash isAuth={isAuth} setShowHeader={setShowHeader}/>
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
