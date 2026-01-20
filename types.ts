
export enum TattooStyle {
  REALISM = 'Реализм',
  OLD_SCHOOL = 'Олд Скул',
  MINIMALISM = 'Минимализм',
  JAPANESE = 'Япония',
  FINELINE = 'Файнлайн',
  BLACKWORK = 'Блэкворк'
}

export interface PortfolioItem {
  id: string;
  style: TattooStyle;
  imageUrl: string;
  description: string;
}

export interface EducationCourse {
  id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  features: string[];
  level: 'Base' | 'Pro' | 'Elite';
}

export interface Review {
  id: string;
  author: string;
  text: string;
  rating: number;
  date: string;
}

export interface MasterInfo {
  name: string;
  bio: string;
  experience: string;
  avatar: string;
  location: string;
}
