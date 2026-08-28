"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type LoginFormProps = {
  nextPath: string;
};

type LoginStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string };

function responseNext(input: unknown) {
  if (input && typeof input === "object" && "next" in input && typeof input.next === "string") {
    return input.next;
  }
  return "/";
}

export function LoginForm({ nextPath }: LoginFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<LoginStatus>({ kind: "idle" });

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus({ kind: "submitting" });

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password, next: nextPath }),
      });

      if (!response.ok) {
        setStatus({ kind: "error", message: "That password did not work. Try again." });
        return;
      }

      const data: unknown = await response.json();
      router.replace(responseNext(data));
      router.refresh();
    } catch {
      setStatus({ kind: "error", message: "The page could not sign you in. Try again." });
    }
  }

  const isSubmitting = status.kind === "submitting";

  return (
    <form className="login-form" onSubmit={submit}>
      <label htmlFor="password">Site password</label>
      <div className="login-field">
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          autoFocus
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Checking..." : "Enter"}
        </button>
      </div>
      <p className="login-message" role="status" aria-live="polite">
        {status.kind === "error" ? status.message : "Access is limited to invited teams."}
      </p>
    </form>
  );
}
