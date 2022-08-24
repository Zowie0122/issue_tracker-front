import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import {
  Box,
  Stack,
  Button as MuiButton,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  IconButton,
  FormHelperText,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker as MuiDateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { SxProps } from '@mui/system';
import {
  FromPropsI,
  FormOptionT,
  FormOptionsT,
  FromOptionsGroupT,
  FromOptionsGroupsT,
  OnCancelHandlerT,
} from '../../types';
import { getIsoDate } from '../../utils/time';

type Item = {
  type: 'text' | 'email' | 'password' | 'selection' | 'groupedSelection' | 'dateTimePicker';
  label: string;
  name: string;
  defaultValue?: any;
  disabled?: boolean;
  rules?: {};
  options?: FormOptionsT;
  groups?: FromOptionsGroupsT;
  minRows?: number;
  maxRows?: number;
  minDateTime?: Date;
  maxDateTime?: Date;
  disablePast?: boolean;
};

interface PropsI extends FromPropsI {
  sx?: SxProps;
  items: Item[];
  buttonLabel?: string;
}

const IssueTrackerForm = ({
  sx,
  items = [],
  buttonLabel = 'Submit',
  onCancel,
  onSubmit,
  submitting = false,
  disabled = false,
}: PropsI) => {
  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [dateTime, setDateTime] = useState<Date | null>(null);

  // for firstName, lastName, email, issue title, issue description, comment contents, department name
  return (
    <Box component="form" sx={{ width: '100%', my: 2, px: 2, ...sx }} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {items.map((item: Item) => {
          if (item.type === 'text' || item.type === 'email') {
            return (
              <Controller
                key={item.name}
                control={control}
                name={item.name}
                defaultValue={item.defaultValue}
                rules={item.rules}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type={item.type}
                    label={item.label}
                    multiline={!!(item.minRows || item.maxRows)}
                    minRows={item.minRows}
                    maxRows={item.maxRows}
                    error={!!errors[item.name]}
                    helperText={<>{errors[item.name]?.message}</>}
                    disabled={item.disabled}
                    fullWidth
                  />
                )}
              />
            );
          }

          // for passwords
          if (item.type === 'password') {
            return (
              <Controller
                key={item.name}
                control={control}
                name={item.name}
                defaultValue={item.defaultValue}
                rules={item.rules}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label={item.label}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={(_e) => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    error={!!errors[item.name]}
                    helperText={<>{errors[item.name]?.message}</>}
                    disabled={item.disabled}
                    fullWidth
                  />
                )}
              />
            );
          }

          // for role, department and user/issue status selection
          if (item.type === 'selection') {
            return (
              <Controller
                key={item.name}
                control={control}
                name={item.name}
                defaultValue={item.defaultValue}
                rules={item.rules}
                render={({ field }) => (
                  <FormControl error={!!errors[item.name]} fullWidth>
                    <InputLabel htmlFor={item.name}>{item.label}</InputLabel>
                    <Select
                      id={item.name}
                      labelId={item.name}
                      label={item.label}
                      {...field}
                      disabled={item.disabled}
                      defaultValue={item.defaultValue}
                    >
                      {item?.options?.map((option: FormOptionT, i: number) => (
                        <MenuItem key={i} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      <>{errors[item.name]?.message}</>
                    </FormHelperText>
                  </FormControl>
                )}
              />
            );
          }

          // for receiver selection grouped by departments
          if (item.type === 'groupedSelection') {
            return (
              <Controller
                key={item.name}
                control={control}
                name={item.name}
                defaultValue={item.defaultValue}
                rules={item.rules}
                render={({ field }) => (
                  <FormControl error={!!errors[item.name]} variant="standard">
                    <InputLabel htmlFor={item.name} shrink={true}>
                      {item.label}
                    </InputLabel>
                    <Select
                      {...field}
                      native
                      labelId={item.name}
                      label={item.label}
                      disabled={item.disabled}
                      autoWidth
                      defaultValue={item.defaultValue ?? null}
                    >
                      <>
                        <option aria-label="None" key="none" label="Select One" value="" />
                        {item?.groups?.map((group: FromOptionsGroupT, i: number) => (
                          <optgroup label={group.label} key={`g${i}`}>
                            {group.options.map((option: FormOptionT, i: number) => (
                              <option value={option.value} key={`o${i}`}>
                                {option.label}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </>
                    </Select>
                    <FormHelperText>
                      <>{errors[item.name]?.message}</>
                    </FormHelperText>
                  </FormControl>
                )}
              />
            );
          }

          // for issue deadline(dueAt)
          if (item.type === 'dateTimePicker') {
            return (
              <Controller
                control={control}
                name={item.name}
                rules={item.rules}
                defaultValue={item.defaultValue ?? dateTime}
                render={({ field }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MuiDateTimePicker
                      {...field}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          helperText={<>{errors[item.name]?.message}</>}
                          error={!!errors[item.name]}
                          sx={{ width: '50%' }}
                        />
                      )}
                      label={item.label}
                      value={item.defaultValue ?? dateTime}
                      onChange={setDateTime}
                      onAccept={(value) => {
                        setValue(item.name, getIsoDate(value));
                        clearErrors(item.name);
                      }}
                      minDateTime={item.minDateTime}
                      maxDateTime={item.maxDateTime}
                      disabled={item.disabled}
                      disablePast={item.disablePast}
                    />
                  </LocalizationProvider>
                )}
              />
            );
          }
        })}
      </Stack>
      <Box
        sx={{
          width: '100%',
          my: 2,
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {onCancel && (
          <MuiButton variant="outlined" color="primary" onClick={onCancel}>
            Cancel
          </MuiButton>
        )}
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={submitting}
          disabled={disabled || Object.keys(errors).length > 0}
        >
          {buttonLabel}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default IssueTrackerForm;
