export type AnimalCategory = "water" | "land" | "reptile";
export type Gender = "male" | "female" | "unknown";

export interface Animal {
  id: string;
  name: string;
  dob?: Date;
  origin?: string;
  category: AnimalCategory;
  gender: Gender;
  gallery: string[];
  enclosure_id?: string;
  isDeleted?: boolean;
  caretaker_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
