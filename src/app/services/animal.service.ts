import { connectDB } from "@/lib/db"
import { AnimalModel } from "@/models"
import { Animal } from "@/types/Animal"

/**
 * AnimalService
 * Service layer responsible for CRUD operations on the Animal model.
 *
 * Responsibilities:
 * - Ensures DB connection before operations
 * - Provides methods to create, fetch, update, and soft-delete animals
 */
export class AnimalService {
  /**
   * Create a new animal entry in the database.
   * @param {Animal} data - Animal object containing the required fields
   * @returns {Promise<Animal>} The created animal document
   */
  static async createAnimal(data: Animal): Promise<Animal> {
    await connectDB()
    console.log("[createAnimal] params:", data)

    const result = await AnimalModel.create(data)

    console.log("[createAnimal] result:", result)
    return result
  }

  /**
   * Fetch all animals from the database.
   * @returns {Promise<Animal[]>} Array of all animal documents
   */
  static async getAllAnimals(): Promise<Animal[]> {
    await connectDB()

    const result = await AnimalModel.find({ isDeleted: false })

    console.log("[getAllAnimals] result:", result)
    return result
  }

  /**
   * Update an animal by its ID.
   * @param {Animal} data - Animal object containing `id` and fields to update
   * @returns {Promise<Animal | null>} Updated animal document or null if not found
   */
  static async updateAnimalById(data: Animal): Promise<Animal | null> {
    await connectDB()

    const { _id, ...updateData } = data
    console.log("[updateAnimalById] params:", { _id, updateData })

    const result = await AnimalModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    })

    console.log("[updateAnimalById] result:", result)
    return result
  }

  /**
   * Soft-delete an animal by its ID (marks as deleted instead of removing).
   * @param {string} id - Animal ID
   * @returns {Promise<Animal | null>} Updated animal document or null if not found
   */
  static async deleteAnimalById(_id: string): Promise<Animal | null> {
    await connectDB()
    console.log("[deleteAnimalById] params:", { _id })

    const result = await AnimalModel.findByIdAndUpdate(
      _id,
      { isDeleted: true },
      { new: true }
    )

    console.log("[deleteAnimalById] result:", result)
    return result
  }
}
