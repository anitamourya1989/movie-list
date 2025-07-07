import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css"

function NavBar() {
    const location = useLocation();
    return <nav className="navbar">
        <div className="navbar-brand">
            <Link to="/">Movie App</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            <Link to="/favorites" className={`nav-link ${location.pathname === '/favorites' ? 'active' : ''}`}>Favorites</Link>
        </div>
    </nav>
}

export default NavBar