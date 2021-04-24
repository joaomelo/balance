import styled from 'styled-components';

export const Spinner = styled.div`
  --thickness: var(--size-100);
  --size: var(--size-400);

  border: var(--thickness) solid white;
  border-top: var(--thickness) solid var(--secondary-600);
  border-radius: 50%;
  width: var(--size);
  height: var(--size);
  animation: spin 3s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
