import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useParams } from 'react-router-dom';

export enum NoteMode {
  edit = 'edit',
  render = 'render',
}

interface DataContextInterface {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  activeNote: Nullable<Note>;
  setActiveNote: Dispatch<SetStateAction<Nullable<Note>>>;
  noteMode: NoteMode;
  setNoteMode: Dispatch<SetStateAction<NoteMode>>;
  notes: Note[];
  setNotes: Dispatch<SetStateAction<Note[]>>;
}

const initData = {
  loading: false,
  setLoading() {},
  activeNote: null,
  setActiveNote() {},
  noteMode: NoteMode.render,
  setNoteMode() {},
  notes: [],
  setNotes() {},
};

const DataContext = createContext<DataContextInterface>(initData);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [activeNote, setActiveNote] = useState<Nullable<Note>>(null);
  const [noteMode, setNoteMode] = useState<NoteMode>(NoteMode.render);
  const [notes, setNotes] = useState<Note[]>([]);

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const found = notes.find((note) => note.id === id);
      setActiveNote(found ?? null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <DataContext.Provider
      value={{
        loading,
        setLoading,
        noteMode,
        setNoteMode,
        activeNote,
        setActiveNote,
        notes,
        setNotes,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
