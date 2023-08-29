import { Button } from '@mantine/core';
import { NoteMode, useData } from 'context/dataProvider';
import { useNavigate } from 'react-router-dom';
import { RouterPaths } from 'router/router-paths';
import { idb } from 'src/utils/idb';
import uuid from 'react-uuid';

export const AddNoteButton = () => {
  const { setActiveNote, setNotes, setNoteMode } = useData();
  const navigate = useNavigate();

  const handleAdd = () => {
    const newItem: Note = {
      id: uuid(),
      content: '',
      updated: new Date(),
    };

    idb.addItem(newItem).then((uuid) => {
      if (typeof uuid !== 'number') {
        return;
      }
      newItem.uuid = uuid;
      setNotes((prev) => [...prev, { ...newItem }]);
      setActiveNote(newItem);
      navigate(`../${RouterPaths.NOTES}/${newItem.id}`);
      setNoteMode(NoteMode.edit);
    });
  };

  return (
    <Button uppercase onClick={() => handleAdd()} h={40}>
      Create new Note
    </Button>
  );
};
