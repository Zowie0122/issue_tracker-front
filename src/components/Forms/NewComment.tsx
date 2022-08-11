import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI } from '../../types';

const NewComment = ({ saving, handleCancel, handleSubmit }: FromPropsI) => {
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
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      saving={saving}
    />
  );
};

export default NewComment;
