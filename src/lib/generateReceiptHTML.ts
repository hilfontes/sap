export function generateReceiptHTML(payment: any) {
  return `
  <html>
    <head>
      <title>Recibo</title>
      <style>
        body {
          font-family: Arial;
          padding: 40px;
        }

        .header {
          display: flex;
          justify-content: space-between;
        }

        .left img {
          width: 80px;
        }

        .company {
          margin-top: 10px;
          font-size: 14px;
        }

        .right {
          text-align: right;
        }

        .table {
          margin-top: 40px;
          width: 100%;
          border-collapse: collapse;
        }

        .table th, .table td {
          border: 1px solid #ccc;
          padding: 10px;
        }

        .footer {
          margin-top: 60px;
          text-align: center;
          font-size: 12px;
          color: gray;
        }
      </style>
    </head>

    <body>
      <div class="header">
        <div class="left">
          <img src="/logo.png" />
          <div class="company">
            <strong>Minha Empresa</strong><br/>
            Luanda, Angola
          </div>
        </div>

        <div class="right">
          <h2>RECIBO</h2>
          <p>Ref: ${payment.reference || "-"}</p>
        </div>
      </div>

      <table class="table">
        <tr>
          <th>Mês/Ano</th>
          <th>Frequência</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Data</th>
        </tr>

        <tr>
          <td>${payment.monthYear}</td>
          <td>${payment.frequency}</td>
          <td>${payment.amount}</td>
          <td>${payment.currency}</td>
          <td>${new Date().toLocaleDateString()}</td>
        </tr>
      </table>

      <div class="footer">
        Processado por computador
      </div>
    </body>
  </html>
  `;
}