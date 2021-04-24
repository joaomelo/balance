import { createGlobalStyle } from 'styled-components';
import { ResetStyles } from './reset';
import { TokenStyles } from './token';

export const GlobalStyles = createGlobalStyle`
  ${ResetStyles}
  ${TokenStyles}
`;
