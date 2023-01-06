import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css'

function Filme() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [filme, setFilme] = useState({});
  const [loading, setLoadFilme] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: '53e1453b68bb42b6602cd438e387035f',
          language: 'pt-BR',
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoadFilme(false);
        }).catch((err) => {
          console.log("Filme nao encontrado");
          navigate("/", { replace: true });
          return;
        })
    }
    loadFilme();

    return () => {
    }
  }, [navigate, id])

  function salvarFilme() {
    const minhaList = localStorage.getItem("@primeflix");

    let filmesSalvos = JSON.parse(minhaList) || [];

    // 'some' verificar se ja possui um item na lista
    const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id);

    if (hasFilme) {
      alert("Esse filme já esta na lista");
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
    alert("Filme salvo com sucesso!")

  }


  if (loading) {
    return (
      <>
        <div className='filme-info'>
          <h2>Carregando filmes...</h2>
        </div>
      </>
    )
  }
  return (
    <>
      <div className='filme-info'>
        <h1>{filme.title}</h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
        <h3>Sinopse</h3>
        <span>{filme.overview}</span>
        <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

        <div className='area-buttons'>

          <button onClick={salvarFilme}>Salvar</button>

          <button>
            <a target="blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
          </button>

        </div>
      </div>
    </>
  )
}

export default Filme