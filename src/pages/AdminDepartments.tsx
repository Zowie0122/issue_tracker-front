import { useState, useMemo, useEffect } from 'react';

import { Button } from '@mui/material';

import { useGetDepartmentsQuery, useAddDepartmentMutation } from '../services/departmentsApi';

import Spinner from '../components/Spinner';
import ErrorAlert from '../components/ErrorAlert';
import ActionTable, { Column } from '../components/Tables/ActionTable';
import DialogPopup from '../components/Dialog';
import NewDepartment from '../components/Forms/NewDepartment';

import { Department, KeyValuePairObj } from '../types';

const AdminDepartments = () => {
  const {
    data: departments,
    isLoading: loadingDepartments,
    error: errorDepartments,
    refetch,
  } = useGetDepartmentsQuery({});

  const [
    addDepartment,
    { isLoading: savingNewDepartment, isSuccess: successNewDepartment, error: errorNewDepartment },
  ] = useAddDepartmentMutation();

  const [rows, setRows] = useState<Department[]>([]);
  const [showNewDepartment, setShowNewDepartment] = useState<boolean>(false);
  const [addNewDepartmentErr, setAddNewDepartmentErr] = useState<typeof errorNewDepartment>(undefined);

  const handleNewDepartmentSubmit = async (data: KeyValuePairObj) => {
    await addDepartment(data);
  };

  const onCloseNewDepartment = (): void => {
    setShowNewDepartment(false);
    setAddNewDepartmentErr(undefined);
  };

  useMemo(() => {
    if (!savingNewDepartment && successNewDepartment) setShowNewDepartment(false);
    refetch();
  }, [savingNewDepartment]);

  // since redux toolkit RTK doesn't support reset cache yet, use local state to track and reset the error
  // https://stackoverflow.com/questions/68982391/change-a-mutation-value-when-fetching-another-query-rtk-query/68989101#68989101
  useEffect(() => {
    setAddNewDepartmentErr(errorNewDepartment);
  }, [errorNewDepartment]);

  // table columns and rows
  const columns: Column[] = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Department Name' },
  ];

  useMemo(() => {
    if (!loadingDepartments && Array.isArray(departments) && departments.length > 0) {
      setRows(departments);
    }
  }, [loadingDepartments]);

  if (loadingDepartments) return <Spinner />;
  else if (errorDepartments) return <ErrorAlert errors={[errorDepartments]} />;
  return (
    <>
      <Button sx={{ m: 2 }} variant="contained" onClick={() => setShowNewDepartment(true)}>
        New
      </Button>
      <ActionTable columns={columns} rows={rows} loading={loadingDepartments} />
      <DialogPopup
        open={showNewDepartment}
        onClose={onCloseNewDepartment}
        title="New Department"
        content={
          <NewDepartment
            saving={savingNewDepartment}
            handleCancel={onCloseNewDepartment}
            handleSubmit={handleNewDepartmentSubmit}
          />
        }
        errors={addNewDepartmentErr && [addNewDepartmentErr]}
      />
    </>
  );
};

export default AdminDepartments;
