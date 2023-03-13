import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/AddProduct';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <Router>
      <ToastContainer />
      <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/:product_id' element={<ProductDetail/>}/>
      <Route path="/add-product" element={<AddProduct/>}/>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
