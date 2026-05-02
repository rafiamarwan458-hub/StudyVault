import './Navbar.css'
import { Link } from "react-router-dom";
import Logo from "./Logo.png"

const Navbar = () => {
  return (
    <div id="nav_container">

      <div id='logo_box'>
        <img src={Logo} alt="Logo" />
      </div>

        <ul id="nav_list">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/create">Create</Link></li>
          <li><Link to="/tasks">Tasks</Link></li>
          <li><Link to="/notes">Notes</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      
    </div>
  )
}

export default Navbar