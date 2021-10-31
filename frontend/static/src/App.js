
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Registration from './components/Auth/Registration'
import Login from './components/Auth/Login'
import Splash from './components/Auth/Splash';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import { useState, useEffect } from 'react'

function App() {

  const [isAuth, setIsAuth] = useState(false)


  let navBar
  if (false) {
    navBar = <NavBar/>
  }



  return (
    <div className='App'>
        <Header />
        {/* <Registration setIsAuth={setIsAuth}/> */}
        {/* <Login setIsAuth={setIsAuth}/> */}
        <Splash />
        {navBar}
        <Footer />
    </div>
  );
}

export default App;
