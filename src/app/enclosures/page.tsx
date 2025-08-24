import { AddEnslouser, EnclosureList } from "@/components/enclouser";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-end">
        <AddEnslouser />
      </div>
      <EnclosureList />
    </div>
  );
}
