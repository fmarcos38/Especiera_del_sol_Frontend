import React from 'react';
import logoRemito from '../../Imagenes/logo.png';
import './estilos.css';


function Remito() {
    return (
        <div className='cont-gralRemito'>
            <div className='cont-remito'>
                {/* cont info superiro */}
                <div className='cont-remito-sup'>
                    <div className='cont-remito-sup-izq'>                        
                        {/* cont info empresa */}
                        <div className='cont-remito-sup-info-empresa'>
                            {/* cont logo */}
                            <div className='cont-remito-sup-logo'>
                                <img src={logoRemito} alt='' className='logo-remito'/>
                                <h1>ESPECIERA DEL SOL</h1>
                            </div>
                            
                            <p>ESPECIAS - FRUTAS SECAS</p>
                            <p>11 4199 7200</p>
                            <p>11 5951 0493</p>
                            <p>info@especieradelsol.com</p>
                            <p>www.especieradelsol</p>
                            <p>IVA RESPONSABLE INSCRIPTO</p>
                        </div>
                        {/* cont X */}
                        <div className='cont-remito-sup-info-X'>
                            <h1>X</h1>
                            <br></br>
                            <br></br>
                            <p>Documento</p>
                            <p>No Válido</p>
                            <p>como</p>
                            <p>Factura</p>
                        </div>
                    </div>
                    
                    {/* cont sup Derecho */}
                    <div className='cont-remito-derecho'>
                        <div className='cont-remito-derecho-SUP'>
                            <h2 className='cont-remito-derecho-SUP-titulo'>REMITO</h2>
                            <p className='num-remito'>N° 0001</p>
                            <p className='fecha-remito'>Fecha: {Date.now}</p>
                        </div>
                        <div className='cont-remito-derecho-INF'>
                            <div className='cont-remito-derecho-INF-izq'>
                                <p className='datos-empresa-afip-IZQ'>C.U.I.T</p>
                                <p className='datos-empresa-afip-IZQ'>Ing Brutos C.M</p>
                                <p className='datos-empresa-afip-IZQ'>Inicio de actividades</p>
                            </div>
                            <div className='cont-remito-derecho-INF-der'>
                                <p className='datos-empresa-afip-DER'>20-11816651-6</p>
                                <p className='datos-empresa-afip-DER'>901-20-11816651-6</p>
                                <p className='datos-empresa-afip-DER'>01-12-88</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* cont info cliente */}
                <div className='cont-remito-datos-cliente'>
                    <div className='cont-remito-datos-cliente-Item-Nombre'>
                        <label className='lable-remito'>Señor(es):</label>
                        <input className='input-remito-nombre' />
                    </div>
                    <div className='cont-remito-datos-cliente-Item-Direccion'>
                        <label className='lable-remito'>Domicilio:</label>
                        <input className='input-remito-domicilio' />
                    </div>
                    <div className='cont-remito-datos-cliente-Item-Localidad-Telef'>
                        <div className='cont-localidad'>
                            <label className='lable-remito'>Localidad:</label>
                            <input className='input-remito-localidad' />
                        </div>
                        <div className='cont-telefono'>
                            <label className='lable-remito'>Tel:</label>
                            <input className='input-remito-telefono' />
                        </div>
                    </div>
                    <div className='cont-remito-datos-cliente-Item-AFIP'>
                        <div className='cont-IVA'>
                            <label className='lable-remito'>IVA:</label>
                            <input className='input-remito-iva' />
                        </div>
                        <div className='cont-CUIT'>
                            <label className='lable-remito'>CUIT:</label>
                            <input className='input-remito-cuit' />
                        </div>
                    </div>
                    <div className='cont-remito-datos-cliente-Item-CondicionPago'>
                        <label className='lable-remito-condicion'>Condición de pago:</label>
                        <input className='input-remito-condicionPago'/>
                    </div>
                </div>

                {/* cont info items */}
                <div className='cont-remito-items'></div>
            </div>
        </div>
    )
}

export default Remito