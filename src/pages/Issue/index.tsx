import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { useGetIssuesQuery, useAddIssueMutation } from '../../services/issuesApi';
import { useGetSelfQuery, useGetUsersQuery } from '../../services/usersApi';
import { useGetDepartmentsQuery } from '../../services/departmentsApi';

import Spinner from '../../components/Spinner';
import ErrorAlert from '../../components/ErrorAlert';
import ActionTable, { Column } from '../../components/Tables/ActionTable';
import DialogPopup from '../../components/Dialog';
import NewIssueForm from './NewIssueForm';

import { IssueT, IssueListRowT, KeyValuePairObj } from '../../types';
import { getLocalTimeString } from '../../utils/time';
import { groupUsersByDepartment } from '../../utils/users';
import { ISSUE_LABLE } from '../../utils/constants';
import { toShortStr } from '../../utils/format';
import { GroupedUsersByDepartment } from '../../types';

type PropsI = {
  tag?: 'received' | 'issued' | 'all';
};

const List = ({ tag = 'all' }: PropsI) => {
  const navigate = useNavigate();

  const { data: currentUser } = useGetSelfQuery({});

  const {
    data: issues,
    isLoading: loadingIssues,
    error: errorIssues,
    isFetching: fetchingIssues,
  } = useGetIssuesQuery({
    tag,
    id: currentUser.id,
  });

  const [showNewIssue, setShowNewIssue] = useState<boolean>(false);
  const [addIssue, { isSuccess: isSuccessNewIssue, error: errorNewIssue, isLoading: savingNewIssue }] =
    useAddIssueMutation();
  const [addIssueErr, setAddUserErr] = useState<typeof errorNewIssue>(undefined);

  const { data: users, isLoading: loadingUsers, error: errorUsers } = useGetUsersQuery({});
  const { data: departments, isLoading: loadingDepartment, error: errorDepartment } = useGetDepartmentsQuery({});
  const [usersGroupedByDepartment, setUsersGroupedByDepartment] = useState<GroupedUsersByDepartment>([]);

  const [rows, setRows] = useState<{}[]>([]);

  useMemo(() => {
    if (!loadingDepartment && !loadingUsers) {
      setUsersGroupedByDepartment(groupUsersByDepartment(users, departments, currentUser.id));
    }
  }, [loadingDepartment, loadingUsers]);

  // add new issue
  const handleSubmit = async (data: KeyValuePairObj) => {
    await addIssue(data);
  };

  const onCloseNewIssue = () => {
    setShowNewIssue(false);
    setAddUserErr(undefined);
  };

  useMemo(() => {
    if (!savingNewIssue && isSuccessNewIssue) setShowNewIssue(false);
  }, [savingNewIssue]);

  // since redux toolkit RTK doesn't support reset cache yet, use local state to track and reset the error
  useEffect(() => {
    setAddUserErr(errorNewIssue);
  }, [errorNewIssue]);

  // table columns and rows
  const columns: Column[] = [
    { id: 'id', label: 'ID' },
    { id: 'title', label: 'Title', format: (value: string) => toShortStr(value, 120) },
    {
      id: 'issued',
      label: 'From',
    },
    {
      id: 'received',
      label: 'To',
    },
    {
      id: 'deadline',
      label: 'Deadline',
      format: (value: string) => getLocalTimeString(value),
    },
    {
      id: 'status',
      label: 'Status',
      format: (value: number) => ISSUE_LABLE[value],
    },
    {
      id: 'detail',
      label: 'Detail',
    },
  ].filter((column) => column.id !== tag);

  useMemo(() => {
    if (!loadingIssues && !fetchingIssues && issues && issues.length > 0) {
      const _rows = issues
        .map((issue: IssueT) => ({
          id: issue.id,
          issuerId: issue.issuerId,
          title: issue.title,
          issued: issue.issuerName,
          received: issue.receiverName,
          deadline: issue.dueAt,
          status: issue.status,
          detail: {
            isAction: true,
            icon: 'detail',
            iconSize: 'small',
            callback: (row: IssueListRowT) => {
              navigate(`/issues/${row && row.id}`);
            },
          },
        }))
        .filter((_row: any, key: string) => key !== tag);

      setRows(_rows);
    }
  }, [loadingIssues, fetchingIssues]);

  if (loadingIssues || fetchingIssues) return <Spinner />;
  else if (errorIssues) return <ErrorAlert errors={[errorIssues]} />;

  return (
    <>
      <Button sx={{ m: 2 }} variant="contained" onClick={() => setShowNewIssue(true)}>
        New
      </Button>
      <ActionTable columns={columns} rows={rows} loading={loadingIssues} />
      <DialogPopup
        open={showNewIssue}
        onClose={onCloseNewIssue}
        title="New Issue"
        content={
          <NewIssueForm
            usersGroupedByDepartment={usersGroupedByDepartment}
            onCancel={onCloseNewIssue}
            onSubmit={handleSubmit}
            submitting={savingNewIssue}
          />
        }
        errors={(addIssueErr || errorUsers || errorDepartment) && [addIssueErr, errorUsers, errorDepartment]}
      />
    </>
  );
};

export default List;
