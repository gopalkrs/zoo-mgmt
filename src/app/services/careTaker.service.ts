import { connectDB } from "@/lib/db"
import { careTakerModel } from "@/models"
import { CareTaker } from "@/types"

/**
 * CareTakerService
 *
 * Service layer responsible for handling CareTaker-related operations.
 * Provides methods to create, fetch, and update CareTakers in the database.
 */
export class CareTakerService {
  /**
   * Create a new CareTaker
   *
   * @param params - CareTaker object containing required fields
   * @returns {Promise<CareTaker | null>} The newly created CareTaker document
   */
  static async createCareTaker(params: CareTaker): Promise<CareTaker | null> {
    await connectDB()
    const { name } = params
    console.log("[createCareTaker] params:", { name })

    const result = await careTakerModel.create({ name })
    console.log("[createCareTaker] result:", result)

    return result
  }

  /**
   * Fetch all CareTakers
   *
   * @returns {Promise<CareTaker[] | null>} Array of CareTaker documents
   */
  static async getAllCareTakers(): Promise<CareTaker[] | null> {
    await connectDB()
    const result = await careTakerModel.find({})
    console.log("[getAllCareTakers] result:", result)

    return result
  }

  /**
   * Update a CareTaker by ID
   *
   * @param params - CareTaker object containing updated fields
   * @returns {Promise<CareTaker | null>} The updated CareTaker document
   */
  static async updateCareTakerById(
    params: CareTaker
  ): Promise<CareTaker | null> {
    await connectDB()
    const { _id, ...updateData } = params
    console.log("[updateCareTakerById] params: ", { _id, updateData })
    const result = await careTakerModel.findByIdAndUpdate(_id, {
      ...updateData,
    })
    console.log("[updateCareTakerById] result: ", result)
    return result
  }
}
