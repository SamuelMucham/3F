"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { saveToken } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.token) {
        setError(data.error || "Não foi possível entrar.");
        setLoading(false);
        return;
      }

      saveToken(data.token);
      router.push("/produtos");
      router.refresh();
    } catch {
      setError("Não foi possível falar com a API. Ela está no ar?");
      setLoading(false);
    }
  }

  return (
    <section className="container admin-login-wrap">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <span className="eyebrow">Área restrita</span>
        <h1 className="display">Login admin</h1>
        <p>Entre com seu e-mail e senha de administrador.</p>

        <label htmlFor="admin-email">E-mail</label>
        <input
          id="admin-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          required
        />

        <label htmlFor="admin-password">Senha</label>
        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <span className="admin-error">{error}</span>}

        <button type="submit" className="cta-button" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </section>
  );
}
