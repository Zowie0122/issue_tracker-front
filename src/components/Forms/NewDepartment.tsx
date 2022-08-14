import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI } from '../../types';

const NewDepartment = ({ onCancel, onSubmit, submitting }: FromPropsI) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'Name',
          name: 'name',
          rules: getValidations(['required']),
        },
      ]}
      buttonLabel="Add"
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitting={submitting}
    />
  );
};

export default NewDepartment;
