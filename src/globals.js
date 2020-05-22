import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  nav{
    background: ${({ theme }) => theme.nav};
    height: 80px;
    padding: 25px;
  }

  input{
    padding: 5px;
    margin: 10px;
  }

  a{
    text-decoration: none;
    color: white;
  }

  button{
    background: ${({ theme }) => theme.button};
    border: none;
    padding: 10px;
    border-radius: 5px;
    color: white;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    padding: 0;
    font-family: sans-serif;
    transition: all 0.25s linear;
    text-align: center;
  }

  table {
    width: 100%;
  }

`;
