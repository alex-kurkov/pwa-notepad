import { FormEventHandler } from 'react';
import { useAuth } from '../../context/authProvider';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { RouterPaths } from '../../router/router-paths';
import { Title, TextInput, Flex, Button } from '@mantine/core';

const INPUT_NAME = 'username';

export const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userName = formData.get(INPUT_NAME) as string | null;

    if (!userName || userName.length === 0) return;

    login(userName, () => {
      const toPathname =
        location.state?.from + location.state?.search || RouterPaths.MAIN;
      navigate(toPathname, { replace: true });
    });
  };
 
  return (
    <>
      {user && <Navigate to={RouterPaths.MAIN} replace/>}
      <Title order={2}>LOGIN</Title>
      <form onSubmit={handleSubmit}>
        <Flex gap={24} direction="column" align="center">
          <TextInput
            w="100%"
            name={INPUT_NAME}
            placeholder="username..."
            label="ENTER YOUR NAME"
          />
          <Button w="100%" variant="filled" type="submit">
            LOG IN
          </Button>
        </Flex>
      </form>
    </>
  );
};
