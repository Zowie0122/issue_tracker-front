import { Paper, Grid, Avatar, Typography } from "@mui/material";
import { timeSince } from "../../utils/time";

const IssueBlock = ({ issue }: any) => {
  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Typography variant="h4">{issue.title}</Typography>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt={issue.issuer} src={"../../public/avatar_default.png"} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant="h5">{issue.issuer}</Typography>
          <Typography variant="body2">{issue.description}</Typography>
          <Typography variant="caption">{`posted ${timeSince(
            issue.createdAt
          )} ago`}</Typography>
          <Typography variant="caption">{`updated ${timeSince(
            issue.updatedAt
          )} ago`}</Typography>
          <Typography variant="caption">{`status ${issue.status}`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default IssueBlock;
