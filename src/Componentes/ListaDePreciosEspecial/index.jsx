import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProds } from '../../Redux/Actions';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import WhatsAppButton from '../BotonWhastApp';
import logo from '../../Imagenes/logoYtexto.jpg';
import { formatDate, formatMoney } from '../../Helpers';


function ListaDePreciosEspecial() {

  const productos = useSelector(state => state.productos);
    const dispatch = useDispatch();

    /* funcion para PDF mejor opcion */
    const handleSavePDF = () => {
        const input = document.getElementById('lista-precios');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('lista.pdf'); //nombre del archivo q se baja
        });
    };

    useEffect(() => {
        dispatch(getAllProds())
    }, [dispatch]);


  return (
    <div className='cont-padre-lista-precios'>
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
                <h2 className='titulo-lista-precio'>LISTA DE PRECIOS ESPECIAL</h2>
              </div>
              {/* tabla */}
              <div className='cont-tabla-listaPrecio'>
                <table className='tabla-precios'>
                  <thead>
                    <tr>
                      <th>
                        <p className='Descripcion'>Descripción</p>
                      </th>
                      <th style={{ width: '70px', textAlign: 'center', }}>
                        <p style={{ fontSize: '13px' }}>x 50Kg</p>
                      </th>
                      <th style={{ width: '70px', textAlign: 'center', }}>
                        <p style={{ fontSize: '13px' }}>x 100Kg</p>
                      </th>
                      <th style={{ width: '70px', textAlign: 'center', }}>
                        <p style={{ fontSize: '13px' }}>Envase (Kg)</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      productos?.map((p, i) => {
                        return (
                          <tr key={i}>
                            <td>{p.nombre}</td>
                            <td style={{ textAlign: 'center' }}>${formatMoney(p.precio50)}</td>
                            <td style={{ textAlign: 'center' }}>${formatMoney(p.precio100)}</td>
                            <td style={{ textAlign: 'center' }}>${formatMoney(p.envase)}</td>
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
      {/* botón imprimir */}
      <button onClick={handleSavePDF} className='boton-imprimir'>Descargar</button>
      {/* Botón WhatsApp */}
      <WhatsAppButton />
    </div>
  )
}

export default ListaDePreciosEspecial