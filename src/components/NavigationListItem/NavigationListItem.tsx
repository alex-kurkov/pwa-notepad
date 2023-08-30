import { FC } from 'react';
import { Text, Box, NavLink } from '@mantine/core';
import { useParams, useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/router-paths';
import { NoteMode, useData } from 'context/dataProvider';

interface Props {
  item: Note;
  closeBurger: () => void;
}

export const NavigationListItem: FC<Props> = ({ item, closeBurger }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { id, content, updated } = item;
  const { setActiveNote, setNoteMode } = useData();

  const handleClick = () => {
    closeBurger();
    setActiveNote(item);
    setNoteMode(NoteMode.render);
    navigate(`${RouterPaths.NOTES}/${id}`);
  };

  return (
    <NavLink
      w={{ sm: 160, lg: 254 }}
      onClick={handleClick}
      active={params.id === id}
      p={0}
      noWrap
      label={
        <Box
          w={{ sm: 160, lg: 260, xs: '100%' }}
          maw="100%"
          py="xs"
          style={{ overflowX: 'hidden' }}
        >
          <Text truncate size="md">
            {content.length === 0 ? 'Empty Note' : content}
          </Text>
          <Text size="xs" c="blue">
            Last updated: {updated.toLocaleDateString()}
          </Text>
        </Box>
      }
    />
  );
};
