import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Pages/Home';
import FilteredProducts from './Pages/FilteredProducts';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/filteredproducts" element={<FilteredProducts />} />
    </Routes>
  );
}

export default App;
