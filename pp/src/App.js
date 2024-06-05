
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Componentes/Navbar';
import ListaClientes from './Componentes/ListaProductos';
import Home from './Pages/Home';
import Remito from './Componentes/Remito';

function App() {
  return (
    <div className="App">
      {/* navbar */}
      <header className="App-header">
        <Navbar />
      </header>
      
        {/* rutas */}
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/clientes' element={<ListaClientes/>} />

            {/* rutas para el desarrollador */}
            <Route path='/remito' element={<Remito/>} />
        </Routes>
      
    </div>
  );
}

export default App;
