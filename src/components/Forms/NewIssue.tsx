import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI, GroupedUsersByDepartment } from '../../types';

interface PropsI extends FromPropsI {
  usersGroupedByDepartment: GroupedUsersByDepartment;
}

const NewIssue = ({ usersGroupedByDepartment, onCancel, onSubmit, submitting }: PropsI) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'Title',
          name: 'title',
          rules: getValidations(['required']),
          minRows: 2,
          maxRows: 5,
        },
        {
          type: 'text',
          label: 'Description',
          name: 'description',

          minRows: 6,
          maxRows: 10,
        },
        {
          type: 'groupedSelection',
          label: 'Receiver',
          name: 'receiver',
          rules: getValidations(['required']),
          groups: usersGroupedByDepartment,
        },
        {
          type: 'dateTimePicker',
          label: 'Deadline',
          name: 'dueAt',
          disablePast: true,
          rules: getValidations(['required']),
        },
      ]}
      buttonLabel="Add"
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitting={submitting}
      disabled={usersGroupedByDepartment.length === 0}
    />
  );
};

export default NewIssue;
