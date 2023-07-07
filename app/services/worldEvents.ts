import {ApiResponse} from 'apisauce';
import {eonet_instance} from './instances';
import {IEonetEvents} from './types';

export const getEonetEvents = async () => {
  const response: ApiResponse<IEonetEvents> = await eonet_instance.get(
    `/api/v2.1/events`,
  );

  if (response.ok) {
    return response.data;
  }
};
