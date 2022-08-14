import { Paper, Box, Stack, Button, Typography } from '@mui/material';

import IconText from '../IconText';
import AvatarName from '../AvatarName';
import { formatTimeSince, getLocalTimeString } from '../../utils/time';
import { ISSUE_LABLE } from '../../utils/constants';
import { Issue } from '../../types';

interface PropI {
  issue: Issue;
}

const IssueBlock = ({ issue }: PropI) => {
  return (
    <Paper sx={{ p: 3, my: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
        <Stack direction="row" spacing={2}>
          {issue.status !== undefined && (
            <IconText
              text={ISSUE_LABLE[issue.status]}
              icon={ISSUE_LABLE[issue.status] === 'Ongoing' ? 'ongoing' : 'resolved'}
            />
          )}
          {issue.dueAt && <IconText label="Deadline" text={getLocalTimeString(issue.dueAt)} icon="deadline" />}
          {issue.receiverName && <IconText label="Assigned to" text={issue.receiverName} icon="user" />}
        </Stack>
      </Box>
      <Typography variant="h6" color="primary" sx={{ my: 2, fontWeight: 'bold' }}>
        {issue.title}
      </Typography>
      {issue.issuerName && (
        <AvatarName
          name={issue.issuerName}
          caption={issue.updatedAt && formatTimeSince('last updated ', issue.updatedAt)}
        />
      )}
      <Typography variant="body1" sx={{ my: 2 }}>
        {issue.description}
      </Typography>
    </Paper>
  );
};

export default IssueBlock;
