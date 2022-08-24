import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { Toolbar, AppBar, IconButton } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';

import { useGetSelfQuery, usersApi, useUpdateSelfMutation } from '../../services/usersApi';
import { useRemoveAuthMutation } from '../../services/authApi';

import Dialog from '../Dialog';
import UserSettingsForm from '../../pages/User/UserSettingsForm';

import { KeyValuePairObj } from '../../types';

const Topbar = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetSelfQuery({});
  const [
    updateSettings,
    { isLoading: updatingSettings, isSuccess: successUpdateSettings, error: errorUpdateSettings },
  ] = useUpdateSelfMutation();
  const [removeAuth, { isSuccess: loggedOut }] = useRemoveAuthMutation({});

  const [showUserSettings, setShowUserSettings] = useState<boolean>(false);
  const [updateUserSettingsErr, setUpdateUserSettingsErr] = useState<typeof errorUpdateSettings>(undefined);

  const handleUpdateUserSettings = async (data: KeyValuePairObj) => {
    await updateSettings({ id: currentUser.id, payload: data });
  };

  const onCloseEditSettings = () => {
    setShowUserSettings(false);
    setUpdateUserSettingsErr(undefined);
  };

  useEffect(() => {
    setUpdateUserSettingsErr(errorUpdateSettings);
  }, [errorUpdateSettings]);

  useMemo(() => {
    if (!updatingSettings && successUpdateSettings) setShowUserSettings(false);
  }, [updatingSettings]);

  useEffect(() => {
    if (loggedOut) {
      window.location.replace('/login'); // clear the state
    }
  }, [loggedOut]);

  return (
    <>
      <AppBar position="sticky" color="primary" sx={{ height: '80px' }}>
        <Toolbar
          sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}
        >
          <IconButton
            edge="end"
            aria-label="user settings"
            aria-controls="settings"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setShowUserSettings(true)}
          >
            <AccountCircle sx={{ fontSize: '40px' }} />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="logout"
            aria-controls="logout"
            color="inherit"
            onClick={() => removeAuth({})}
          >
            <Logout sx={{ fontSize: '40px' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog
        open={showUserSettings}
        onClose={onCloseEditSettings}
        title="Settings"
        content={
          <UserSettingsForm
            user={currentUser && { firstName: currentUser.first_name, lastName: currentUser.last_name }}
            onCancel={onCloseEditSettings}
            onSubmit={handleUpdateUserSettings}
            submitting={updatingSettings}
          />
        }
        errors={updateUserSettingsErr && [updateUserSettingsErr]}
      />
    </>
  );
};

export default Topbar;
