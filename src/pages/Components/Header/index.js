import { Link } from 'react-router-dom';
import './header.css';

function Header() {
  return (

    <>
      <header>
        <Link className='logo' to='/'>Prime Flix</Link>
        <Link className='favoritos' to='/favoritos'>Meus filmes</Link>
        <h1>Teste Header aa</h1>
      </header>
    </>
  )
}

export default Header;