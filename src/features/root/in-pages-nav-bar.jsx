import styled from 'styled-components';
import { Link } from 'react-router-dom';

export function InPagesNavBar () {
  return (
    <StyledNav>
      <Link to="/i/accounts" >Accounts</Link>
      <span> | </span>
      <Link to="/i/balances" >Balances</Link>
      <span> | </span>
      <Link to="/i/history" >History</Link>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  border-bottom: 1px dashed var(--neutral-900);
  padding: 0 var(--size-200);
`;
