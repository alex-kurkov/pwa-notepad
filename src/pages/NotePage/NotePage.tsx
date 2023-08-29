import { NoteMode, useData } from 'context/dataProvider';
import { NoteRender } from 'components/NoteRender';
import { NoteEdit } from 'components/NoteEdit';
import { Group, Text } from '@mantine/core';
import { AddNoteButton } from 'components/AddNoteButton';
import { useParams } from 'react-router-dom';

export const NotePage = () => {
  const { noteMode, activeNote, notes, setActiveNote } = useData();
  const { id } = useParams();

  if (id) {
    const found = notes.find((i) => i.id === id) ?? null;
    setActiveNote(found);
  }

  if (!activeNote) {
    return (
      <Group position="center">
        <Text>Oops, no such note found. Create one?</Text>
        <AddNoteButton />
      </Group>
    );
  }

  return (
    <>
      {noteMode === NoteMode.edit && <NoteEdit />}
      {noteMode === NoteMode.render && <NoteRender />}
    </>
  );
};
