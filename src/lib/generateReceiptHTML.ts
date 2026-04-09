export function generateReceiptHTML(payment: any, user: any) {
  return `
  <html>
    <head>
      <title>.</title>

      <style>
        @page {
          size: A4;
          margin: 20mm;
        }

        body {
          font-family: Arial, sans-serif;
          font-size: 12px;
          color: #000;
          margin: 0;
        }

        .container {
          width: 100%;
        }

        /* ================= HEADER ================= */
        .header {
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #000;
          padding-bottom: 10px;
        }

        .company {
          max-width: 60%;
        }

        .company strong {
          font-size: 14px;
        }

        .company p {
          margin: 2px 0;
        }

        .doc-info {
          text-align: right;
        }

        .doc-info h1 {
          margin: 0;
          font-size: 20px;
        }

        .doc-info p {
          margin: 2px 0;
        }

        /* ================= CLIENT ================= */
        .client-box {
          margin-top: 20px;
          border: 1px solid #000;
          padding: 10px;
        }

        .client-title {
          font-weight: bold;
          margin-bottom: 6px;
          text-transform: uppercase;
        }

        .client-grid {
          display: grid;
          grid-template-columns: 120px 1fr 120px 1fr;
          gap: 4px 10px;
        }

        /* ================= TABLE ================= */
        .table {
          margin-top: 20px;
          width: 100%;
          border-collapse: collapse;
        }

        .table th {
          border: 1px solid #000;
          padding: 6px;
          background: #eee;
          text-align: left;
        }

        .table td {
          border: 1px solid #000;
          padding: 6px;
        }

        /* ================= TOTAL ================= */
        .totals {
          margin-top: 20px;
          width: 100%;
          display: flex;
          justify-content: flex-end;
        }

        .totals-box {
          width: 250px;
          border: 1px solid #000;
          padding: 10px;
        }

        .totals-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
        }

        .totals-row.total {
          font-weight: bold;
          border-top: 1px solid #000;
          padding-top: 5px;
        }

        /* ================= FOOTER ================= */
        .footer {
          margin-top: 40px;
          text-align: center;
          font-size: 11px;
        }

        /* PRINT FIX */
        @media print {
          .container {
            page-break-inside: avoid;
          }
        }

      </style>
    </head>

    <body>
      <div class="container">

        <!-- HEADER -->
        <div class="header">
          <div class="company">
            <strong>Sociedade Angolana de Pediatria</strong>
            <p>NIF: 500000000</p>
            <p>Luanda, Angola</p>
            <p>Email: sap@sapangola.com</p>
          </div>

          <div class="doc-info">
            <h1>RECIBO</h1>
            <p><strong>Nº:</strong> ${payment.reference || "0000"}</p>
            <p><strong>Data:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
        </div>

        <!-- CLIENTE -->
        <div class="client-box">
          <div class="client-title">Dados do Associado</div>

          <div class="client-grid">
            <div><strong>Nome:</strong></div>
            <div>${user?.name || "-"}</div>

            <div><strong>NIF:</strong></div>
            <div>${user?.nif || "-"}</div>

            <div><strong>Telefone:</strong></div>
            <div>${user?.cellphone || "-"}</div>

            <div><strong>Província:</strong></div>
            <div>${user?.province || "-"}</div>
          </div>
        </div>

        <!-- TABELA -->
        <table class="table">
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Mês/Ano</th>
              <th>Frequência</th>
              <th>Valor</th>
              <th>Moeda</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Pagamento de quota</td>
              <td>${payment.monthYear}</td>
              <td>${payment.frequency}</td>
              <td>${payment.amount}</td>
              <td>${payment.currency}</td>
            </tr>
          </tbody>
        </table>

        <!-- TOTAL -->
        <div class="totals">
          <div class="totals-box">
            <div class="totals-row total">
              <span>Total:</span>
              <span>${payment.amount} ${payment.currency}</span>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
          Documento processado por computador • Válido sem assinatura
        </div>

      </div>
    </body>
  </html>
  `;
}