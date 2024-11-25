import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import CreateProduct from './components/Product/CreateProduct';
import CreateOrder from './components/Order/CreateOrder';
import EditTables from './components/Table/EditTables';
import CreatePurchase from './components/Purchase/CreatePurchase';
import CreatePayment from './components/Payment/CreatePayment';
import Menu from './components/Menu/Menu.jsx';
import Login from './components/User/Login';
import ListOrders from './components/Order/ListOrders.jsx';
import Kitchen from './components/Kitchen/Kitchen.jsx';
import Products from './components/Product/Products.jsx';
import PurchaseList from './components/Purchase/PurchaseList.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home/> }/>
        <Route path='/login' element={ <Login/>} />
        <Route path='/orders' element={ <ListOrders/> }/>
        <Route path='/purchase' element={ <ListOrders/> }/>
        <Route path='/kitchen' element={ <Kitchen/> }/>
        <Route path='/products' element={ <Products/> }/>
        <Route path='/purchases' element={ <PurchaseList/> }/>
        <Route path='/create-product' element={ <CreateProduct/>} />
        <Route path='/create-order' element={ <CreateOrder/>} />
        <Route path='/edit-table' element={ <EditTables/>} />
        <Route path='/create-purchase' element={ <CreatePurchase/>} />
        <Route path='/menu' element={ <Menu/>} />
        <Route path='/create-payment/:id' element={ <CreatePayment/>} />
      </Routes>
      </BrowserRouter>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
      <title>ComilonaWare</title>
    </div>
  );
}

export default App;
