import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../hooks'

function Navbar() {
  const { isAuth, authUser } = useAuth()

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <NavLink activeClassName="active" className="navbar-brand" to="/" end>
          travelog
        </NavLink>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-link" to="/" end>
              홈
            </NavLink>
          </li>
          {isAuth && (
            <>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/editor">
                  <i className="ion-compose" />
                  &nbsp;새 글
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/settings">
                  <i className="ion-gear-a" />
                  &nbsp;설정
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/@${authUser?.username}`}>
                  <img style={{ width: 24, height: 24, marginRight: 4, borderRadius: '50%' }} src={authUser?.image} />
                  {authUser?.username}
                </NavLink>
              </li>
            </>
          )}
          {!isAuth && (
            <>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/register">
                  회원가입
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/login">
                  로그인
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
