
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Componentes/Navbar';
import Home from './Pages/Home';
import Remito from './Componentes/Remito';
import FormPedido from './Componentes/FormularioPedido';
import ListaProductos from './Componentes/ListaProductos';
import ListaClientes from './Componentes/ListaClientes';
import CreaCliente from './Pages/CreaCliente';
import ListaClientesPage from './Pages/ListaClientes';
import { AppProvider } from './Contexto';
import CreaProducto from './Pages/CreaProducto';

function App() {

  return (
    <AppProvider>
      <div className="App">
      {/* navbar */}
      <header className="App-header">
        <Navbar />
      </header>
      
        {/* rutas */}
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/clientes' element={<ListaClientesPage/>} />
            <Route path='/creaCliente' element={<CreaCliente/>} />
            <Route path='/creaProducto' element={<CreaProducto/>} />
            
            {/* rutas para el desarrollador */}
            <Route path='/clientes' element={<ListaClientes/>} />
            <Route path='/productos' element={<ListaProductos/>} />
            <Route path='/remito' element={<Remito/>} />
            <Route path='/pedido' element={<FormPedido/>} />
        </Routes>
      
    </div>
    </AppProvider>
  );
}

export default App;
