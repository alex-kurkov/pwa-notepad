import React, { FC, useEffect, useState } from 'react';
import {
  Loader,
  Navbar,
  ScrollArea,
  Text,
  TextInput,
  Box,
  List,
  Title,
  NavLink,
  Button,
} from '@mantine/core';
import { IconSearch } from 'components/Icon';
import { useAuth } from 'context/authProvider';
import { useParams, useNavigate } from 'react-router-dom';
import { idb } from 'src/utils/idb';
import { RouterPaths } from 'router/router-paths';

interface Props {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Note {
  name: string;
  content: string;
  id: string;
  created: Date;
}

export const Navigation: FC<Props> = ({ opened, setOpened }) => {
  const [list, setList] = useState<Note[]>([]);
  const [value, setValue] = useState('');
  const { user } = useAuth();

  // const handleCreate = () => {
  //   idb.openDB(STORE_NAME, 1, { name: 'notes' });
  // }

  const handleAdd = () => {
    const item = {
      id: value,
      name: value,
      content: 'lorem ipsum eroivjewr gwgjw gjwg  sldj;w',
      created: new Date(),
    };

    idb.addItem(item).then(() => setList(prev => [...prev, item]))
  }

  const handleDelete = () => {
    idb.delete(Number(value));
  }

  useEffect(() => {
    idb.getAll<Note>().then(res => setList(res))
  }, [])

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
          rightSection={<Loader size="sm" />}
        />
        <Button onClick={() => handleAdd()}>ADD NOTE</Button>
        <br />
        <Button onClick={() => handleDelete()}>DELETE NOTE</Button>
        <Text>{user}, your notes:</Text>
        <ScrollArea type="auto">
          <List listStyleType="none" spacing="md">
            {list.map((item) => (
              <ListItem item={item} key={item.id} closeBurger={() => setOpened(false)} />
            ))}
          </List>
        </ScrollArea>
      </>
    </Navbar>
  );
};

const ListItem: FC<{
  item: Note;
  closeBurger: () => void;
}> = ({ item, closeBurger }) => {
  const navigate = useNavigate();
  const params = useParams();
  const { id, content, name } = item;

  const handleClick = () => {
    closeBurger();
    navigate(`${RouterPaths.NOTES}/${id}`);
  };

  return (
    <List.Item onClick={() => handleClick()}>
      <NavLink
        active={params.id === id}
        p={0}
        noWrap
        label={
          <Box w={{ sm: 160, lg: 260 }}>
            <Title truncate order={2}>
              {name}
            </Title>
            <Text truncate fz="sm">
              {content}
            </Text>
          </Box>
        }
      />
    </List.Item>
  );
};
