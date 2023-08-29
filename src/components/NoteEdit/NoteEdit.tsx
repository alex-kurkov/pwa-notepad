import { useState } from 'react';
import { Textarea, Button, Flex, ScrollArea } from '@mantine/core';
import { DeleteNoteButton } from 'components/DeleteNoteButton';
import { NoteMode, useData } from 'context/dataProvider';
import { idb } from 'src/utils/idb';

export const NoteEdit = () => {
  const { activeNote, setActiveNote, setNotes, setNoteMode } = useData();

  const [content, setContent] = useState(activeNote?.content ?? '');

  const save = () => {
    if (!activeNote) return;
    const changedNote: Note = { ...activeNote, updated: new Date(), content };

    idb.addItem(changedNote).then(() => {
      setNotes((prev) =>
        prev.map((note) => (note.id === changedNote.id ? changedNote : note))
      );
      setActiveNote(changedNote);
      setNoteMode(NoteMode.render);
    });
  };

  return (
    <>
      <Flex gap="md">
        <Button uppercase onClick={() => save()}>
          Save current
        </Button>
        <DeleteNoteButton />
      </Flex>
      <ScrollArea h="calc(100vh - 200px)" >
        <Textarea
          autoFocus
          autosize
          mt="md"
          mah="100%"
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        />
      </ScrollArea>
    </>
  );
};
