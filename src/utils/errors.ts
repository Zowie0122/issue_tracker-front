// there are the custom errors that show to the users
// these errors are registered in backend
export const ERR_MSGS = [
  {
    code: 0,
    msg: 'Oops, there is an unknown error.',
  },
  {
    code: 1000,
    msg: 'Please confirm your request.',
  },
  {
    code: 1001,
    msg: 'You are not authorized to perform this action.',
  },
  {
    code: 1002,
    msg: 'You are forbidden to perform this action.',
  },
  {
    code: 1003,
    msg: 'Contents not found.',
  },
  {
    code: 1004,
    msg: 'Please confirm your input.',
  },
  {
    code: 1005,
    msg: 'Error when logout.',
  },
  {
    code: 1006,
    msg: 'The content you are saving already exist in database.',
  },
  {
    code: 2000,
    msg: 'Oops, there is a server error.',
  },
  {
    code: 2001,
    msg: 'Oops, there is a server error.',
  },
  {
    code: 2002,
    msg: 'Oops, there is a server error.',
  },
];

export const UNKNOWN_ERR_CODE = 0;

export const getErrMsg = (code: number): string => {
  if (code === UNKNOWN_ERR_CODE) return ERR_MSGS[0].msg;
  const err = ERR_MSGS.find((err) => err.code === code);
  return err ? err.msg : ERR_MSGS[0].msg;
};
