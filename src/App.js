
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Componentes/Navbar';

import Home from './Pages/Home';
import Remito from './Componentes/Remito';
import FormPedido from './Componentes/FormularioPedido';
import ListaProductos from './Componentes/ListaProductos';
import ListaClientes from './Componentes/ListaClientes';

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
            <Route path='/pedido' element={<FormPedido/>} />
            <Route path='/productos' element={<ListaProductos/>} />
            {/* rutas para el desarrollador */}
            <Route path='/remito' element={<Remito/>} />
        </Routes>
      
    </div>
  );
}

export default App;
