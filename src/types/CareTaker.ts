interface CareTakerAnimal {
  name: string
  id: string
}
export interface CareTaker {
  _id?: string
  name: string
  assignedAnimals: CareTakerAnimal[]
}
