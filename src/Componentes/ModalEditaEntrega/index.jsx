import React, { useContext, useEffect, useState } from 'react'
import { AppContexto } from '../../Contexto';
import './estilos.css';

function ModalEditaEntrega({remito}) {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({}); 
    const contexto = useContext(AppContexto);

    const handleOnchange = (e) => {
        const {id, value} = e.target
        setData({...data, [id]: value});

        //quito msj de error si se llena el dato
        if(value){
            const errores = {...errors};
            delete errores[id];
            setErrors(errores);
        }
    };
    //funcion valida inputs
    const validate = () => {
        const newErrors = {};

        if (!data.monto) newErrors.monto = 'Monto es requerido';
        if (!data.metodoPago) newErrors.metodoPago = 'Metodo Pago es requerido';

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            //dispatch()
        }
    };

    useEffect(()=>{
        if(remito){
            setData(remito)
        }
    }, [remito]);

    return (
        <div className='componente-modal-edita'>            
            <form onSubmit={(e) => { handleSubmit(e) }} className='formulario-editaMonto'>
            <button onClick={() => { contexto.setModalEditaEntrega(false)}} className='btn-cerrar-modal-editaEntrega'>X</button>
                            <div className='cont-item-data-agregaPago'>
                                <label className='label-monto'>Monto</label>
                                <input
                                    type='number'
                                    id='monto'
                                    value={data.monto}
                                    onChange={(e) => handleOnchange(e)}
                                    className='input-monto'
                                />
                                {errors.monto && (<span className='errors'>{errors.monto}</span>)}
                            </div>
                            <div className='cont-item-data-agregaPago'>
                                <label className='label-monto'>Metodo pago</label>
                                <input
                                    type='text'
                                    id='metodoPago'
                                    value={data.metodoPago}
                                    onChange={(e) => handleOnchange(e)}
                                    className='input-monto'
                                />
                                {errors.metodoPago && (<span className='errors'>{errors.metodoPago}</span>)}
                            </div>

                            <button type='onSubmit' className='btn-carga-entrega'>Cargar Entrega</button>
                        </form>
        </div>
    )
}

export default ModalEditaEntrega