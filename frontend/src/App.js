import './App.css';
//import { ROUTES } from './const/routes.js';
import { BrowserRouter, Route, Routes, RouterProvider, createBrowserRouter } from "react-router-dom";
//import Home from './pages/Home.jsx';
import Home from './components/Home/Home.jsx';
import CreateProduct from './components/Product/CreateProduct';
import CreateOrder from './components/Order/CreateOrder';
import EditTables from './components/Table/EditTables';



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
        <Route path='/create-product' element={ <CreateProduct/>} />
        <Route path='/create-order' element={ <CreateOrder/>} />
        <Route path='/edit-table' element={ <EditTables/>} />
      </Routes>
      </BrowserRouter>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
      <title>ComilonaWare</title>
    </div>
  );
}

export default App;
