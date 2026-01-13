import mysql from 'mysql2/promise';

// Configuration de la connexion MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // WAMP par défaut
  database: 'bitcoin_merch',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Fonction helper pour exécuter des requêtes
export async function query<T = any>(
  sql: string,
  params?: any[]
): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Test de connexion
export async function testConnection(): Promise<boolean> {
  try {
    await pool.query('SELECT 1');
    console.log('✅ MySQL connection successful');
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error);
    return false;
  }
}

export default pool;
