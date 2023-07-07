import {create} from 'apisauce';

export const nasa_instance = create({
  baseURL: 'https://api.nasa.gov',
});

export const eonet_instance = create({
  baseURL: 'https://eonet.gsfc.nasa.gov',
});
