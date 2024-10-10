import * as model from './model'

export const getEnumList = (enumType) => {
  return Object.keys(enumType)
  .filter((item) => { return isNaN(Number(item)) })
}

export const levelToClasses = (level:number) => {
  switch (level) {
    case 0 : return getEnumList(model.Maternelle);
    case 1 : return getEnumList(model.Primaire);
    case 2 : return getEnumList(model.College);
    case 3 : return getEnumList(model.Lycee);
    case 4 : return getEnumList(model.Superieur);
  }
}