import { CareTakerService } from "@/app/services"
import { handleError } from "@/utils"

/**
 * PATCH Handler - Update CareTaker by ID
 *
 * This API route handles updating a CareTaker resource based on the provided ID.
 *
 * @param req - The incoming HTTP request containing the update data in JSON format.
 * @param params - Route parameters, including the CareTaker ID.
 *
 * @returns A JSON response indicating success or error.
 *
 * @example
 * PATCH /api/caretakers/:id
 * {
 *   "name": "Updated Name"
 * }
 *
 * Response:
 * {
 *   "success": true,
 *   "result": { ...updatedCareTaker }
 * }
 */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = params

    const body = await req.json()

    const result = await CareTakerService.updateCareTakerById({
      _id: id,
      ...body,
    })

    return Response.json({ success: true, result })
  } catch (err: unknown) {
    return handleError(err)
  }
}
