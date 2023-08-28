import { Box, Center, Text } from '@mantine/core';
import { AddNoteButton } from 'components/AddNoteButton';
import { useAuth } from 'context/authProvider';

export const MainPage = () => {
  const { user } = useAuth();
  return (
    <Box pt={60}>
      <Text size={32} w="80%" mx="auto" ta="center">
        Hey there, {user}! Choose note on the left to begin or create new note
      </Text>
      <Center mt="lg">
        <AddNoteButton />
      </Center>
    </Box>
  );
};
