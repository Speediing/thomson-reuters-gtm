import { BrandLockup } from "@/components/brand-lockup";
import { LoginForm } from "@/components/login-form";
import { safeNextPath } from "@/lib/auth";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const next = Array.isArray(params.next) ? params.next[0] : params.next;

  return (
    <main className="login-page">
      <div className="login-orbit login-orbit-one" aria-hidden="true" />
      <div className="login-orbit login-orbit-two" aria-hidden="true" />
      <section className="login-card">
        <BrandLockup linked={false} />
        <div className="login-copy">
          <p className="eyebrow">Private working session</p>
          <h1>Thomson Reuters x SpaceXAI</h1>
          <p>Enter the shared password to open the GTM working session.</p>
        </div>
        <LoginForm nextPath={safeNextPath(next)} />
        <p className="login-foot">Prepared for Thomson Reuters</p>
      </section>
    </main>
  );
}
