import { Box } from '@mui/material';

import Topbar from '../components/Layout/Topbar';
import ContentCard from '../components/ContentCard';
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
        <ContentCard sx={{ height: '90%' }} content={children} />
        <Footer />
      </Box>
    </Box>
  );
}
