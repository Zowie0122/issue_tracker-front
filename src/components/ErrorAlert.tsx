import { Alert, AlertTitle } from '@mui/material';
import { getErrMsg } from '../utils/errors';
import { GenericPropI, isIssueTrackerErr } from '../types';

interface PropI extends GenericPropI {
  errors: any[];
}

const ErrorAlert = ({ sx, errors = [] }: PropI) => {
  const firstErr = errors.find((error: any) => error && isIssueTrackerErr(error));

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
