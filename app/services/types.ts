export interface IDailyImage {
  copyright: string;
  date: Date;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface IEonetEvents {
  title: string;
  description: string;
  link: string;
  events: Event[];
}

export interface Event {
  id: string;
  title: string;
  description: Description;
  link: string;
  categories: Category[];
  sources: Source[];
  geometries: Geometry[];
}

export interface Category {
  id: number;
  title: Title;
}

export type Title =
  | 'Severe Storms'
  | 'Volcanoes'
  | 'Sea and Lake Ice'
  | 'Wildfires';

export type Description =
  | ''
  | 'D15B calved from D15 in January 2016.'
  | 'D15A calved from D15 in January 2016.';

export interface Geometry {
  date: string;
  type: Type;
  coordinates: number[];
}

export type Type = 'Point';

export interface Source {
  id: ID;
  url: string;
}

export type ID =
  | 'JTWC'
  | 'SIVolcano'
  | 'NATICE'
  | 'InciWeb'
  | 'CALFIRE'
  | 'PDC'
  | 'MBFIRE'
  | 'EO'
  | 'BYU_ICE'
  | 'CEMS'
  | 'GDACS'
  | 'IDC'
  | 'NASA_DISP'
  | 'ReliefWeb';
