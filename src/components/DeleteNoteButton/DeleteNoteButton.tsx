import { Button, Group, Modal } from '@mantine/core';
import { useData } from 'context/dataProvider';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/router-paths';
import { idb } from 'src/utils/idb';

export const DeleteNoteButton = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const { setActiveNote, setNotes, activeNote } = useData();
  const navigate = useNavigate();

  const handleDelete = useCallback(() => {
    if (activeNote?.uuid) {
      idb.delete(activeNote.uuid).then(() => {
        setNotes((prev) =>
          prev.filter((note) => note.uuid !== activeNote.uuid)
        );
        setActiveNote(null);
        navigate(RouterPaths.MAIN, { replace: true });
      });
    }
  }, [activeNote, navigate, setActiveNote, setNotes]);

  return (
    <>
      <Button onClick={() => setModalOpened(true)}>DELETE</Button>
      <Modal
        opened={modalOpened}
        centered
        onClose={() => setModalOpened(false)}
        title="Delete current note?"
      >
        <Group position="center">
          <Button color='pink' onClick={() => handleDelete()}>Yes, get rid of it!</Button>
          <Button onClick={() => setModalOpened(false)}>
            No, I'll have yet another look at it!
          </Button>
        </Group>
      </Modal>
    </>
  );
};
