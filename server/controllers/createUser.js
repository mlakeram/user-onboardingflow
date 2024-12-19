import { pool } from '../utils/dBConfig.js';

export default async function createUser(req, res) {
  try {
    const { email, password, aboutMe, birthday, address } = req.body;
    const client = await pool.connect();
    const query = `
        INSERT INTO user_data (email_address, password, about_me, birthday, address_street, address_city, address_state, address_zipcode, address_country)
          VALUES ('${email}', crypt('${password}', gen_salt('bf', 10)), '${aboutMe}', '${birthday}', '${address.street}', '${address.city}', '${address.state}', '${address.zip}', '${address.country}')
          ON CONFLICT (email_address) DO NOTHING;
        `;

    client.query(query);

    client.release();
    res.status(201).json({ message: 'User created successfully' });
    console.log('User save successfully');
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Failed to create user' });
  }
}
