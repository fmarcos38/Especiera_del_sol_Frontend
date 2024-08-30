import React from 'react';
import logo from '../../Imagenes/logoYtexto.jpg';
import { formatDate } from '../../Helpers';
import './estilos.css';

function ListaPrecios({productos, lista}) {
  return (
    <div className='cont-padre-lista-precios'>
      <div className="cont-gral-listaDePrecios" id='lista-precios'>
        <div className='cont-secundario-listaDePrecios'>
          <div className="linea linea-1"></div>
          <div className="linea linea-2"></div>
          <div className="linea linea-3"></div>
          <div className='cont-informacion'>
            {/* logo y datos */}
            <div className='cont-logo-datos'>
              <div className='cont-logo'>
                <img src={logo} alt='not found' className='logo-lista-precio' />
              </div>
              {/* fecha */}
              <div>
                <p>{formatDate(new Date())}</p>
              </div>
            </div>
            {/* titulo */}
            <div className='cont-titulo-lista-precio'>
              <h2 className='titulo-lista-precio'>LISTA DE PRECIOS MAYORISTA</h2>
            </div>
            {/* tabla */}
            <div className='cont-tabla-listaPrecio'>
              <table className='tabla-precios'>
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Precio (x Kg)</th>
                    <th>Envace (Kg)</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    productos?.map((p, i) => {
                      return (
                        <tr key={i}>
                          <td>{p.nombre}</td>
                          <td style={{ textAlign: 'center' }}>
                            {
                              lista === "principal" && p.precioKg
                            }
                            {
                              lista === "especial" && p.precioKgContado
                            }
                          </td>
                          <td style={{ textAlign: 'center' }}>{p.envase}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            {/* info contactos */}
            <div className='info-contacto-lita-precio'>
              <div className='cont-info-contacto'>
                <p className='item-info-contacto-lista-precio'>Cel: 11 41997200 Gustavo</p>
                <p className='item-info-contacto-lista-precio'>Cel: 11 59510493 Florencia</p>
              </div>
              <div className='cont-info-contacto'>
                <p className='item-info-contacto-lista-precio'>www.especieradelsol.com</p>
                <p className='item-info-contacto-lista-precio'>info@especieradelsol.com</p>
                <p className='item-info-contacto-lista-precio'>Intagram: @especieradelsol</p>
                <p className='item-info-contacto-lista-precio'>Facebook: Especiera del Sol</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListaPrecios;