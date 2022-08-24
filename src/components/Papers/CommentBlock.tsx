import { Paper, Typography } from '@mui/material';
import { formatTimeSince } from '../../utils/time';
import AvatarName from '../AvatarName';
import { CommentT } from '../../types';

interface PropI {
  comment: CommentT;
}

const CommentBlock = ({ comment }: PropI) => {
  return (
    <Paper sx={{ p: 3, mt: 1, width: '60%' }}>
      <AvatarName name={comment.issuerName} caption={formatTimeSince('commented ', comment.createdAt)} />

      <Typography variant="body2" sx={{ textAlign: 'left', wordWrap: 'break-word', p: 1 }}>
        {comment.contents}
      </Typography>
    </Paper>
  );
};

export default CommentBlock;
