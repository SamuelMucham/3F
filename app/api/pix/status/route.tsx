import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id obrigatório" }, { status: 400 });
  }

  try {
    const payment = new Payment(client);
    const result = await payment.get({ id });

    // status possíveis: pending, approved, rejected, cancelled, refunded, etc.
    return NextResponse.json({ status: result.status });
  } catch (err) {
    console.error("Erro ao consultar pagamento Pix:", err);
    return NextResponse.json(
      { error: "Erro ao consultar pagamento" },
      { status: 500 }
    );
  }
}