import { useEffect, useState } from 'react'
import api from '../../services/api'

//URL DA API: https://api.themoviedb.org/3/movie/now_playing?api_key=53e1453b68bb42b6602cd438e387035f&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: '53e1453b68bb42b6602cd438e387035f',
          language: 'pt-BR',
          page: 1,
        }
      })
      console.log(response.data.results);

    }
    loadFilmes();
  }, [])

  return (
    <>
      <div>
        <h1>Bem vindo a home!</h1>
      </div>
    </>
  )
}

export default Home;