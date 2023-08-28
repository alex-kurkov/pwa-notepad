import { NoteMode, useData } from 'context/dataProvider';
import { NoteRender } from 'components/NoteRender';
import { NoteEdit } from 'components/NoteEdit';

export const NotePage = () => {
  const { noteMode } = useData();

  return (
    <>
      {noteMode === NoteMode.edit && <NoteEdit />}
      {noteMode === NoteMode.render && <NoteRender />}
    </>
  );
};
