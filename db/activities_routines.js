const client = require('./client.js');

const createActivity_Routine = async (routine_id, activity_id, count) => {
  try{
    const { rows } = await client.query
    (`INSERT INTO routines_activities (routine_id, activity_id, count)
    VALUES (${routine_id}, ${activity_id}, ${count}) RETURNING *;`
  );
  return rows;
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  createActivity_Routine
}