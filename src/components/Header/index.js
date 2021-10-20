import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {VscHome} from 'react-icons/vsc'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcase} from 'react-icons/bs'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="mobile-container">
          <ul className="nav-menu-list-mobile">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                className="large-logo"
                alt="website logo"
              />
            </Link>
            <div className="icon-container">
              <Link to="/" className="link-item">
                <li className="nav-menu-item-mobile">
                  <VscHome className="nav-icon-image" />
                </li>
              </Link>
              <Link to="/Jobs" className="link-item">
                <li className="nav-menu-item-mobile">
                  <BsBriefcase className="nav-icon-image" />
                </li>
              </Link>
              <button
                type="button"
                className="nav-menu-item-mobile-button"
                onClick={onClickLogout}
              >
                <FiLogOut className="nav-icon-image" />
              </button>
            </div>
          </ul>
        </div>
        <div className="large-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="large-logo"
              alt="website logo"
            />
          </Link>

          <ul className="nav-menu">
            <li className="nav-menu-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-menu-item">
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
