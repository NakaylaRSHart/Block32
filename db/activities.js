const client = require('./client.js');

// New Activity
const createActivity = async (name, description) => {
  try {
    const { rows } = await client.query(
      `INSERT INTO activities (name, description) 
      VALUES ('${name}','${description}') RETURNING *;`
    );
    return rows[0]; 
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error; 
  }
};

// Get Activities
const getActivities = async () => {
  try {
    const { rows } = await client.query('SELECT * FROM activities;');
    return rows; 
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error; 
  }
};

//Get activity with Id
const getActivity = async(activityId) => {
  try{
    const { rows } = await client.query(`SELECT * FROM activities WHERE id = ${activityId};`);
    return rows;
  } catch (error) {
    console.log(error)
  }
}

const deleteActivity = async(activityId) => {
  try{
    const { rows }  = await client.query(`DELETE FROM activities WHERE id = ${activityId} RETURNING *`);
    return rows.length > 0 ? 'Success' : 'Fail';
  } catch (error) {
    console.log('Failed to delete', error)
  }
}

module.exports = {
  createActivity,
  getActivities,
  getActivity,
  deleteActivity
};
