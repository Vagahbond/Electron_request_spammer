export default interface Burger {
  name: string;
  collerette_uid: string;
  aid: string;
  picture?: string;
  nbLikes?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBurger(object: any): object is Burger {
  return 'member' in object && 'collerette_uid' in object && 'aid' in object;
}
