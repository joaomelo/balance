import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Typography, Box, Link } from '@material-ui/core';
import NotFoundSvg from './not-found.svg';

export function NotFoundPageView () {
  return (
    <Wrapper>
      <NotFoundSvg />
      <Box
        mt={2}
        textAlign="center"
      >
        <Typography variant="h6">
          404 | Page Not Found
        </Typography>
        <Link
          component={RouterLink}
          to="/"
        >
          Go to Home Page
        </Link>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
`;
