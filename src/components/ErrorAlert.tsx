import { Alert, AlertTitle } from "@mui/material";
import { getErrMsg } from "../utils/errors";

interface IssueTrackerErr {
  status: number;
  data: {
    code: number;
    err: string;
  };
}

function isIssueTrackerErr(obj: any): obj is IssueTrackerErr {
  return (
    typeof obj.status === "number" &&
    typeof obj.data.code === "number" &&
    typeof obj.data.err === "string"
  );
}

const ErrorAlert = ({ errors = [] }: any) => {
  const firstErr = errors.find(
    (error: any) => error && isIssueTrackerErr(error)
  );

  if (firstErr)
    return (
      <Alert severity="error" sx={{ my: 1 }}>
        <AlertTitle>Error</AlertTitle>
        {getErrMsg(firstErr.data.code)}
      </Alert>
    );

  return <></>;
};

export default ErrorAlert;
