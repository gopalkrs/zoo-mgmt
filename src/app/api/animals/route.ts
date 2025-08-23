import { AnimalService } from "@/app/services";
import { Animal } from "@/types/Animal";
import { handleError } from "@/utils";

/**
 * POST /api/animals
 * Create a new animal entry.
 *
 * @param {Request} req - The incoming request containing animal data in JSON body
 * @returns {Promise<Response>} JSON response with success flag and created animal
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    const result = await AnimalService.createAnimal(body);

    return Response.json({ success: true, result });
  } catch (err: unknown) {
    return handleError(err);
  }
}

/**
 * GET /api/animals
 * Fetch all animals.
 *
 * @returns {Promise<Response>} JSON response with success flag and list of animals
 */
export async function GET(): Promise<Response> {
  try {
    const result: Animal[] = await AnimalService.getAllAnimals();

    return Response.json({ success: true, result });
  } catch (err: unknown) {
    return handleError(err);
  }
}
