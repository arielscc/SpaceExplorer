import {ApiResponse} from 'apisauce';
import {NASA_API_KEY} from './constants';
import {nasa_instance} from './instances';
import {IDailyImage} from './types';

export const getDailyImage = async () => {
  const response: ApiResponse<IDailyImage> = await nasa_instance.get(
    `/planetary/apod?api_key=${NASA_API_KEY}`,
  );

  if (response.ok) {
    return response.data;
  }
};
