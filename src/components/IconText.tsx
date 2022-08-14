import { Box, Typography } from '@mui/material';
import { CalendarMonth, DirectionsRun, CheckCircle, Face } from '@mui/icons-material';

import { SxProps } from '@mui/system';

interface PropsI {
  label?: string;
  text: string | undefined | null;
  icon: keyof typeof ICONS;
  sx?: SxProps;
}

const ICONS: {
  [key: string]: JSX.Element;
} = {
  deadline: <CalendarMonth />,
  ongoing: <DirectionsRun />,
  resolved: <CheckCircle />,
  user: <Face />,
};

const IconText = ({ label, text = '', icon, sx }: PropsI) => {
  console.log(icon);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-even', alignItems: 'center', ...sx }}>
      {ICONS[icon]}
      <Typography sx={{}}>{label ? `${label}: ${text}` : text}</Typography>
    </Box>
  );
};

export default IconText;
