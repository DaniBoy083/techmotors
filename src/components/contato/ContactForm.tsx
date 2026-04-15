"use client";

import { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

const initialState = {
  nome: "",
  email: "",
  telefone: "",
  assunto: "",
  mensagem: "",
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !data.ok) {
        toast.error(data.message || "Erro ao enviar mensagem.");
        return;
      }

      toast.success(data.message || "Mensagem enviada com sucesso.");
      setForm(initialState);
    } catch {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
          Nome
        </label>
        <input
          type="text"
          id="nome"
          value={form.nome}
          onChange={(event) => setForm((prev) => ({ ...prev, nome: event.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
          placeholder="Seu nome"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
          placeholder="seu.email@exemplo.com"
          required
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
          Telefone
        </label>
        <input
          type="tel"
          id="telefone"
          value={form.telefone}
          onChange={(event) => setForm((prev) => ({ ...prev, telefone: event.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
          placeholder="(83) 98765-4321"
        />
      </div>

      <div>
        <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 mb-1">
          Assunto
        </label>
        <input
          type="text"
          id="assunto"
          value={form.assunto}
          onChange={(event) => setForm((prev) => ({ ...prev, assunto: event.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition"
          placeholder="Assunto da mensagem"
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-1">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          rows={4}
          value={form.mensagem}
          onChange={(event) => setForm((prev) => ({ ...prev, mensagem: event.target.value }))}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition resize-none"
          placeholder="Sua mensagem aqui..."
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
      </button>

    </form>
  );
}
