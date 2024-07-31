
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
import LoginPage from './Pages/Login';
import CreaRemitoVentaPage from './Pages/CreaRemitoVenta';
import ListaRemitosComprasPage from './Pages/ListaRemitosCompras';
import ListaRemitosClientePage from './Pages/ListaRemitosClientePage';
import DetalleRemitoPage from './Pages/DetalleRemitoPage';
import DetalleRemitoCompraPage from './Pages/DetalleRemitoCompraPage';
import EditaRemitoPage from './Pages/EditaRemito';
import CreaCompra from './Pages/CreaCompra/CreaCompra';
import CreaAnticipoPaga from './Pages/CreaAnticipo';
import ListaProveedoresPage from './Pages/ListaProveedores';
import ListaRemitosProveedorPage from './Pages/ListaRemitosProveedor';
import EditaRemitoCompraPage from './Pages/EditaRemitoCompra';
import ListaRemitosVentas from './Pages/ListaRemitosVentas';
import CreaGastoPage from './Pages/CreaGasto';
import ListaReportesPage from './Pages/ListaReportes';
import QuienesSomosPage from './Pages/QuienesSomos';
import ListaDePreciosPage from './Pages/ListaDePrecios';
import Footbar from './Componentes/Footbar';
import ModifProducto from './Pages/ModifProducto';
import DetalleRemitoVenta from './Componentes/DetalleRemitoVenta';

function App() {

  return (
    <AppProvider>
      <div className="App">
        {/* navbar */}
        <header className="App-header">
          <Navbar />
        </header>

        <div className='content-wrap'>
          {/* rutas */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/creaCliente' element={<CreaCliente />} />
            <Route path='/clientes' element={<ListaClientesPage />} />
            <Route path='/creaProducto' element={<CreaProducto />} />
            <Route path='/remitosCliente/:cuit' element={<ListaRemitosClientePage />} />
            <Route path='/productos' element={<ListaProductosPage />} />
            <Route path='/modifProd/:_id' element={<ModifProducto />} />
            <Route path='/creaProveedor' element={<CreaProveedor />} />
            <Route path='/proveedores' element={<ListaProveedoresPage />} />
            <Route path='/remitosProveedor/:nombre/:apellido' element={<ListaRemitosProveedorPage />} />
            <Route path='/creaVenta' element={<CreaRemitoVentaPage />} />
            <Route path='/detalleRemito/:_id' element={<DetalleRemitoPage />} />
            <Route path='/detalleRemitoVenta/:_id' element={<DetalleRemitoVenta />} />{/* nuevo */}
            <Route path='/detalleRemitoCompra/:_id' element={<DetalleRemitoCompraPage />} />
            <Route path='/editaRemito/:_id' element={<EditaRemitoPage />} />
            <Route path='/creaAnticipo' element={<CreaAnticipoPaga />} />
            <Route path='/creaCompra' element={<CreaCompra />} />
            <Route path='/listaRemitosCompras' element={<ListaRemitosComprasPage />} />
            <Route path='/editaRemitoCompra/:_id' element={<EditaRemitoCompraPage />} />
            <Route path='/listaRemitosVentas' element={<ListaRemitosVentas />} />
            <Route path='/creaGastos' element={<CreaGastoPage />} />
            <Route path='/listaReportes' element={<ListaReportesPage />} />
            <Route path='/listaDePrecios' element={<ListaDePreciosPage />} />
            <Route path='/quienesSomos' element={<QuienesSomosPage />} />
            {/* rutas para el desarrollador */}
            <Route path='/remito' element={<Remito />} />
          </Routes>
        </div>

        <footer>
          <Footbar />
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
