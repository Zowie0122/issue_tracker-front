import { Paper, Grid, Avatar, Typography } from '@mui/material';
import { formatTimeSince } from '../../utils/time';
import { Issue } from '../../types';

interface PropI {
  issue: Issue;
}

const IssueBlock = ({ issue }: PropI) => {
  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Typography variant="h4" color="primary" sx={{ my: 2 }}>
        {issue.title}
      </Typography>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt={issue.issuerName} src={'../../public/avatar_default.png'} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {issue.issuerName}
          </Typography>
          <Typography variant="caption" sx={{ textAlign: 'left' }}>
            {issue.updatedAt && formatTimeSince('last updated at', issue.updatedAt)}
          </Typography>
          {/* <Typography variant="caption">{`updated ${timeSince(issue.updatedAt)} ago`}</Typography>
          <Typography variant="caption">{`status ${issue.status}`}</Typography> */}
        </Grid>
      </Grid>
      <Typography variant="body1" sx={{ my: 2 }}>
        {issue.description}
      </Typography>
    </Paper>
  );
};

export default IssueBlock;
