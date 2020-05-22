import React, { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme";
import GlobalTheme from "./globals";
import styled from "styled-components";
import App from './App.js';
import './App.css';
// import 'materialize-css/dist/css/materialize.min.css'

function Inicial() {
  const [theme, setTheme] = useState("light");

  const toggleThemeLight = () => {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
  };

  const toggleThemeDark = () => {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Fragment>
        <GlobalTheme />
        <App></App>
        <div style={{textAlign:"center"}}>
            <button className="waves-effect
                        waves-light
                        btn
                        margin">
                        Download the tasks
            </button>
            <button className="waves-effect
                        waves-light
                        btn
                        margin">
                        Theme default
            </button>
                <button className="waves-effect
                        waves-light
                        btn
                        margin"
                        onClick={toggleThemeLight}>
                        Theme light
            </button>
            <button className="waves-effect
                        waves-light
                        btn
                        margin"
                        onClick={toggleThemeDark}>
                        Theme dark
            </button>
        </div>
      </Fragment>
    </ThemeProvider>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 30px;
  margin-left: 15px;
`;

const ButtonChange = styled.button`
  width: 100px;
  height: 40px;
  margin-right: 20px;
  border-radius: 10px;
`;

export default Inicial;
