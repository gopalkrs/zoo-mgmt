import { CareTakerService } from "@/app/services";
import { handleError } from "@/utils";

/**
 * POST API Route - Create a new CareTaker
 *
 * @param req - Incoming request containing CareTaker details in JSON body
 * @returns JSON response with success status and created CareTaker
 *
 * Flow:
 * 1. Parse request body
 * 2. Call CareTakerService.createCareTaker() to insert into DB
 * 3. Return success response with result
 * 4. Handle and return errors gracefully
 */
export async function POST(req: Request): Promise<Response> {
  try {
    const body = await req.json();

    const result = await CareTakerService.createCareTaker(body);

    return Response.json({ success: true, result });
  } catch (err: unknown) {
    return handleError(err);
  }
}

/**
 * GET API Route - Fetch all CareTakers
 *
 * @returns JSON response with success status and list of CareTakers
 *
 * Flow:
 * 1. Call CareTakerService.getAllCareTakers() to fetch records from DB
 * 2. Return success response with result
 * 3. Handle and return errors gracefully
 */
export async function GET(): Promise<Response> {
  try {
    const result = await CareTakerService.getAllCareTakers();

    return Response.json({ success: true, result });
  } catch (err: unknown) {
    return handleError(err);
  }
}
