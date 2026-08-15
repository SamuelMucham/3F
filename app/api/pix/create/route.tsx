import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

// Necessário definir MERCADOPAGO_ACCESS_TOKEN no .env.local (nunca exponha no front-end)
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const amount = Number(body.amount);

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valor inválido" }, { status: 400 });
    }

    const payment = new Payment(client);

    const result = await payment.create({
      body: {
        transaction_amount: Math.round(amount * 100) / 100,
        description: body.description || "Pedido 3F Bebidas",
        payment_method_id: "pix",
        payer: {
          email: body.email || "cliente@3fbebidas.com.br",
          first_name: body.name || "Cliente",
        },
      },
      requestOptions: {
        idempotencyKey: crypto.randomUUID(),
      },
    });

    return NextResponse.json({
      id: result.id,
      status: result.status,
      qr_code: result.point_of_interaction?.transaction_data?.qr_code ?? null,
      qr_code_base64:
        result.point_of_interaction?.transaction_data?.qr_code_base64 ?? null,
    });
  } catch (err) {
    console.error("Erro ao criar cobrança Pix:", err);
    return NextResponse.json(
      { error: "Erro ao criar cobrança Pix" },
      { status: 500 }
    );
  }
}