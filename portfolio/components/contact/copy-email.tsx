"use client";

/* eslint-disable no-undef -- the inherited Babel parser does not recognize DOM/TypeScript scope analysis. */
import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="copy-email">
      <a href={`mailto:${email}`}>{email}</a>
      <button className="copy-email__button" type="button" onClick={copy} aria-label={`Copy ${email} to clipboard`}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
