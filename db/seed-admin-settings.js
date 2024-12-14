import pg from 'pg';

const { Pool } = pg;

const connectionString =
  'postgres://emjzlloo:KXquwbCINBQ8ukluBBuID_r8ujrej1F6@lallah.db.elephantsql.com/emjzlloo';

const pool = new Pool({
  connectionString,
});

async function seedAdminSettings() {
  try {
    const client = await pool.connect();

    const dropTable = `DROP TABLE IF EXISTS admin_settings;`;

    const createTableQuery = `

      CREATE TABLE IF NOT EXISTS admin_settings (
        id SERIAL PRIMARY KEY,
        component VARCHAR(255) UNIQUE NOT NULL,
        page INTEGER NOT NULL
      );
    `;

    const insertDataQuery = `
      INSERT INTO admin_settings (component, page) VALUES
        ('credentials', 1),
        ('birthday', 2),
        ('aboutMe', 2),
        ('address', 3),
        ('submitData', 4);
    `;

    await client.query(dropTable);
    await client.query(createTableQuery);
    await client.query(insertDataQuery);

    console.log('Seed successfull');
  } catch (error) {
    console.error('Error seeding: ', error);
  } finally {
    pool.end();
  }
}

seedAdminSettings();
