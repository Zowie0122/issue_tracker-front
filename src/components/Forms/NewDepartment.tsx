import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI } from '../../types';

const NewDepartment = ({ saving, handleCancel, handleSubmit }: FromPropsI) => {
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
      onCancel={handleCancel}
      onSubmit={handleSubmit}
      saving={saving}
    />
  );
};

export default NewDepartment;
