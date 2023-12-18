const dictionaries = {
  en: () => import('./public/dictionaries/en.json').then((r) => r.default),
  hi: () => import('./public/dictionaries/hi.json').then((r) => r.default),
  es: () => import('./public/dictionaries/es.json').then((r) => r.default),
};

export const getDictionary = (lang) => {
  console.log('Requested Language:', lang);
  const result = dictionaries[lang]();
  result.then((data) => console.log('Loaded Dictionary for', lang, ':', data));
  return result;
};
