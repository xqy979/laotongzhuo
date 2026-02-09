import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import CaseForm from "@/components/admin/case-form";

async function getCase(id: string) {
  return prisma.case.findUnique({
    where: { id },
  });
}

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const caseItem = await getCase(id);

  if (!caseItem) {
    notFound();
  }

  return <CaseForm caseItem={caseItem} />;
}
