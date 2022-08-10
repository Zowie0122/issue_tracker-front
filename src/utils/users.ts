import { User, Department } from '../types';

export const groupUsersByDepartment = (
  users: User[],
  departments: Department[],
  userToBeRemoved: string | undefined
) => {
  if (Array.isArray(users) && Array.isArray(departments))
    return departments.map((department) => {
      const result = {
        label: department.name,
        options: users
          .filter((user) => user.department_id === department.id)
          .map((user) => ({
            label: user.first_name + ' ' + user.last_name,
            value: user.id,
          })),
      };

      if (userToBeRemoved) {
        result.options.filter((option) => option.value !== userToBeRemoved);
      }
      return result;
    });

  return [];
};
