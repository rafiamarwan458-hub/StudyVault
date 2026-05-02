import "./About.css"
import { useContext } from "react"
import { ThemeContext } from "./ThemeContext"

const About = () => {
  const {darkTheme} = useContext(ThemeContext);
  return (
    <div id='about_box' className={darkTheme ? "dark" : ""}>

      <br />
      <br />
      
      <p>This application is a productivity tool that allows users to create, edit, and manage tasks and notes.<br/>It uses React for the user interface and Redux Toolkit for state management, ensuring efficient data handling.<br/>Data is stored locally in the browser, so your information stays safe and easily accessible.</p>
      
    </div>
  )
}

export default About