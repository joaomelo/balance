import styled from 'styled-components';

export const Center = styled.div`
  display: flex;
  justify-content: ${props => props.x ? 'center' : null};
  align-items: ${props => props.y ? 'center' : null};
  height: 100%  
`;
