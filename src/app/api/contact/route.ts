import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  nome: string;
  email: string;
  telefone?: string;
  assunto?: string;
  mensagem: string;
  website?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitize(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function env(name: string) {
  return process.env[name]?.trim();
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ContactPayload>;

    const payload: ContactPayload = {
      nome: sanitize(body.nome),
      email: sanitize(body.email),
      telefone: sanitize(body.telefone),
      assunto: sanitize(body.assunto),
      mensagem: sanitize(body.mensagem),
      website: sanitize(body.website),
    };

    if (payload.website) {
      return NextResponse.json({ ok: true, message: "Mensagem enviada com sucesso." });
    }

    if (!payload.nome || !payload.email || !payload.mensagem) {
      return NextResponse.json(
        { ok: false, message: "Preencha nome, email e mensagem." },
        { status: 400 },
      );
    }

    if (!isValidEmail(payload.email)) {
      return NextResponse.json(
        { ok: false, message: "Informe um email válido." },
        { status: 400 },
      );
    }

    const smtpHost = env("SMTP_HOST");
    const smtpPort = Number(env("SMTP_PORT") || "587");
    const smtpUser = env("SMTP_USER");
    const smtpPass = env("SMTP_PASS");
    const smtpSecure = env("SMTP_SECURE") === "true";
    const toEmail = env("CONTACT_TO_EMAIL") || smtpUser;
    const fromEmail = env("CONTACT_FROM_EMAIL") || smtpUser;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !toEmail || !fromEmail) {
      return NextResponse.json(
        {
          ok: false,
          message: "Envio de email não configurado. Defina SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS e CONTACT_TO_EMAIL.",
        },
        { status: 500 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const subject = payload.assunto
      ? `[Site TechMotors] ${payload.assunto}`
      : "[Site TechMotors] Nova mensagem de contato";

    const html = `
      <h2>Nova mensagem recebida</h2>
      <p><strong>Nome:</strong> ${payload.nome}</p>
      <p><strong>Email:</strong> ${payload.email}</p>
      <p><strong>Telefone:</strong> ${payload.telefone || "-"}</p>
      <p><strong>Assunto:</strong> ${payload.assunto || "-"}</p>
      <p><strong>Mensagem:</strong><br/>${payload.mensagem.replace(/\n/g, "<br/>")}</p>
    `;

    const text = [
      "Nova mensagem recebida",
      `Nome: ${payload.nome}`,
      `Email: ${payload.email}`,
      `Telefone: ${payload.telefone || "-"}`,
      `Assunto: ${payload.assunto || "-"}`,
      `Mensagem: ${payload.mensagem}`,
    ].join("\n");

    await transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true, message: "Mensagem enviada com sucesso." });
  } catch {
    return NextResponse.json(
      { ok: false, message: "Erro ao enviar mensagem. Tente novamente." },
      { status: 500 },
    );
  }
}
