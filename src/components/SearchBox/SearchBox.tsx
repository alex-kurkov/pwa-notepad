import { TextInput } from "@mantine/core";
import { IconSearch } from "components/Icon";
import { useData } from "context/dataProvider";
import { FC, useState } from "react";
import { useDebounce } from "src/utils/useDebounce";

interface Props {
  setList: (list: Note[]) => void
}

export const SearchBox: FC<Props> = ({ setList }) => {
  const [value, setValue] = useState('');

  const {notes} = useData()

  useDebounce(() => {
    if (value === '') {
      setList(notes);
      return;
    }
    const found = notes.filter(({ content }) => content.includes(value));
    setList(found);
  }, 500, [value]);

  return (
    <TextInput
      placeholder="search"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      my="md"
      icon={<IconSearch color="white" />}
    />
  );
};
