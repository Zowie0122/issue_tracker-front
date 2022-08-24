import IssueTrackerForm from '../../components/Forms/Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI } from '../../types';

const NewComment = ({ onCancel, onSubmit, submitting }: FromPropsI) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'Contents',
          name: 'contents',
          rules: getValidations(['required']),
          minRows: 2,
          maxRows: 5,
        },
      ]}
      buttonLabel="Add"
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitting={submitting}
    />
  );
};

export default NewComment;
