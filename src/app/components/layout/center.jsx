import styled from 'styled-components';

export function Center ({ main, cross, children }) {
  return (<StyledCenter main cross>{children}</StyledCenter>);
}

const StyledCenter = styled.div`
  display: flex;
  justify-content: ${props => props.main ? 'center' : null};
  align-items: ${props => props.cross ? 'center' : null};
  height: 100%  
`;
