import { Box, Paper } from '@mui/material';

import Topbar from '../components/Layout/Topbar';
import Sidebar from '../components/Layout/Sidebar';
import Footer from '../components/Layout/Footer';

const SIDEBAR_WIDTH = 240;

interface Props {
  children: JSX.Element | JSX.Element[];
}

export default function Main({ children }: Props) {
  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Sidebar isMobile={false} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        }}
      >
        <Topbar />
        <Paper elevation={3} sx={{ m: 3, p: 3 }}>
          {children}
        </Paper>
        <Footer />
      </Box>
    </Box>
  );
}
