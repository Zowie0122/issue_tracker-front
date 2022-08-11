import { Typography, Link } from '@mui/material';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Zowie Min
      </Link>{' '}
      {currentYear}
    </Typography>
  );
};

export default Footer;
