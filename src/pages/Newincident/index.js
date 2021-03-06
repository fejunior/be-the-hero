import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(event) {
        event.preventDefault();
        console.log(title, description, value);

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('erro ao cadastrar caso, tente novamente');
        }
    }


    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente pra encontrar um herói  para resolver isso</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <textarea
                        placeholder="descrição"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <input
                        placeholder="valor em reais"
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />



                    <button type="submit" className="button">Cadastrar</button>

                </form>

            </div>
        </div>
    );
}