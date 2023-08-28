import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

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
