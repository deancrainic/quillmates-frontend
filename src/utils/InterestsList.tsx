export interface InterestData {
  icon: string;
  name: string;
}

const interestsDictionary: Record<string, string> = {
  Cinematography: 'movie',
  Music: 'music',
  Reading: 'book',
  Art: 'brush',
  Coding: 'file-code-outline',
  Traveling: 'globe-model',
  Cooking: 'food-croissant',
  Fitness: 'dumbbell',
  Gaming: 'youtube-gaming',
  Podcasts: 'headset-dock',
  Languages: 'translate',
  Nature: 'nature',
  Photography: 'camera',
  'Craft Beer': 'beer',
  Singing: 'microphone',
  Sports: 'football',
  Stargazing: 'star',
  Animals: 'paw',
  Automobiles: 'car',
  Coffee: 'coffee',
  Aviation: 'airplane',
  Theater: 'drama-masks',
  Shopping: 'shopping-outline',
  Fashion: 'scissors-cutting',
  'Interior Design': 'home',
  Concerts: 'account-music',
  Cycling: 'bicycle',
  Technology: 'mouse',
  'TV Shows': 'television',
  'Wine Tasting': 'glass-wine',
  Astrology: 'zodiac-aquarius',
  'Social media': 'facebook',
};

export const calculateInterestsScore = (
  i_list1: string[],
  i_list2: string[],
): number => {
  let common_interests = 0;
  i_list1.forEach((i) => {
    if (i_list2.includes(i)) {
      common_interests++;
    }
  });

  return common_interests;
};

export default interestsDictionary;
