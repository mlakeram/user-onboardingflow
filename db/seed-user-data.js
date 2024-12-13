import pg from 'pg';

const { Pool } = pg;

const connectionString =
  'postgres://emjzlloo:KXquwbCINBQ8ukluBBuID_r8ujrej1F6@lallah.db.elephantsql.com/emjzlloo';

const pool = new Pool({
  connectionString,
});

async function seedDatabase() {
  try {
    const client = await pool.connect();
    `CREATE EXTENSION pgcrypto;`;
    const createTableQuery = `

      CREATE TABLE IF NOT EXISTS user_data (
        id SERIAL PRIMARY KEY,
        email_address VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        about_me TEXT NOT NULL,
        birthday DATE NOT NULL,
        address_street VARCHAR(255) NOT NULL,
        address_city VARCHAR(255) NOT NULL,
        address_state VARCHAR(255) NOT NULL,
        address_zipcode VARCHAR(255) NOT NULL,
        address_country VARCHAR(255) NOT NULL
      );
    `;

    const insertDataQuery = `
      INSERT INTO user_data (
        email_address,
        password,
        about_me,
        birthday,
        address_street,
        address_city,
        address_state,
        address_zipcode,
        address_country
      )
      VALUES
        (
          'user1@email.com',
          crypt('secretpassword1', gen_salt('bf', 10)),
          'I like dogs',
          '1991-01-01',
          '123 Broadway',
          'New York',
          'NY', 
          '11111',
          'United States'
        ),
        (
          'user2@email.com',
          crypt('secretpassword2', gen_salt('bf', 10)),
          'I like cats', '1992-02-02',
          '456 Park Ave',
          'New York',
          'NY',
          '22222',
          'United States'
        ),
        (
          'user3@email.com',
          crypt('secretpassword3',
          gen_salt('bf', 10)),
          'I like birds',
          '1993-03-03',
          '789 Canal St.',
          'New York',
          'NY',
          '33333',
          'United States'
        ),
        (
          'user4@email.com',
          crypt('secretpassword4',
          gen_salt('bf', 10)),
          'I like turtles',
          '1994-04-04',
          '101112 Madison Ave',
          'New York',
          'NY',
          '44444',
          'United States'
        ),
        (
          'user5@email.com',
          crypt('secretpassword5',
          gen_salt('bf', 10)),
          'I like whales',
          '1995-05-05',
          '131415 Lexington Ave',
          'New York',
          'NY',
          '55555',
          'United States'
        );
    `;

    await client.query(createTableQuery);
    await client.query(insertDataQuery);

    console.log('Seed successfull');
  } catch (error) {
    console.error('Error seeding: ', error);
  } finally {
    pool.end();
  }
}

seedDatabase();
