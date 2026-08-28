import Image from "next/image";
import Link from "next/link";

const THOMSON_REUTERS_WORDMARK =
  "https://www.thomsonreuters.com/etc.clientlibs/uefalcon/clientlibs/clientlib-bayberry/resources/images/tr-rebranded-logo.svg";

type BrandLockupProps = {
  linked?: boolean;
};

export function BrandLockup({ linked = true }: BrandLockupProps) {
  const mark = (
    <span className="brand-lockup" aria-label="Thomson Reuters and SpaceXAI">
      <Image
        className="customer-wordmark"
        src={THOMSON_REUTERS_WORDMARK}
        alt="Thomson Reuters"
        width={193}
        height={27}
        unoptimized
        priority
      />
      <span className="brand-times" aria-hidden="true">
        ×
      </span>
      <Image
        className="spacexai-wordmark"
        src="/brand/spacexai.svg"
        alt="SpaceXAI"
        width={1294}
        height={158}
        priority
      />
    </span>
  );

  return linked ? (
    <Link className="brand-link" href="/">
      {mark}
    </Link>
  ) : (
    mark
  );
}
