import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { SxProps } from '@mui/system';

interface Props {
  sx?: SxProps;
  title?: string;
  content: JSX.Element | JSX.Element[];
  actions?: JSX.Element | JSX.Element[];
}

const ContentCard = ({ sx, content, actions }: Props) => {
  return (
    <Card sx={{ ...sx }}>
      <CardContent>{content}</CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default ContentCard;
