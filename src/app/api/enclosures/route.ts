import { EnclosureServices } from "@/app/services/enclosure.service";
import { connectDB } from "@/lib/db";
import { NextRequest } from "next/server";

const enclosureServices = new EnclosureServices();

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();

    const enclosureResult = await enclosureServices.createEnclosure(body);
    return Response.json(
      { message: "Enclosure created successfully", result: enclosureResult },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error creating enclosure:", error);
    return Response.json(
      { error: "Failed to create enclosure" },
      { status: 500 }
    );
  }
}

export async function GET() {
  
  try {
    await connectDB();
    const enclosureList = await enclosureServices.getEnclosures();
    return Response.json(
      { message: "Enclosures fetched successfully", result: enclosureList },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error finding enclosures:", error);
  }
}

