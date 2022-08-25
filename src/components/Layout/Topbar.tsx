import { useState, useMemo } from 'react';

import { Toolbar, AppBar, IconButton } from '@mui/material';
import { AccountCircle, Logout } from '@mui/icons-material';

import { useGetSelfQuery, useUpdateSelfMutation } from '../../services/usersApi';
import { useRemoveAuthMutation } from '../../services/authApi';

import Dialog from '../Dialog';
import UserSettingsForm from '../../pages/User/UserSettingsForm';

import { KeyValuePairObj } from '../../types';

const Topbar = () => {
  const { data: currentUser } = useGetSelfQuery({});
  const [
    updateSettings,
    { isLoading: updatingSettings, isSuccess: successUpdateSettings, error: errorUpdateSettings },
  ] = useUpdateSelfMutation();
  const [removeAuth, { isSuccess: loggedOut }] = useRemoveAuthMutation({});

  const [showUserSettings, setShowUserSettings] = useState<boolean>(false);
  const [updateUserSettingsErr, setUpdateUserSettingsErr] = useState<typeof errorUpdateSettings>(undefined);

  const handleUpdateSettings = async (data: KeyValuePairObj) => {
    await updateSettings({ id: currentUser.id, payload: data });
  };

  const handleCloseSettings = () => {
    setShowUserSettings(false);
    setUpdateUserSettingsErr(undefined);
  };

  useMemo(() => {
    setUpdateUserSettingsErr(errorUpdateSettings);
  }, [errorUpdateSettings]);

  useMemo(() => {
    if (!updatingSettings && successUpdateSettings) setShowUserSettings(false);
  }, [updatingSettings]);

  useMemo(() => {
    if (loggedOut) {
      window.location.replace('/login'); // refresh the page and clear the state in the same time
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
        onClose={handleCloseSettings}
        title="Settings"
        content={
          <UserSettingsForm
            user={currentUser && { firstName: currentUser.first_name, lastName: currentUser.last_name }}
            onCancel={handleCloseSettings}
            onSubmit={handleUpdateSettings}
            submitting={updatingSettings}
          />
        }
        errors={updateUserSettingsErr && [updateUserSettingsErr]}
      />
    </>
  );
};

export default Topbar;
