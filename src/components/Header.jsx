import React from 'react'
import '../style/header.css'
import { useDataLayerValue } from '../DataLayer';
import logo from '../assets/slogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faTableColumns, faBell} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


function Header({  }) {
    const [{ user }] = useDataLayerValue(); 
    return (
      <div className='header'>
        <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={logo} className='header__logo' alt="Logo" />
        </Link>
        <div className="header__middle">
            <FontAwesomeIcon icon={faHouse} className='header__home'/>
            <div className="header__search">
                <FontAwesomeIcon icon={faMagnifyingGlass} className='header__icon header__searchicon' />
                <input type="text" placeholder='What do you want to play?' />
                <FontAwesomeIcon icon={faTableColumns} className='header__icon header__browse'/>
            </div>
        </div>
        <div className="header__right">
            <FontAwesomeIcon icon={faBell} className='header__icon header__notif' />
            <img src={user?.images[0]?.url} alt="User Avatar" className="header__avatar" />
        </div>
      </div>
    );
  }

  
export default Header
