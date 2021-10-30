
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';

function App() {

  let navBar
  if (true) {
    navBar = <NavBar/>
  }



  return (
    <div className='App'>
        <Header />
        <Main />
        {navBar}
        <Footer />
    </div>
  );
}

export default App;
