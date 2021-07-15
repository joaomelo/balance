import { Link as RouterLink } from 'react-router-dom';
import { Typography, Box, Link } from '@material-ui/core';
import { PageContent } from '../../../app/components/page-content';
import NotFoundSvg from './not-found.svg';

export function NotFoundPageView () {
  return (
    <PageContent
      maxWidth={500}
      justifyContent="center"
      alignItems="center"
    >
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
    </PageContent>
  );
}
