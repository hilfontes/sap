"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  cellphone: string;
  email: string;
};

export default function AssociadosPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const API_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/api/auth/users?order=${sortOrder}`);
        const data: User[] = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, [sortOrder]);

  const handlePrint = () => window.print();

  const today = new Date().toLocaleDateString("pt-PT");

  return (
    <div className={styles.container}>
      {/* botão (não imprime) */}
      <button onClick={handlePrint} className={styles.printButton}>
        🖨️ Imprimir Lista
      </button>

      {/* relatório */}
      <div className={styles.report}>
        {/* CABEÇALHO */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <img src="/logo.png" alt="Logo" className={styles.logo} />

            <div className={styles.headerText}>
              <h1>Lista de Associados</h1>
              <p>Data: {today}</p>
            </div>
          </div>
        </div>

        {/* TABELA */}
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={`${styles.th} ${styles.colName}`}>Nome</th>
              <th className={`${styles.th} ${styles.colCellphone}`}>
                Telefone
              </th>
              <th className={`${styles.th} ${styles.colEmail}`}>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className={`${styles.td} ${styles.colName}`}>
                  {user.name}
                </td>

                <td className={`${styles.td} ${styles.colCellphone}`}>
                  {user.cellphone}
                </td>

                <td className={`${styles.td} ${styles.colEmail}`}>
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* RODAPÉ */}
        <div className={styles.footer}>Total de associados: {users.length}</div>
      </div>
    </div>
  );
}
