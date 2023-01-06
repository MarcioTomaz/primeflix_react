import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './home.css'

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=53e1453b68bb42b6602cd438e387035f&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: '53e1453b68bb42b6602cd438e387035f',
          language: 'pt-BR',
          page: 1,
          total_results: 10
        }
      })
      setFilmes(response.data.results.slice(0, 10));
      setLoading(false)
      // console.log(response.data.results.slice(0, 10));
    }
    loadFilmes();
  }, [])


  if (loading) {
    return (
      <>
        <div className='loading'>
          <h2>Carregando filmes...</h2>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='container'>
        <div className='lista-filmes'>
          {filmes.map((filme, index) => {
            return (
              <article className='article-css' key={index}>
                <strong>{filme.title}</strong>
                <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />

                <Link to={`/filme/${filme.id}`}>Acessar</Link>
              </article>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home;