import { React } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo/logo.svg';

function Header(props) {

  const { email, linkPath, linkTitle, onLogout } = props

  return (
    <div className="header">
      <img
        src={logo}
        alt="around the US logo"
        className="header__logo"
      />
      <div className='header__container'>
        <p className='header__email'>{email}</p>
        <Link className='header__link' to={linkPath} onClick={onLogout} >{linkTitle}</Link>
      </div>
    </div>
  )
}

export default Header;
