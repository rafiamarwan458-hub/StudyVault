import "./Home.css"
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

const Home = () => {
  const { darkTheme } = useContext(ThemeContext)
  return (
    <div id='Home_box' className={darkTheme ? "dark" : ""}>

      <br />
      <br />

      <h1>Keep your Notes and Tasks organized here on one single place.</h1>
      <h2>Stay organized, Stay productive.<br />Create, manage, and organize your notes and tasks effortlessly.</h2>
      
    </div>
  )
}

export default Home