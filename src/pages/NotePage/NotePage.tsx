import { NoteMode, useData } from 'context/dataProvider';
import { NoteRender } from 'components/NoteRender';
import { NoteEdit } from 'components/NoteEdit';
import { Group, Text } from '@mantine/core';
import { AddNoteButton } from 'components/AddNoteButton';

export const NotePage = () => {
  const { noteMode, activeNote } = useData();

  if (!activeNote) {
    return (
      <Group position='center'>
        <Text>Oops, no such note found. Create one?</Text>
        <AddNoteButton />
      </Group>
    )
  }

  return (
    <>
      {noteMode === NoteMode.edit && <NoteEdit />}
      {noteMode === NoteMode.render && <NoteRender />}
    </>
  );
};
