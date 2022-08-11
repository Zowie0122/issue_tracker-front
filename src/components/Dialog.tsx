import { Dialog as MuiDialog, DialogContent, DialogTitle } from '@mui/material';

import ErrorAlert from './ErrorAlert';
import Spinner from './Spinner';

interface PropI {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  errors?: any[];
  title?: string;
  content: JSX.Element | JSX.Element[];
}

const Dialog = ({ open, onClose, loading, title, content, errors }: PropI) => {
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
