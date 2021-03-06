import { useState } from "react";
import { NextPage } from "next";

import { executeRequest } from "../services/api";
import { LoginProps } from "../types/LoginProps";

/* eslint-disable @next/next/no-img-element */
export const Login: NextPage<LoginProps> = ({
    setToken,
    setRegister
}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(false);

    const doLogin = async () => {
        try {
            setLoading(true);
            setError('');
            if (!login && !password) {
                setError('Favor informar email e senha');
                setLoading(false);
                return;
            }

            const body = {
                login,
                password
            }

            const result = await executeRequest('login', 'POST', body);

            if (result && result.data) {
                localStorage.setItem('accessToken', result.data.token);
                localStorage.setItem('userName', result.data.name);
                localStorage.setItem('userMail', result.data.mail);
                setToken(result.data.token);
            } else {
                setError('Não foi possível realizar o login. Por favor, tente novamente');
            }
        } catch (e: any) {
            console.log(e);
            if (e?.response?.data?.error) {
                setError(e?.response?.data?.error);
            } else {
                setError('Não foi possível realizar o login. Por favor, tente novamente');
            }
        }
        setLoading(false);
    }

    const goToRegister = () => {
        setRegister('Registrar');
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu email" />
                    <input type="text" placeholder="Informe seu email"
                        value={login} onChange={evento => setLogin(evento.target.value)} />
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Informe sua senha" />
                    <input type="password" placeholder="Informe sua senha"
                        value={password} onChange={evento => setPassword(evento.target.value)} />
                </div>
                <button type="button" onClick={doLogin} disabled={isLoading}
                    className={isLoading ? 'loading' : ''}>
                    {isLoading ? '...Carregando' : 'Login'}
                </button>
                <button type="button" onClick={goToRegister}
                    className="secondary-button">Registrar
                </button>
            </form>
        </div>
    )
}