import { createGlobalStyle} from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        font-family: Tahoma, Helvetica, Arial, Roboto, sans-serif;
        background: ${({ theme }) => theme.body};
        color: ${({ theme }) => theme.text};
        transition: all 0.15s linear;
    }
`;