import React, { Fragment, useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, defaultTheme } from "./theme";
import GlobalTheme from "./globals";
import App from './App.js';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css'

function Inicial() {
  const [theme, setTheme] = useState("default");

  const toggleThemeDefault = () => {
    window.localStorage.setItem("theme", "default");
    setTheme("default");
  };

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

  const selectTheme = theme => {
    if (theme === "default") {
      return defaultTheme;
    } else if (theme === "light") {
      return lightTheme;
    } else {
      return darkTheme;
    }
  }

  return (
    <ThemeProvider theme={selectTheme(theme)}>
      <Fragment>
        <GlobalTheme />
        <Header changeTheme={this.props.changeTheme} toggleThemeDefault={toggleThemeDefault} toggleThemeLight={toggleThemeLight} toggleThemeDark={toggleThemeDark}></Header>
        <App></App>
      </Fragment>
    </ThemeProvider>
  );
}

export default Inicial;
