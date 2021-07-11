import styled from 'styled-components';
import { Typography, Box } from '@material-ui/core';
import NotFoundSvg from './not-found.svg';

export function NotFoundPageView () {
  return (
    <Wrapper>
      <NotFoundSvg />
      <Box mt={2}>
        <Typography
          variant="caption"
          display="block"
          align="center"
        >
          Page Not Found
        </Typography>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  /* max-width: 500px; */
`;
