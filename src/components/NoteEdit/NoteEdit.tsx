import { useState } from 'react';
import { Textarea, Button, Flex, ScrollArea } from '@mantine/core';
import { DeleteNoteButton } from 'components/DeleteNoteButton';
import { NoteMode, useData } from 'context/dataProvider';
import { idb } from 'src/utils/idb';
import { useDebounce } from 'src/utils/useDebounce';

export const NoteEdit = () => {
  const { activeNote, setActiveNote, setNotes, setNoteMode } = useData();

  const [content, setContent] = useState(activeNote?.content ?? '');

  useDebounce(() => {
    save()
  }, 500, [content])

  function save () {
    if (!activeNote) return;
    const changedNote: Note = { ...activeNote, updated: new Date(), content };

    idb.addItem(changedNote).then(() => {
      setNotes((prev) =>
        prev.map((note) => (note.id === changedNote.id ? changedNote : note))
      );
      setActiveNote(changedNote);
    });
  }

  return (
    <>
      <Flex gap="md">
        <Button uppercase onClick={() => {setNoteMode(NoteMode.render)}}>
          Exit
        </Button>
        <DeleteNoteButton />
      </Flex>
      <ScrollArea h="calc(100vh - 200px)">

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
