import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root{
        --background: #2f2c30;
        --mainColor: #e2ed7e;
        --poiret: font-family: 'Poiret One', cursive;
        --roboto: 'Roboto Flex', sans-serif;
    }
    body{
        background:var(--background);
        color:var(--mainColor);
    }
    h1, h2, h3{
        font-family: 'Roboto Flex', sans-serif;
    }
    h4 {
        font-family: 'Poiret One', cursive;
        font-size: 30px;
        font-weight: 50px;
    }
    input[type="number"] {
        border:var(--mainColor) dotted 2px;
        color:var(--mainColor);
        background-image:none;
        background-color:transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        font-family: 'Kdam Thmor Pro', sans-serif;
        text-align: center;
        width:75px;
        padding: 5px;
    }
    .borderSection {
        border: 1px solid var(--mainColor);
        border-radius: 15px;
        padding:17px
    }
    .save {
        background:var(--background);
        color:var(--mainColor);
        border:1px solid var(--mainColor);
        height:30px;
        width:50px;
    }
    .save:hover{
        background: pink;
        color:var(--background)
    }

`
export default GlobalStyles