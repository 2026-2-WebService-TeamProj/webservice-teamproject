import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <Link to="/" className="logo-font">
          travelog
        </Link>
        <span className="attribution">
          Team 08 웹서비스 팀 프로젝트 · Conduit(RealWorld) 기반
        </span>
      </div>
    </footer>
  );
}
