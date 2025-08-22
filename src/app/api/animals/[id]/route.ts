import { AnimalService } from "@/app/services";

/**
 * PATCH /api/animals/[id]
 * Update an existing animal by ID.
 *
 * @param {Request} req - The incoming request containing updated fields in JSON body
 * @param {{ params: { id: string } }} context - Route params (id of the animal)
 * @returns {Promise<Response>} JSON response with success flag and updated animal
 */
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = params;
    const body = await req.json();

    const result = await AnimalService.updateAnimalById({ id, ...body });

    return Response.json({ success: true, result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error:", err.message);
      return Response.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
    return Response.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/animals/[id]
 * Soft-delete an animal by ID (marks it as not alive).
 *
 * @param {Request} req - The incoming request
 * @param {{ params: { id: string } }} context - Route params (id of the animal)
 * @returns {Promise<Response>} JSON response with success flag and deleted animal
 */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  try {
    const { id } = params;

    const result = await AnimalService.deleteAnimalById(id);

    return Response.json({ success: true, result });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error:", err.message);
      return Response.json(
        { success: false, error: err.message },
        { status: 500 }
      );
    }
    return Response.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  }
}
