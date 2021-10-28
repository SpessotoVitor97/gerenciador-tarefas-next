import { NextPage } from "next";
import { useEffect, useState } from "react";
import { Filter } from "../components/Filter";
import { Footer } from "../components/Footer";

import { Header } from "../components/Header";
import { List } from "../components/List";
import { executeRequest } from "../services/api";
import { AccessTokenProps } from "../types/AccessTokenProps";
import { Task } from "../types/Task";

/* eslint-disable @next/next/no-img-element */
const Home: NextPage<AccessTokenProps> = ({
    setToken
}) => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        setToken('');
    }

    const getListaFiltrada = async () => {
        try {
            const result = await executeRequest('task', 'GET');
            if (result && result.data) {
                setTasks(result.data);
            } 
        } catch (e: any) {
            console.log(e);
        }
    }

    useEffect(() => {
        getListaFiltrada();   
    }, [])
    
    return (
        <>
            <Header logout={logout} />
            <Filter />
            <List tasks={tasks} />
            <Footer />
        </>
    );
}

export { Home }