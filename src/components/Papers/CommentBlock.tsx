import { Paper, Grid, Avatar, Typography } from '@mui/material';
import { formatTimeSince } from '../../utils/time';
import { Comment } from '../../types';

interface PropI {
  avatarLink?: string;
  comment: Comment;
}

const CommentBlock = ({ avatarLink = '../../public/avatar_default.png', comment }: PropI) => {
  return (
    <Paper sx={{ p: 2, mt: 1, width: '60%' }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt={comment.issuerName} src={avatarLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant="subtitle1" sx={{ m: 0, textAlign: 'left' }}>
            {comment.issuerName}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'left', wordWrap: 'break-word' }}>
            {comment.contents}
          </Typography>
          <Typography variant="caption" sx={{ textAlign: 'left' }}>
            {formatTimeSince('commented at', comment.createdAt)}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CommentBlock;
