import DesignPreview from "@/components/shared/DesignPreview";
import { db } from "@/db";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
export default async function Preview({ searchParams }: Props) {
  const { id } = searchParams;
  if (!id || typeof id !== "string") {
    return notFound();
  }
  const configuration = await db.configuration.findUnique({ where: { id } });
  if (!configuration) {
    return notFound();
  }

  return <DesignPreview configuration={configuration} />;
}
