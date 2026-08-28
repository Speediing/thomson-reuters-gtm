import Image from "next/image";

const THOMSON_REUTERS_SOURCE =
  "https://www.thomsonreuters.com/etc.clientlibs/uefalcon/clientlibs/clientlib-bayberry/resources/images/tr-rebranded-logo.svg";

export function BrandLockup({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div
      className={`brand-lockup brand-lockup-${size}`}
      aria-label="Thomson Reuters and SpaceXAI"
    >
      <Image
        src="/brand/thomson-reuters.svg"
        alt="Thomson Reuters"
        className="brand-customer"
        width={1926}
        height={468}
        data-source={THOMSON_REUTERS_SOURCE}
        priority
      />
      <span className="brand-times" aria-hidden>
        ×
      </span>
      <Image
        src="/brand/spacexai.svg"
        alt="SpaceXAI"
        className="brand-sxai"
        width={1294}
        height={158}
        priority
      />
    </div>
  );
}
