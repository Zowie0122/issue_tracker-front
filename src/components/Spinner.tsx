import { Box, CircularProgress } from '@mui/material';
import { GenericPropI } from '../types';

const Spinner = ({ sx }: GenericPropI) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      ...sx,
    }}
  >
    <CircularProgress />
  </Box>
);

export default Spinner;
