import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { name, email, subject, message }: ContactFormData = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const TO_EMAIL = "miklhagstroem@gmail.com";

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #4fa88b 0%, #6ba896 100%);
              color: white;
              padding: 30px;
              border-radius: 10px 10px 0 0;
              text-align: center;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              background: #f8f9fa;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .field {
              margin-bottom: 20px;
            }
            .field-label {
              font-weight: 600;
              color: #4fa88b;
              margin-bottom: 5px;
            }
            .field-value {
              background: white;
              padding: 12px;
              border-radius: 5px;
              border-left: 3px solid #4fa88b;
            }
            .message-box {
              background: white;
              padding: 15px;
              border-radius: 5px;
              border-left: 3px solid #4fa88b;
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 2px solid #e0e0e0;
              text-align: center;
              color: #666;
              font-size: 12px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Ny Kontaktformular Besked</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">BusyBiz Hjemmeside</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">Navn:</div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <div class="field-label">Email:</div>
              <div class="field-value">
                <a href="mailto:${email}" style="color: #4fa88b; text-decoration: none;">${email}</a>
              </div>
            </div>

            <div class="field">
              <div class="field-label">Emne:</div>
              <div class="field-value">${subject || 'Ingen emne'}</div>
            </div>

            <div class="field">
              <div class="field-label">Besked:</div>
              <div class="message-box">${message}</div>
            </div>
          </div>
          <div class="footer">
            <p>Denne besked blev sendt fra BusyBiz kontaktformularen</p>
            <p>Modtaget: ${new Date().toLocaleString('da-DK', {
              timeZone: 'Europe/Copenhagen',
              dateStyle: 'full',
              timeStyle: 'short'
            })}</p>
          </div>
        </body>
      </html>
    `;

    const emailText = `
Ny Kontaktformular Besked fra BusyBiz

Navn: ${name}
Email: ${email}
Emne: ${subject || 'Ingen emne'}

Besked:
${message}

---
Modtaget: ${new Date().toLocaleString('da-DK')}
    `.trim();

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "BusyBiz Kontaktformular <onboarding@resend.dev>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Ny besked fra ${name} - ${subject || 'Kontaktformular'}`,
        html: emailHtml,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      const error = await resendResponse.text();
      console.error("Resend API error:", error);
      throw new Error("Failed to send email via Resend");
    }

    const result = await resendResponse.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully",
        id: result.id,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Error in send-contact-email function:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to send email",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});