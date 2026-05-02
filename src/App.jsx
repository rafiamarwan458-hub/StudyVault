import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './MyComponents/Home';
import Notes from './MyComponents/Notes';
import Tasks from './MyComponents/Tasks';
import Create from './MyComponents/Create';
import About from './MyComponents/About';
import NotFound from './MyComponents/NotFound';
import Navbar from './MyComponents/Navbar';
import Footer from './MyComponents/Footer';
import View from './MyComponents/View';
import moon from './MyComponents/moon.jpg';
import sun from './MyComponents/sun.png';
import { useEffect, useState } from 'react';
import { ThemeContext } from './MyComponents/ThemeContext';

const Router = createBrowserRouter([
  {
    path:"/",
    element: <>
    <Navbar />
    <Home />
    <Footer />
    </>
  },
  {
    path:"/notes",
    element: <>
    <Navbar />
    <Notes />
    <Footer />
    </>
  },
  {
    path:"/viewNote/:id",
    element: <>
    <Navbar />
    <View />
    <Footer />
    </>
  },
  {
    path:"/viewTask/:id",
    element: <>
    <Navbar />
    <View />
    <Footer />
    </>
  },
  {
    path:"/tasks",
    element: <>
    <Navbar />
    <Tasks />
    <Footer />
    </>
  },
  {
    path:"/create",
    element: <>
    <Navbar />
    <Create />
    <Footer />
    </>
  },
  {
    path:"/about",
    element: <>
    <Navbar />
    <About />
    <Footer />
    </>
  },
  {
    path:"*",
    element: <>
    <Navbar />
    <NotFound />
    <Footer />
    </>
  },
]);
  

function App() {

  const [darkTheme, setDarkTheme] = useState("false");

  useEffect(() => {
    if(darkTheme){
      document.body.classList.add("dark");
    }
    else{
      document.body.classList.remove("dark");
    }
  }, [darkTheme]);
  

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
    <div id='app_container' className={darkTheme ? "dark" : ""}>
      <button id='theme_btn' onClick={() => setDarkTheme(!darkTheme)}>
        <img src={darkTheme ? sun : moon} alt="dark-theme" width={60} height={50} className={darkTheme ? "dark" : ""}/>
      </button>
      <RouterProvider router={Router} />
    </div>
  </ThemeContext.Provider>
  )
}

export default App
