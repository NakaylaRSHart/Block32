const client = require('./client.js')

const createRoutines = async (is_public, name, goal) => {
  try{
    const { rows } = await client.query(
      `INSERT INTO routines (is_public, name, goal) 
      VALUES (${is_public}, '${name}', '${goal}') RETURNING *;`
    );
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getRoutines = async () => {
  try{
    const { rows } = await client.query('SELECT * FROM routines');
    return rows;
  } catch (error) {
    console.log('Error fetching routines:',error);
    throw error;
  }
};

//Get Routine with Id
const getRoutine = async(routineId) => {
  try{
    const { rows } = await client.query(`SELECT * FROM routines WHERE id = ${routineId};`);
    return rows;
  } catch (error) {
    console.log(error)
  }
}

const deleteRoutine = async(routineId) => {
  try{
    const { rows } = await client.query(`DELETE FROM routines WHERE id = ${routineId} RETURNING *`);
    return rows.length > 0 ? 'Success' : 'Fail';
  } catch (error) {
    console.log('Failed to delete', error)
  }
}

module.exports = {
  createRoutines,
  getRoutines,
  getRoutine,
  deleteRoutine
};