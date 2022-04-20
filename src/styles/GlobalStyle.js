import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
	--primary: #3d56b2;
	--black: #062C30;
    --white: #f5f5f5;
    --red: #f05454;
	--bg-1: #5c7aea;
	--bg-2: #14279b;
	--bg-3: #e6e6e6;
}

    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;
        list-style: none;
        font-family: 'Open Sans', sans-serif;
        font-size: 1.1rem;
    }
    body{
        background-color: #ccd6f6;
    }
    a{
        font-family: inherit;
        color: var(--cyan-blue);
        font-size: inherit;
    }
`;

export default GlobalStyle;
