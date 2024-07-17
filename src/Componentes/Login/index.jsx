import React, { useContext, useState } from 'react';
import './estilos.css';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../Redux/Actions';
import { userLogData } from "../../LocalStorage";
import { AppContexto } from '../../Contexto';


function Login() {

    const [input, setInput] = useState({email: "", password: ""});
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contexto = useContext(AppContexto);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput({...input, [name]: value});

        //quito msj de error SI se llena un input
        if(value){
            const errorsInput = {...errors};
            delete errorsInput[name];
            setErrors(errorsInput);
        }
    };

    //funcion valida inputs
    const validaInputs = () => {
        const newErrors = {}

        if(!input.email) { newErrors.email = "El email es requerido"};
        if(!input.password) { newErrors.password = "El pass es requerido"}
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validaInputs()){
            dispatch(login(input));
        }
        //actualizo data del user log en el contexto
        const userLog = userLogData();
        contexto.setUserLog(userLog);
        contexto.login();
        navigate('/');
    };

    
    return (
        <div className='cont-componente-login'>
            <form onSubmit={(e) => { handleSubmit(e) }} className='cont-form-login'>
                <h1 className='tittulo-login'>Ingrese sus datos</h1>
                <div class="form__group field">
                    <input required class="form__field" type="text" name='email' value={input.email} onChange={(e) => {handleChange(e)}}/>
                    <label class="form__label" for="name">Email</label>
                </div>
                <div class="form__group field">
                    <input required class="form__field" type="text" name='password' value={input.password} onChange={(e) => {handleChange(e)}}/>
                    <label class="form__label" for="name">Password</label>
                </div>
                <div className='cont-btn-login'>
                    <Button variant="outlined" type="submit" className='btn-login'>Login</Button>
                </div>
            </form>
        </div>
    )
}

export default Login