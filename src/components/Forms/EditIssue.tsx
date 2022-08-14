import IssueTrackerForm from './Base';
import { getValidations } from '../../utils/validation';
import { FromPropsI, FormOptions, GroupedUsersByDepartment } from '../../types';

interface PropsI extends FromPropsI {
  issue: {
    title: string;
    description: string;
    receiverId: string;
    dueAt: Date;
    status: 0 | 1;
  };
  statusList: FormOptions;
  usersGroupedByDepartment: GroupedUsersByDepartment;
}

const EditIssue = ({ issue, usersGroupedByDepartment, statusList, submitting, onCancel, onSubmit }: PropsI) => {
  return (
    <IssueTrackerForm
      items={[
        {
          type: 'text',
          label: 'Title',
          name: 'title',
          defaultValue: issue.title,
          rules: getValidations(['required']),
          minRows: 2,
          maxRows: 5,
        },
        {
          type: 'text',
          label: 'Description',
          name: 'description',
          defaultValue: issue.description,
          minRows: 6,
          maxRows: 10,
        },
        {
          type: 'groupedSelection',
          label: 'Receiver',
          name: 'receiver',
          defaultValue: issue.receiverId,
          rules: getValidations(['required']),
          groups: usersGroupedByDepartment,
        },
        {
          type: 'dateTimePicker',
          label: 'Deadline',
          name: 'dueAt',
          defaultValue: issue.dueAt,
          disablePast: true,
          rules: getValidations(['required']),
        },
        {
          type: 'selection',
          label: 'Status',
          name: 'status',
          defaultValue: issue.status,
          rules: getValidations(['required']),
          options: statusList,
        },
      ]}
      buttonLabel="Save"
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitting={submitting}
      disabled={usersGroupedByDepartment.length === 0}
    />
  );
};

export default EditIssue;
