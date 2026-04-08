import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  const html = generateReceiptHTML(data);

const browser = await puppeteer.launch({
  headless: true,
});

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  // 🔥 envia para o backend (NestJS)
  await fetch("http://localhost:3001/email/send-receipt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pdf: pdfBuffer.toString("base64"),
      email: data.user.email,
    }),
  });

  return NextResponse.json({
    success: true,
  });
}