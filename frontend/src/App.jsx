import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home, Settings, Editor, Article, Profile, Auth } from './pages'
import { AuthRoute, GuestRoute, Navbar } from './components'

import './App.css'

function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <GuestRoute path="/register" element={<Auth key="register" />} />
          <GuestRoute path="/login" element={<Auth key="login" />} />
          <AuthRoute path="/settings" element={<Settings />} />
          <AuthRoute path="/editor" element={<Editor />} />
          <Route path="/editor/:slug" element={<Editor />} />
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/profile/:username" element={<Profile />} />
          <AuthRoute path="/@:username" element={<Profile />} />
        </Routes>
      </main>
      <footer>
        <div className="container">
          <Link to="/" className="logo-font">
            travelog
          </Link>
          <span className="attribution">
            Team 08 여행 후기 블로그 · <a href="https://github.com/gothinkster/realworld">RealWorld(Conduit)</a> 기반,
            원본 코드 &amp; 디자인 MIT 라이선스 (<a href="https://thinkster.io">Thinkster</a>)
          </span>
        </div>
      </footer>
    </Router>
  )
}

export default App
