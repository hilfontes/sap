function generateReceiptHTML(data: any) {
  return `
    <html>
      <body style="font-family: Arial; padding: 40px;">
        <h2>Recibo de Pagamento</h2>

        <p><strong>Nome:</strong> ${data.user.name}</p>
        <p><strong>Email:</strong> ${data.user.email}</p>

        <hr/>

        <p><strong>Valor:</strong> ${data.payment.amount} ${data.payment.currency}</p>
        <p><strong>Mês:</strong> ${data.payment.monthYear}</p>

        <br/>
        <p>Processado automaticamente</p>
      </body>
    </html>
  `;
}