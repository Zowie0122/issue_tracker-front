import { Grid, Avatar, Typography } from '@mui/material';
import { SxProps } from '@mui/system';

interface PropsI {
  name: string;
  caption?: string;
  nameSx?: SxProps;
  captionSx?: SxProps;
}

const stringToColor = (string: string): string => {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
};

const stringAvatar = (name: string): {} => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
};

const AvatarName = ({ name, caption, nameSx, captionSx }: PropsI) => {
  return (
    <Grid container wrap="nowrap" spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <Avatar alt={name} src={'../../public/avatar_default.png'} {...stringAvatar(name)} />
      </Grid>
      <Grid justifyContent="left" item xs zeroMinWidth>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', ...nameSx }}>
          {name}
        </Typography>
        {caption && (
          <Typography variant="caption" sx={{ textAlign: 'left', ...captionSx }}>
            {caption}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default AvatarName;
