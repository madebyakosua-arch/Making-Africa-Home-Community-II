export interface CommunityQuestion {
  id: string;
  question: string;
  category: 'Housing' | 'Money' | 'Work' | 'Business' | 'Education' | 'Everyday Life';
  author: {
    name: string;
    avatar: string;
    role: string;
    location: string;
    origin?: string;
    yearsReturned?: string;
  };
  destinationCountry: string;
  city: string;
  answersCount: number;
  likesCount: number;
  timeAgo: string;
  topAnswer?: {
    author: string;
    authorRole: string;
    avatar: string;
    text: string;
    likes: number;
  };
  tags: string[];
}

export interface TopicCategory {
  id: string;
  title: 'Housing' | 'Money' | 'Work' | 'Business' | 'Education' | 'Everyday Life';
  description: string;
  iconName: string;
  sampleCount: number;
  accent: string;
}

export interface RealLifeSlide {
  id: string;
  country: string;
  flag: string;
  city: string;
  title: string;
  description: string;
  image: string;
  tag: string;
}

export interface CountryProfile {
  id: string;
  name: string;
  tagline: string;
  flag: string;
  popularCities: string[];
  statusBadge: string;
  avgRentMonthly: string;
  currency: string;
  languages: string[];
  keyHighlights: string[];
  topNeighborhoods: { name: string; city: string; vibe: string }[];
  popularTopics: string[];
}

export interface MemberStory {
  id: string;
  names: string;
  route: string;
  fromCity: string;
  toCity: string;
  fromCountry: string;
  toCountry: string;
  flagFrom: string;
  flagTo: string;
  year: string;
  roles: string;
  quote: string;
  fullStory: string;
  image: string;
  keyTakeaway: string;
}

export interface BenefitItem {
  id: string;
  title: string;
  description: string;
  highlight: string;
  iconName: string;
}
