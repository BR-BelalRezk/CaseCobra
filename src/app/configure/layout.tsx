import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import Steps from "@/components/shared/Steps";

export default function ConfigureUploadLayout({ children }: CHILDREN) {
  return (
    <MaxWidthWrapper className="flex-1 flex flex-col">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}
