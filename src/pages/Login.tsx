import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddAuthMutation } from '../services/authApi';

import { Alert, Avatar, Paper, Box, Grid, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import IssueTrackerForm from '../components/Forms/Base';
import Footer from '../components/Layout/Footer';

import { getValidations } from '../utils/validation';
import { KeyValuePairObj } from '../types';

const SignIn = () => {
  const navigate = useNavigate();

  const [postCredentials, { isSuccess, error, isLoading }] = useAddAuthMutation();

  const handleSubmit = async (data: KeyValuePairObj) => {
    await postCredentials(data);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate('/issues/received');
    }
  }, [isSuccess]);

  return (
    <Grid container component="main" sx={{ height: '100%' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(/topBg.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              User email and password are not matched.
            </Alert>
          )}
          <IssueTrackerForm
            items={[
              {
                type: 'email',
                label: 'Email',
                name: 'email',
                defaultValue: '',
                rules: getValidations(['required']),
              },
              {
                type: 'password',
                label: 'Password',
                name: 'password',
                defaultValue: '',
                rules: getValidations(['required']), // Not show the password rule to the public on purpose
              },
            ]}
            buttonLabel="Sign in"
            onSubmit={handleSubmit}
            saving={isLoading}
          />
        </Box>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default SignIn;
