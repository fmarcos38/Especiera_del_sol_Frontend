
import { Route, Routes } from 'react-router-dom';
import { AppProvider } from './Contexto';
import './App.css';
import Navbar from './Componentes/Navbar';
import Home from './Pages/Home';
import Remito from './Componentes/Remito';
import CreaCliente from './Pages/CreaCliente';
import ListaClientesPage from './Pages/ListaClientes';
import CreaProducto from './Pages/CreaProducto';
import ListaProductosPage from './Pages/ListaProductos';
import CreaProveedor from './Pages/CreaProveedor';
import ListaProveedores from './Componentes/ListaProveedores';
import LoginPage from './Pages/Login';
import CreaRemitoVentaPage from './Pages/CreaRemitoVenta';
import ListaRemitosComprasPage from './Pages/ListaRemitosCompras';
import ListaRemitosClientePage from './Pages/ListaRemitosClientePage';
import DetalleRemitoPage from './Pages/DetalleRemitoPage';
import EditaRemitoPage from './Pages/EditaRemito';
import CreaCompra from './Pages/CreaCompra/CreaCompra';
import CreaAnticipoPaga from './Pages/CreaAnticipo';


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
            <Route path='/login' element={<LoginPage/>} />
            <Route path='/creaCliente' element={<CreaCliente/>} />
            <Route path='/clientes' element={<ListaClientesPage/>} />            
            <Route path='/creaProducto' element={<CreaProducto/>} />
            <Route path='/remitosCliente/:cuit' element={<ListaRemitosClientePage/>} />
            <Route path='/productos' element={<ListaProductosPage/>} />
            <Route path='/creaProveedor' element={<CreaProveedor/>} />
            <Route path='/proveedores' element={<ListaProveedores/>} />
            <Route path='/creaVenta' element={<CreaRemitoVentaPage/>} />
            <Route path='/listaRemitosCompras' element={<ListaRemitosComprasPage/>} />
            <Route path='/detalleRemito/:_id' element={<DetalleRemitoPage/>} />
            <Route path='/editaRemito/:_id' element={<EditaRemitoPage/>} />
            <Route path='/creaAnticipo' element={<CreaAnticipoPaga/>} />
            <Route path='/creaCompra' element={<CreaCompra/>} />
            {/* rutas para el desarrollador */}
            
            <Route path='/remito' element={<Remito/>} />
        </Routes>
      
    </div>
    </AppProvider>
  );
}

export default App;
