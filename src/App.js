
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './Contexto';
import './App.css';
import Navbar from './Componentes/Navbar';
import Home from './Pages/Home';
import Remito from './Componentes/Remito';
import FormPedido from './Componentes/FormularioPedido';
import CreaCliente from './Pages/CreaCliente';
import ListaClientesPage from './Pages/ListaClientes';
import CreaProducto from './Pages/CreaProducto';
import ListaProductosPage from './Pages/ListaProductos';
import CreaProveedor from './Pages/CreaProveedor';
import ListaProveedores from './Componentes/ListaProveedores';


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
            <Route path='/creaCliente' element={<CreaCliente/>} />
            <Route path='/clientes' element={<ListaClientesPage/>} />            
            <Route path='/creaProducto' element={<CreaProducto/>} />
            <Route path='/productos' element={<ListaProductosPage/>} />
            <Route path='/creaProveedor' element={<CreaProveedor/>} />
            <Route path='/proveedores' element={<ListaProveedores/>} />
            
            {/* rutas para el desarrollador */}
            
            <Route path='/remito' element={<Remito/>} />
            <Route path='/pedido' element={<FormPedido/>} />
        </Routes>
      
    </div>
    </AppProvider>
  );
}

export default App;
