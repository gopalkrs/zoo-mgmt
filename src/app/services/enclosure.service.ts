import { EnclosureModel } from "@/models/enclosure.model";
import { EnclosureDocument } from "@/types";

export class EnclosureServices {
  async createEnclosure(data: EnclosureDocument): Promise<EnclosureDocument> {
    const enclosureResult = await EnclosureModel.create(data);
    return enclosureResult;
  }

  async getEnclosures(): Promise<EnclosureDocument[]> {
    const enclosureList = await EnclosureModel.find();
    return enclosureList;
  }

  async deleteEnclosureById(id: string): Promise<EnclosureDocument | null> {
    const deletedEnclosure = await EnclosureModel.findByIdAndDelete(id);
    return deletedEnclosure;
  }

  async updateEnclosureById(
    id: string,
    data: Partial<EnclosureDocument>
  ): Promise<EnclosureDocument | null> {
    const allowedUpdates = ["name", "status"];
    const updates: Partial<EnclosureDocument> = {};

    for (const key of allowedUpdates) {
      if (data[key as keyof EnclosureDocument] !== undefined) {
        updates[key as keyof EnclosureDocument] = data[key as keyof EnclosureDocument];
      }
    }

    const updatedRecord = await EnclosureModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    return updatedRecord;
  }
}
