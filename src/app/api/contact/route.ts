import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, phone, message } = await request.json();

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const resendFromEmail = process.env.RESEND_FROM_EMAIL;
    const resendToEmail = process.env.RESEND_TO_EMAIL;

    if (!resendFromEmail || !resendToEmail) {
      return NextResponse.json(
        {
          message:
            "Faltan variables de entorno para email (RESEND_FROM_EMAIL y RESEND_TO_EMAIL)",
        },
        { status: 500 }
      );
    }

    // Enviar email usando Resend
    const data = await resend.emails.send({
      from: resendFromEmail,
      to: [resendToEmail],
      replyTo: email, // Email del cliente para responder
      subject: `Nuevo mensaje de ${name} - Vanguardia Web`,
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
                <div class="value">${name}</div>
              </div>

              <div class="field">
                <div class="label">Email</div>
                <div class="value">${email}</div>
              </div>

              ${
                phone
                  ? `
              <div class="field">
                <div class="label">Teléfono</div>
                <div class="value">${phone}</div>
              </div>
              `
                  : ""
              }

              <div class="message">
                <div class="label">Mensaje</div>
                <div class="value" style="margin-top: 15px; line-height: 1.6;">
                  ${message.replace(/\n/g, "<br>")}
                </div>
              </div>

              <div class="footer">
                Vanguardia by Negrovski © 2026
              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error enviando email:", error);
    return NextResponse.json(
      { message: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
