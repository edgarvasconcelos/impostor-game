export type Gender = "male" | "female";

export interface Player {
  id: string;

  name: string;
  gender: Gender;

  avatar: string;
  color: string;

  isImpostor: boolean;
//   isAlive: boolean;
}
