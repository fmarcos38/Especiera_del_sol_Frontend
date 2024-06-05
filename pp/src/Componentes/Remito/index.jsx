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
                        <div className='cont-remito-sup-logo'>
                            <img src={logoRemito} alt='' className='logo-remito'/>
                        </div>
                        <div className='cont-remito-sup-info-empresa'>
                            <h1>ESPECIERA DEL SOL</h1>
                            <p>ESPECIAS - FRUTAS SECAS</p>
                            <br></br>
                            <p>11 4199 7200</p>
                            <p>11 5951 0493</p>
                            <p>info@especieradelsol.com</p>
                            <p>www.especieradelsol</p>
                            <p>IVA RESPONSABLE INSCRIPTO</p>
                        </div>
                        <div className='cont-remito-sup-info-X'>
                            <h1>X</h1>
                            <br></br>
                            <br></br>
                            <p>Documento</p>
                            <p>No vVálido</p>
                            <p>como</p>
                            <p>Factura</p>
                        </div>
                    </div>
                    {/* cont sup Derecho */}
                    <div className='cont-remito-sup-derecho'>
dddddd
                    </div>
                </div>

                {/* cont info cliente */}
                <div className='cont-remito-datos-cliente'></div>

                {/* cont info items */}
                <div className='cont-remito-items'></div>
            </div>
        </div>
    )
}

export default Remito