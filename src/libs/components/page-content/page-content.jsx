import { Box } from '@material-ui/core';

export function PageContent (props) {
  return (
    <Box
      display="flex"
      flexGrow={1}
      width="100%"
      flexDirection="column"
      {...props}
    />
  );
}
