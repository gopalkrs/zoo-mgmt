import { EnclosureServices } from "@/app/services/enclosure.service";
import { connectDB } from "@/lib/db";
import { NextRequest } from "next/server";

const enclosureServices = new EnclosureServices();

export async function DELETE(
    req: NextRequest,
    context: { params: { id: string } }) {
    try{
        const { id } = context.params;
        await connectDB();
        const deletedEnclosure = await enclosureServices.deleteEnclosureById(id);
        if(!deletedEnclosure){
            return Response.json(
                {error: "Enclosure not found"}, 
                {status: 404}
            )
        }
        return Response.json(
                {message: "Enclosure deleted successfully", result: deletedEnclosure}, 
                {status: 200}
            )
    }catch(error){
        console.error("Error deleting enclosure:", error);
        return Response.json({error: "Failed to delete enclosure"}, {status: 500})
    }
}

export async function PUT(
    req: NextRequest, 
    context: { params: { id: string } }) {
    try{
        const { id } = context.params;
        await connectDB();
        const body = await req.json();
        const updatedEnclosure = await enclosureServices.updateEnclosureById(id, body);
        if(!updatedEnclosure){
            return Response.json(
                {error: "Enclosure not found"}, 
                {status: 404}
            )
        }
        return Response.json(
            {message: "Enclosure updated successfully", result: updatedEnclosure},
            {status: 200}
        )
    }catch(error){
        console.error("Error updating enclosure:", error);
        return Response.json({error: "Failed to update enclosure"}, {status: 500})
    }
}