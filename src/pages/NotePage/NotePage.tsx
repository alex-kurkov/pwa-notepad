import { useParams } from 'react-router-dom';
import { Title, } from '@mantine/core';


export const NotePage = () => {
  const {id} = useParams()
  return (
    <Title order={2}>
     {id}
    </Title>
  );
};
