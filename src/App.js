import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import Inicio from './components/Inicio'
import Categorias from './components/Categorias';
import CategoryTable from './components/CategoryTable';
import App2 from './components/App2';

function App() {
  return (
    <>
    <Navbar />
    <div>
      <Routes>
        <Route path="/"           element={<Inicio />} />
        <Route path="/categorias" element={<CategoryTable />} />
      </Routes>
    </div>
  </>
  );
}

export default App;
