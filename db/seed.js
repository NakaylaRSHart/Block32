const client = new Client({
  connectionString: 'your_database_connection_string_here',
});

async function seedDatabase() {
  try {
    await client.connect();

    // Define initial data to insert into the database
    const activitiesData = [
      { name: 'Running', description: 'Go for a jog in the park' },
      { name: 'Cycling', description: 'Enjoy a bike ride on scenic trails' },
      // Add more activities as needed
    ];

    // Insert activities data into the 'activities' table
    for (const activity of activitiesData) {
      await client.query('INSERT INTO activities (name, description) VALUES ($1, $2)', [
        activity.name,
        activity.description,
      ]);
    }

    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.end();
  }
}

// Invoke the seedDatabase function to populate the database
seedDatabase();
