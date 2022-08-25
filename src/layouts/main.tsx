import { Box, Paper } from '@mui/material';

import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Container } from '@mui/system';

const SIDEBAR_WIDTH = 240;

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Main({ children }: Props) {
  return (
    <Box sx={{ display: 'flex', height: '100%', minWidth: '1000px', overflowX: 'auto' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        }}
      >
        <Topbar />
        <Container>
          <Paper elevation={3} sx={{ m: 3, p: 3, backgroundColor: 'secondary.main' }}>
            {children}
          </Paper>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
}
