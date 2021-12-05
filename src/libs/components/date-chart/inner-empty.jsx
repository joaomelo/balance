import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import InnerEmptySvg from './inner-empty.svg';

export function InnerEmpty () {
  return (
    <Wrapper>
      <InnerEmptySvg />
      <Box mt={2}>
        <Typography
          variant="caption"
          display="block"
          align="center"
        >
          No data available to draw chart
        </Typography>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 300px;
`;
