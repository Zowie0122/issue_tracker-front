import { Box, Dialog as MuiDialog, DialogContent, DialogTitle } from '@mui/material';

import ErrorAlert from '../ErrorAlert';
import Spinner from '../Spinner';

// TODO: add prop interface
const Dialog = ({ open, onClose, loading, title, content, errors }: any) => {
  return (
    <MuiDialog open={open} onClose={onClose} scroll="paper" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      {loading ? (
        <Spinner />
      ) : (
        <DialogContent>
          {errors && <ErrorAlert errors={errors} />}
          {content}
        </DialogContent>
      )}
    </MuiDialog>
  );
};

export default Dialog;
