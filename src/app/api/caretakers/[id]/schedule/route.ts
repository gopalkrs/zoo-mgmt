import { ScheduleService } from "@/app/services";
import { handleError } from "@/utils";

// POST /api/caretakers/:id/schedule/generate → generate caretaker schedule
export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json(); // optional data (like custom tasks, times, etc.)

    const result = await ScheduleService.generateDailySchedule({
      id,
      ...body,
    });

    return Response.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}

// GET /api/caretakers/:id/schedule → fetch caretaker schedule
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    // extract date from query string (example: /api/caretakers/:id/schedule?date=2025-08-24)
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date") || undefined;

    const result = await ScheduleService.getSchedule({ id, date });

    return Response.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}
