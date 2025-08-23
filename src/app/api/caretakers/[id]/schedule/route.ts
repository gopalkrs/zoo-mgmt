import { CaretakerScheduleService } from "@/app/services";
import { handleError } from "@/utils";

// POST /api/caretakers/:id/schedule/generate
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    
  } catch (error) {
    return handleError(error)
  }
}

// GET /api/caretakers/:id/schedule
export async function GET(req: Request, { params }: { params: { id: string } }) {
 try {
  
 } catch (error) {
  return handleError(error)
 }
}
