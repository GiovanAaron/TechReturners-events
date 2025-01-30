import { Client } from "pg";

import bcrypt from "bcrypt";

const saltRounds = 10; // Recommended number of salt rounds for bcrypt


interface User {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  gender: string;
  access_type: "Admin" | "Moderator" | "User";
  avatar: string;
  created_at: string;
  updated_at: string;
  username: string;
  password: string;
}

interface Event {
  owner_id: number;
  title: string;
  tickets_remaining: number;
  capacity: number;
  description: string;
  category: string;
  start_datetime: string;
  end_datetime: string;
  location_type: "Remote" | "In-Person";
  address: string | null;
  city: string | null;
  region: string | null;
  price: number;
  photo_1_url: string;
  photo_2_url: string | null;
  photo_3_url: string | null;
  google_event_id: string;
  visibility: "public" | "private" | "default";
  recurrence_rule: string | null;
}

interface Attendance {
  event_id: number;
  user_id: number;
  status: "Registered" | "Attended" | "Cancelled";
  registered_at: string;
}

async function seed(userdata: User[], eventsdata: Event[], attendancedata: Attendance[]) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();

    // Drop tables in reverse order to handle dependencies
    await client.query(`DROP TABLE IF EXISTS attendance CASCADE;`);
    await client.query(`DROP TABLE IF EXISTS event CASCADE;`);
    await client.query(`DROP TABLE IF EXISTS users CASCADE;`);


    // Create users table
    await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          username VARCHAR(255) NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          age INT CHECK (age >= 0),
          gender VARCHAR(10) CHECK (gender IN ('Male', 'Female', 'Other')),
          access_type VARCHAR(50) NOT NULL CHECK (access_type IN ('Admin', 'Moderator', 'User')),
          avatar TEXT,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
        );
      `);

    // Create event table
    await client.query(`
        CREATE TABLE event (
          id SERIAL PRIMARY KEY,
          owner_id INT NOT NULL,
          title VARCHAR(255) NOT NULL,
          tickets_remaining INT NOT NULL,
          capacity INT NOT NULL,
          description TEXT,
          category VARCHAR(50) NOT NULL CHECK (category IN ('Webinar', 'Job Fair', 'Hackathon')),
          start_datetime TIMESTAMPTZ NOT NULL,
          end_datetime TIMESTAMPTZ NOT NULL,
          location_type VARCHAR(50) NOT NULL CHECK (location_type IN ('Remote', 'In-Person')),
          address TEXT,
          city VARCHAR(100) CHECK (city IN (
            'London', 
            'Manchester', 
            'Birmingham', 
            'Leeds', 
            'Bristol', 
            'Cambridge', 
            'Newcastle upon Tyne', 
            'Edinburgh', 
            'Glasgow', 
            'Dundee', 
            'Cardiff', 
            'Swansea', 
            'Newport'
          )),
          region VARCHAR(100) CHECK (region IN ('England', 'Wales', 'Scotland')),
          price NUMERIC(10, 2) DEFAULT 0,
          photo_1_url TEXT,
          photo_2_url TEXT,
          photo_3_url TEXT,
          created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          google_event_id VARCHAR(255) UNIQUE,
          visibility VARCHAR(50) CHECK (visibility IN ('default', 'public', 'private')),
          recurrence_rule TEXT,
          CONSTRAINT fk_owner FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);

    // Create attendance table
    await client.query(`
        CREATE TABLE attendance (
          id SERIAL PRIMARY KEY,
          event_id INT NOT NULL,
          user_id INT NOT NULL,
          status VARCHAR(50) NOT NULL CHECK (status IN ('Registered', 'Attended', 'Cancelled')),
          registered_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT fk_event FOREIGN KEY (event_id) REFERENCES event(id) ON DELETE CASCADE,
          CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
      `);

    // console.log("Tables created successfully.");

    // Insert user data into 'users' table
    
    const userInsertPromises = userdata.map(async (user) => {
      const {
        first_name,
        last_name,
        email,
        username,
        password, // Plain text password from seed data
        age,
        gender,
        access_type,
        avatar,
        created_at,
        updated_at,
      } = user;
    
      // Hash the plain text password before inserting
      const hashedPassword = await bcrypt.hash(password, saltRounds);
    
      const query = `
            INSERT INTO users (first_name, last_name, email, username, password_hash, age, gender, access_type, avatar, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        `;
    
      await client.query(query, [
        first_name,
        last_name,
        email,
        username,
        hashedPassword, // Use the hashed password instead of plain text
        age,
        gender,
        access_type,
        avatar,
        created_at,
        updated_at,
      ]);
    });
    

    // Wait for all user data to be inserted
    await Promise.all(userInsertPromises);

    // Insert event data into 'event' table (assuming eventsdata structure)
    const eventInsertPromises = eventsdata.map(async (event) => {
      const {
        owner_id,
        title,
        tickets_remaining,
        capacity,
        description,
        category,
        start_datetime,
        end_datetime,
        location_type,
        address,
        city,
        region,
        price,
        photo_1_url,
        photo_2_url,
        photo_3_url,
        google_event_id,
        visibility,
        recurrence_rule,
      } = event;
      const query = `
            INSERT INTO event (owner_id, title, tickets_remaining, capacity, description, category, start_datetime, end_datetime, 
            location_type, address, city, region, price, photo_1_url, photo_2_url, photo_3_url, google_event_id, 
            visibility, recurrence_rule)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        `;
      await client.query(query, [
        owner_id,
        title,
        tickets_remaining,
        capacity,
        description,
        category,
        start_datetime,
        end_datetime,
        location_type,
        address,
        city,
        region,
        price,
        photo_1_url,
        photo_2_url,
        photo_3_url,
        google_event_id,
        visibility,
        recurrence_rule,
      ]);
    });

    // Wait for all event data to be inserted
    await Promise.all(eventInsertPromises);

    // Insert attendance data into 'attendance' table (assuming attendancedata structure)
    const attendanceInsertPromises = attendancedata.map(async (attendance) => {
      const { event_id, user_id, status, registered_at } = attendance;
      const query = `
            INSERT INTO attendance (event_id, user_id, status, registered_at)
            VALUES ($1, $2, $3, $4)
        `;
      await client.query(query, [event_id, user_id, status, registered_at]);
    });

    // Wait for all attendance data to be inserted
    await Promise.all(attendanceInsertPromises);
    // console.log("Data inserted successfully.");
  } catch (err) {
    console.error("Error creating tables:", err);
  } finally{
    await client.end();
  }
}

export default seed;

