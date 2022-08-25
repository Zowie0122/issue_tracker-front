import { Box, Typography } from '@mui/material';
import { CalendarMonth, DirectionsRun, CheckCircle, Face } from '@mui/icons-material';
import { GenericPropI } from '../types';

interface PropsI extends GenericPropI {
  label?: string;
  text: string | undefined | null;
  icon: keyof typeof ICONS;
}

const ICONS: {
  [key: string]: JSX.Element;
} = {
  deadline: <CalendarMonth />,
  ongoing: <DirectionsRun />,
  resolved: <CheckCircle />,
  user: <Face />,
};

const IconText = ({ sx, label, text = '', icon }: PropsI) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-even', alignItems: 'center', ...sx }}>
      {ICONS[icon]}
      <Typography sx={{}}>{label ? `${label}: ${text}` : text}</Typography>
    </Box>
  );
};

export default IconText;
