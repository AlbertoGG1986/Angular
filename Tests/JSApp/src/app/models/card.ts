export interface ICard {
  id: string;
  name: string;
  uri: string;
  scryfall_uri: string;
  image_uri: string;
  flavor_text: string;
  oracle_text: string;
}

export interface ICards extends Array<ICard> {}
