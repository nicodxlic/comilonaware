import logo from './logo.svg';
import './App.css';
//import { ROUTES } from './const/routes.js';
import { BrowserRouter, Route, Routes, RouterProvider, createBrowserRouter } from "react-router-dom";
//import Home from './pages/Home.jsx';
import Home from './components/Home/Home.jsx';



/*const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <Home />,
  },{
    path: ROUTES.order,
    element: <Order />
  }
]); */

// <RouterProvider router = {router} />




function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> }/>
      </Routes>
      </BrowserRouter>
      <header className="App-header">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />


        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className="btn btn-primary">Crear</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
