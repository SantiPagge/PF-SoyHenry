import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../../redux/slices/userRegisterSlice";
import axios from "axios";

import working1 from '../../assets/working1.png';
import validationsRegister from './validationsRegister';

// Components
import { NavLanding } from "../NavLanding/NavLanding";
import Footer from "../Footer/Footer";

// Mui core;
import Box from '@mui/material/Box';
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LoadingButton from '@mui/lab/LoadingButton';

export const menu = [
    {
        name: "Planes",
        link: "#"
    },
    {
        name: "Sobre Nosotros",
        link: "/about"
    },
    {
        name: "Registrarme como recruiter",
        link: "/companyregister"
    },
]

export const Registro = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [form, setForm] = useState({
        names: '',
        lastnames: '',
        email: '',
        password: '',
        confpassword: '',
        phone: '',
        rol: 'Postulante',
        active: true
    });

    const [errors, setErrors] = useState({
        names: '',
        lastnames: '',
        email: '',
        password: '',
        confpassword: '',
        phone: ''
    });

    const userData = JSON.parse(localStorage.getItem('usergoogle'))

    useEffect(() => {
        if (userData) {
            const [names, lastnames] = userData.name.split(" ");
            setForm({
                ...form,
                names,
                lastnames,
                email: userData.email,
            })
        }
    }, [])

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const validationConfPassword = (validar) => {
        if (validar.hasOwnProperty('confpassword')) {
            if (validar.confpassword === '') return { ...errors, confpassword: 'Se requiere validar la contraseña *' };
            if (form.password !== validar.confpassword) return { ...errors, confpassword: 'Las contraseñas no son' }
            if (form.password === validar.confpassword) return { ...errors, confpassword: '' };
        }
    }

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })

        const validationErrors = event.target.name !== 'confpassword' ?
            validationsRegister({
                [event.target.name]: event.target.value
            })
            : validationConfPassword({
                [event.target.name]: event.target.value,
            });
        setErrors({ ...errors, ...validationErrors });
    };


    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        // bloquea el boton
        setLoading(true);

        // Crea el usuario en la base de datos
        const userDbData = await axios.post('/auth/register', form)
            .catch(() => {
                setErrors({
                    ...errors,
                    email: '¡Este correo ya esta registrado!'
                })
                setLoading(false);
            })

        // Guarda los datos en localStorage 
        const objetoJSON = JSON.stringify(userDbData.data)
        localStorage.setItem('userLogin', objetoJSON)

        // Guarda los datos en Redux
        dispatch(saveUser(userDbData.data))

        // Mensaje y redirige si todo fue exitoso
        alert("!Gracias por unirte a FusionaJob! Por favor continúa completando tu perfíl para !aplicar a las ofertas!");
        navigate('/profile');
    };

    // validacion para habilitar el boton
    const formValues = Object.values(form);
    const errorsValue = Object.values(errors);
    const isFormComplete = formValues.every(value => value !== '' && value !== null);
    const isErrorsEmpty = errorsValue.every(value => value === '');

    return (
        <div className="w-full h-screen flex flex-col justify-between bg-primary-light dark:bg-secondary-dark">
            <NavLanding menu={menu} />
            <div className='w-full mx-auto px-4 py-8 mt-14 bg-primary-light dark:bg-secondary-dark'>
                <h2 className='text-3xl md:text-4xl font-bold mb-8 text-center dark:text-white'>¡Crea tu cuenta y encuentra ese empleo IT deseado!</h2>
                <div className='flex flex-col md:flex-row items-center justify-center mb-12'>
                    <img src={working1} alt='work1' className='w-full md:w-3/5 lg:w-2/5 mb-8 md:mb-0 rounded-lg' />
                    <form className='w-full flex flex-col m-4'>
                        <Box
                            className="flex flex-col"
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1 },
                                '& .MuiInputBase-input': { color: 'darkorange' },
                                "& .MuiInput-underline:before": {
                                    borderBottomColor: "darkorange",
                                },
                            }}
                            noValidate
                            autoComplete="on"
                        >
                            <div className="w-full flex flex-wrap justify-center">
                                <div className="mr-4 my-4">
                                    <TextField label="Nombres" value={form.names} onChange={handleChange} error={!!errors.names} helperText={errors.names} variant="standard" name='names' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Apellidos" value={form.lastnames} onChange={handleChange} error={!!errors.lastnames} helperText={errors.lastnames} variant="standard" name='lastnames' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Email" value={userData ? userData.email : form.email} onChange={handleChange} error={!!errors.email} helperText={userData ? 'No puedes modificar el correo' : errors.email ? errors.email : 'Ej. correo@gmail.com'} variant="standard" name='email' />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField label="Phone" value={form.phone} onChange={handleChange} error={!!errors.phone} helperText={errors.phone ? errors.phone : 'Ej. +573215894786'} variant="standard" name='phone' />
                                </div>
                            </div>
                            <div className="w-full flex flex-wrap justify-center">
                                <div className="mr-4 my-4">
                                    <TextField
                                        label="Contraseña" value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} variant="standard" name='password'
                                        type={showPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="mr-4 my-4">
                                    <TextField
                                        label="Confirmar contraseña" onChange={handleChange} error={!!errors.confpassword} helperText={errors.confpassword} variant="standard" name='confpassword'
                                        type={showPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword}>
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                            </div>
                        </Box>
                        <div className='flex items-center justify-center'>
                            <Box sx={{ '& > button': { m: 1, width: '150px', height: '60px', fontWeight: '700' } }}>
                                <LoadingButton
                                    className={`${isErrorsEmpty && isFormComplete ? "" : "opacity-50 cursor-not-allowed pointer-events-none"}`}
                                    onClick={handleClick}
                                    loading={loading}
                                    color="warning"
                                    loadingPosition="center"
                                    variant="contained"
                                    type='submit'
                                >
                                    <span>Crear cuenta</span>
                                </LoadingButton>
                            </Box>
                        </div>
                        <div className='mt-4 text-center'>
                            <p className='text-gray-700 dark:text-white text-sm'>Al hacer click en Crear Cuenta, aceptas las <a className="text-secondary-light dark:text-primary-dark" href='#'>Condiciones de uso</a> y las <a className="text-secondary-light dark:text-primary-dark" href='#'>Políticas de privacidad</a> de Fusionajob.</p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}