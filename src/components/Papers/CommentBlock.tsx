import { Paper, Grid, Avatar, Typography } from "@mui/material";
import { timeSince } from "../../utils/time";

const CommentBlock = ({
  avatarLink = "../../public/avatar_default.png",
  comment,
}: any) => {
  return (
    <Paper sx={{ p: 2, mt: 1 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar alt={comment.issuer} src={avatarLink} />
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Typography variant="h4" sx={{ m: 0, textAlign: "left" }}>
            {comment.issuer}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            {comment.contents}
          </Typography>
          <Typography
            variant="caption"
            sx={{ textAlign: "left" }}
          >{`posted ${timeSince(comment.createdAt)} ago`}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CommentBlock;
