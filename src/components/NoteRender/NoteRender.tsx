import { Box, ScrollArea, Button, Flex } from '@mantine/core';
import { AddNoteButton } from 'components/AddNoteButton';
import { DeleteNoteButton } from 'components/DeleteNoteButton';
import { NoteMode, useData } from 'context/dataProvider';
import dompurify from 'dompurify';
import { marked } from 'marked';
import { useEffect, useRef } from 'react';

export const NoteRender = () => {
  const { activeNote, setNoteMode } = useData();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || !activeNote) return;
    let contentToRender: string;

    if (activeNote.content.length === 0) {
      contentToRender = '<p>Your note is still empty. Begin editing^-)</p>';
    } else {
      contentToRender = dompurify.sanitize(marked.parse(activeNote.content));
    }
    ref.current.innerHTML = contentToRender;
  }, [activeNote]);

  return (
    <>
      <Flex gap="md">
        <Button uppercase onClick={() => setNoteMode(NoteMode.edit)}>
          Edit current note
        </Button>
        <DeleteNoteButton />
        <AddNoteButton />
      </Flex>
      <ScrollArea h="calc(100vh - 200px)">
        <Box ref={ref} />
      </ScrollArea>
    </>
  );
};
