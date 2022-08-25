import { UserT, DepartmentT } from '../types';

export const groupUsersByDepartment = (
  users: UserT[],
  departments: DepartmentT[],
  userToBeRemoved: string | undefined
) => {
  if (Array.isArray(users) && Array.isArray(departments))
    return departments.map((department) => {
      const result = {
        label: department.name,
        options: users
          .filter((user) => user.departmentId === department.id)
          .map((user) => ({
            label: user.firstName + ' ' + user.lastName,
            value: user.id,
          })),
      };

      if (userToBeRemoved) {
        result.options = result.options.filter((option) => option.value !== userToBeRemoved);
      }
      return result;
    });

  return [];
};
