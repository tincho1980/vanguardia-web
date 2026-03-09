import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);
const resendApiKey = process.env.RESEND_API_KEY;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const location = String(body.location ?? "").trim();
    const discoverySource = String(body.discoverySource ?? "").trim();
    const discoverySourceOther = String(body.discoverySourceOther ?? "").trim();
    const interest = String(body.interest ?? "").trim();
    const motivation = String(body.motivation ?? "").trim();
    const expectations = String(body.expectations ?? "").trim();
    const previousExperience = String(body.previousExperience ?? "").trim();
    const additionalNotes = String(body.additionalNotes ?? "").trim();
    const submissionType =
      body.submissionType === "basic" || body.submissionType === "extended"
        ? body.submissionType
        : "extended";

    // Validación básica
    if (!name || !email || !phone || !location) {
      return NextResponse.json(
        { message: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const resendToEmail = process.env.RESEND_TO_EMAIL;

    if (!resendApiKey || !resendFromEmail || !resendToEmail) {
      return NextResponse.json(
        {
          message:
            "Faltan variables de entorno para email (RESEND_API_KEY, RESEND_FROM_EMAIL y RESEND_TO_EMAIL)",
        },
        { status: 500 }
      );
    }

    // Enviar email usando Resend
    const result = await resend.emails.send({
      from: resendFromEmail,
      to: [resendToEmail],
      replyTo: email, // Email del cliente para responder
      subject: `Nuevo lead (${submissionType === "basic" ? "breve" : "completo"}) de ${name} - Vanguardia Web`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: 'Montserrat', sans-serif;
                background-color: #080606;
                color: #ffffff;
                padding: 40px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background: #111;
                border: 2px solid #972528;
                padding: 40px;
              }
              .header {
                text-align: center;
                border-bottom: 1px solid #972528;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .header h1 {
                color: #972528;
                font-size: 24px;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 2px;
              }
              .field {
                margin-bottom: 20px;
              }
              .label {
                color: #972528;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 2px;
                font-weight: 700;
              }
              .value {
                color: #ffffff;
                font-size: 16px;
                font-weight: 300;
                margin-top: 5px;
              }
              .message {
                background: #080606;
                padding: 20px;
                border-left: 3px solid #972528;
                margin-top: 30px;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #333;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Vanguardia</h1>
                <p style="color: #999; font-size: 14px; margin-top: 10px;">Nuevo mensaje desde la web</p>
              </div>

              <div class="field">
                <div class="label">Nombre</div>
                <div class="value">${escapeHtml(name)}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value">${escapeHtml(email)}</div>
              </div>

              <div class="field">
                <div class="label">Teléfono</div>
                <div class="value">${escapeHtml(phone)}</div>
              </div>

              <div class="field">
                <div class="label">Barrio / Localidad</div>
                <div class="value">${escapeHtml(location)}</div>
              </div>

              ${
                discoverySource
                  ? `
              <div class="field">
                <div class="label">Cómo conoció Vanguardia</div>
                <div class="value">${escapeHtml(discoverySource)}</div>
              </div>
              `
                  : ""
              }

              ${
                discoverySource === "Otro" && discoverySourceOther
                  ? `
              <div class="field">
                <div class="label">Detalle de "Otro"</div>
                <div class="value">${escapeHtml(discoverySourceOther)}</div>
              </div>
              `
                  : ""
              }

              ${
                interest
                  ? `
              <div class="message">
                <div class="label">Qué le interesó de la propuesta</div>
                <div class="value" style="margin-top: 15px; line-height: 1.6;">
                  ${escapeHtml(interest).replace(/\n/g, "<br>")}
                </div>
              </div>
              `
                  : ""
              }

              ${
                motivation
                  ? `
              <div class="message">
                <div class="label">Motivación para realizar una experiencia boudoir</div>
                <div class="value" style="margin-top: 15px; line-height: 1.6;">
                  ${escapeHtml(motivation).replace(/\n/g, "<br>")}
                </div>
              </div>
              `
                  : ""
              }

              ${
                expectations
                  ? `
              <div class="message">
                <div class="label">Expectativas</div>
                <div class="value" style="margin-top: 15px; line-height: 1.6;">
                  ${escapeHtml(expectations).replace(/\n/g, "<br>")}
                </div>
              </div>
              `
                  : ""
              }

              ${
                previousExperience
                  ? `
              <div class="message">
                <div class="label">Experiencias previas en boudoir</div>
                <div class="value" style="margin-top: 15px; line-height: 1.6;">
                  ${escapeHtml(previousExperience).replace(/\n/g, "<br>")}
                </div>
              </div>
              `
                  : ""
              }

              ${
                additionalNotes
                  ? `
              <div class="message">
                <div class="label">Información adicional para la entrevista</div>
                <div class="value" style="margin-top: 15px; line-height: 1.6;">
                  ${escapeHtml(additionalNotes).replace(/\n/g, "<br>")}
                </div>
              </div>
              `
                  : ""
              }

              <div class="footer">
                Vanguardia by Negrovski © 2026
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return NextResponse.json(
        {
          message:
            result.error.message ||
            "Resend rechazó el envío. Verificá remitente y dominio.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (error) {
    console.error("Error enviando email:", error);
    return NextResponse.json(
      { message: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
