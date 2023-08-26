import { defer } from 'react-router-dom';
import { listsApi } from '../api/listsApi';

type Params = {
  params: {
    id?: string;
  };
};

export const characterInfoLoader = ({ params }: Params) => {
  const characterPromise = listsApi.getCharacter(params?.id ?? '');
  return defer({ character: characterPromise });
};
export const episodeInfoLoader = ({ params }: Params) => {
  const episodePromise = listsApi.getEpisode(params?.id ?? '');
  return defer({ episode: episodePromise });
};
export const locationInfoLoader = ({ params }: Params) => {
  const locationPromise = listsApi.getLocation(params?.id ?? '');
  return defer({ location: locationPromise });
};
