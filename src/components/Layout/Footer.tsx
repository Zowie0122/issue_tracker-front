import { Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://github.com/Zowie0122">
        Zowie Min
      </Link>{' '}
      {currentYear}
    </Typography>
  );
};

export default Footer;
