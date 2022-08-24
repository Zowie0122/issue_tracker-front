import { useState, useMemo, useEffect } from 'react';

import { Button } from '@mui/material';

import { useGetSelfQuery, useGetUsersQuery, useAddUserMutation, useUpdateUserMutation } from '../../services/usersApi';
import { useGetDepartmentsQuery } from '../../services/departmentsApi';

import Spinner from '../../components/Spinner';
import ErrorAlert from '../../components/ErrorAlert';
import ActionTable, { Column } from '../../components/Tables/ActionTable';
import DialogPopup from '../../components/Dialog';
import NewUserForm from './NewUserForm';
import EditUserForm from './EditUserForm';

import { UserT, DepartmentT, FormOptionsT, KeyValuePairObj } from '../../types';
import { getLocalTimeString } from '../../utils/time';
import { PERMISSIONS, USER_STATUS, ROLE_LABLE, USER_STATUS_LABLE } from '../../utils/constants';
import { toShortStr } from '../../utils/format';

const rolesList = Object.values(PERMISSIONS);
const statusList = Object.values(USER_STATUS);

const List = () => {
  // we have admin route guard, so this sopposed to be save
  const { data: currentUser } = useGetSelfQuery({});

  const { data: users, isLoading: loadingUsers, error: errorUsers, isFetching: fetchingUsers } = useGetUsersQuery({});
  const { data: departments, isLoading: loadingDepartments, error: errorDepartments } = useGetDepartmentsQuery({});
  const [departmentsList, setDepartmentsList] = useState<FormOptionsT>([]);

  const [showNewUserForm, setShowNewUserForm] = useState<boolean>(false);
  const [addUser, { isLoading: savingNewUserForm, isSuccess: successNewUserForm, error: errorNewUserForm }] =
    useAddUserMutation();
  const [addNewUserFormErr, setAddNewUserFormErr] = useState<typeof errorNewUserForm>(undefined);

  const [showEditUser, setShowEditUser] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined);
  const [updateUser, { isLoading: updatingUser, isSuccess: successUpdateUser, error: errorUpdateUser }] =
    useUpdateUserMutation();
  const [updateUserErr, setUpdateUserErr] = useState<typeof errorUpdateUser>(undefined);

  const [rows, setRows] = useState<[]>([]);

  // add new user
  // prepare the departments selection
  useMemo(() => {
    if (!loadingDepartments && departments) {
      setDepartmentsList(
        departments.map((department: DepartmentT) => department && { label: department.name, value: department.id })
      );
    }
  }, [loadingDepartments]);

  const handleNewUserFormSubmit = async (data: KeyValuePairObj) => {
    await addUser(data);
  };

  const onCloseNewUserForm = () => {
    setShowNewUserForm(false);
    setAddNewUserFormErr(undefined);
  };

  useMemo(() => {
    if (!savingNewUserForm && successNewUserForm) setShowNewUserForm(false);
  }, [savingNewUserForm]);

  // since redux toolkit RTK doesn't support reset cache yet, use local state to track and reset the error
  useEffect(() => {
    setAddNewUserFormErr(errorNewUserForm);
  }, [errorNewUserForm]);

  // update a user
  const handleUpdateUserSubmit = async (data: KeyValuePairObj) => {
    await updateUser({ id: selectedUser, payload: data });
  };

  const onCloseEditUser = () => {
    setShowEditUser(false);
    setUpdateUserErr(undefined);
  };

  useMemo(() => {
    if (!updatingUser && successUpdateUser) setShowEditUser(false);
  }, [updatingUser]);

  useEffect(() => {
    setUpdateUserErr(errorUpdateUser);
  }, [errorUpdateUser]);

  // table columns and rows
  const columns: Column[] = [
    { id: 'id', label: 'ID', format: (value: string) => toShortStr(value, 8) },
    { id: 'firstName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    {
      id: 'email',
      label: 'Email',
    },
    {
      id: 'role',
      label: 'Role',
      format: (value: number) => ROLE_LABLE[value],
    },
    {
      id: 'department',
      label: 'Department',
    },
    {
      id: 'status',
      label: 'Status',
      format: (value: number) => USER_STATUS_LABLE[value],
    },
    {
      id: 'createdAt',
      label: 'Created At',
      format: (value: string) => getLocalTimeString(value),
    },
    {
      id: 'edit',
      label: '',
    },
  ];

  useMemo(() => {
    if (
      !loadingUsers &&
      !loadingDepartments &&
      !fetchingUsers &&
      users && // TODO: fix the type
      users.length > 0 &&
      Array.isArray(departments) &&
      departments.length > 0
    ) {
      setRows(
        users
          .map((user: UserT) => ({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role_id,
            department: departments.find(
              (department: DepartmentT) => department && department.id === user.department_id
            ).name,
            status: user.status,
            createdAt: user.created_at,
            edit: {
              isAction: true,
              icon: 'edit',
              iconSize: 'small',
              callback: (row: any) => {
                setSelectedUser(row?.id);
                setShowEditUser(true);
              },
            },
          }))
          .filter((row: any) => row.id !== currentUser.id) // remove the current admin from the list
      );
    }
  }, [loadingUsers, loadingDepartments, fetchingUsers]);

  console.log(rows);

  if (loadingUsers || loadingDepartments) return <Spinner />;
  else if (errorUsers || errorDepartments) return <ErrorAlert errors={[errorUsers, errorDepartments]} />;

  return (
    <>
      <Button className="test" sx={{ m: 2 }} variant="contained" onClick={() => setShowNewUserForm(true)}>
        New
      </Button>
      <ActionTable columns={columns} rows={rows} loading={loadingUsers || loadingDepartments} />
      <DialogPopup
        open={showNewUserForm}
        onClose={onCloseNewUserForm}
        title="New User"
        content={
          <NewUserForm
            rolesList={rolesList}
            departmentsList={departmentsList}
            submitting={savingNewUserForm}
            onCancel={onCloseNewUserForm}
            onSubmit={handleNewUserFormSubmit}
          />
        }
        errors={addNewUserFormErr && [addNewUserFormErr]}
      />
      <DialogPopup
        open={showEditUser}
        onClose={onCloseEditUser}
        title="Update User"
        content={
          <EditUserForm
            user={users && users.find((user: any) => user.id === selectedUser)}
            rolesList={rolesList}
            departmentsList={departmentsList}
            statusList={statusList}
            submitting={updatingUser}
            onCancel={onCloseEditUser}
            onSubmit={handleUpdateUserSubmit}
          />
        }
        errors={updateUserErr && [updateUserErr]}
      />
    </>
  );
};

export default List;
