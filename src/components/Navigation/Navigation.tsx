import React, { FC, useEffect, useState } from 'react';
import {
  Navbar,
  ScrollArea,
  TextInput,
  Flex,
  createStyles,
} from '@mantine/core';
import { IconSearch } from 'components/Icon';
import { useData } from 'context/dataProvider';
import { NavigationListItem } from 'components/NavigationListItem';

const useStyles = createStyles({
  scrollable: {
    '&>div': {
      display: 'block'
    }
  }
})
interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navigation: FC<Props> = ({ opened, setOpened }) => {
  const { notes } = useData();
  const [notesRenderedList, setNotesRenderedList] = useState<Note[]>([]);
  const [value, setValue] = useState('');

  const {classes} = useStyles();

  useEffect(() => {
    setNotesRenderedList(notes);
  }, [notes]);

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 300 }}
    >
      <>
        <TextInput
          placeholder="search"
          label="Search notes"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          mb="md"
          icon={<IconSearch color="white" />}
        />
        <ScrollArea type="auto" h="calc(100vh - 200px)" className={classes.scrollable}>
          <Flex direction="column">
            {notesRenderedList.map((item) => (
              <NavigationListItem
                item={item}
                key={item.id}
                closeBurger={() => setOpened(false)}
              />
            ))}
          </Flex>
        </ScrollArea>
      </>
    </Navbar>
  );
};
