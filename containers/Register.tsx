import { useState } from "react";
import { NextPage } from "next";

import { executeRequest } from "../services/api";
import { RegisterProps } from "../types/RegisterProps";
import { LoginProps } from "../types/LoginProps";

/* eslint-disable @next/next/no-img-element */
export const Register: NextPage<RegisterProps> = ({
    setRegister
}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const doRegister = async () => {
        try {
            setLoading(true);
            setError('');

            if (!name && !email && !password) {
                setError('Favor informar nome, email e senha');
                setLoading(false);
                return;
            }

            const body = {
                name,
                email,
                password
            }

            const result = await executeRequest('user', 'POST', body);

            if (result && result.data) {
                setRegister('');
            } else {
                setError('Não foi possível criar o usuário. Por favor, tente novamente');
            }
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setError(e?.response?.data?.error);
            } else {
                setError('Não foi possível criar o usuário. Por favor, tente novamente');
            }
        }
        setLoading(false);
    }
    
    const goToLogin = () => {
        setRegister('')
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src="/user.svg" alt="Informe seu nome completo" />
                    <input type="text" placeholder="Nome completo"
                        value={name} onChange={evento => setName(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email" />
                    <input type="text" placeholder="Informe seu email"
                        value={email} onChange={evento => setEmail(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha" />
                    <input type="password" placeholder="Informe sua senha"
                        value={password} onChange={evento => setPassword(evento.target.value)} />
                </div>
                <button type="button" onClick={doRegister} disabled={isLoading}
                    className={isLoading ? 'loading' : ''}>
                    {isLoading ? '...Carregando' : 'Registrar'}
                </button>
                <button type="button" onClick={goToLogin} disabled={isLoading}
                    className="secondary-button">Cancelar
                </button>
            </form>
        </div>
    )
}