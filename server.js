const express = require('express');
const app = express();
const { getRoutines, createRoutines, getRoutine, deleteRoutine} = require('./db/routines.js');
const { getActivities, createActivity, getActivity, deleteActivity} = require('./db/activities.js');
const { createActivity_Routine } = require('./db/activities_routines.js');

const client = require('./db/client.js');
client.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('dist'));

app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});


app.get('/api/v1/routines', async (req, res, next) => {
  try{
    const allRoutines = await getRoutines();

    res.send(allRoutines);
  } catch (error) {
    next (error);
  }
});

app.post('/api/v1/routines', async(req, res, next) => {
  try{
    const {is_public, name, goal} = req.body;
    const newRoutine = await createRoutines(is_public, name, goal);
    res.send(newRoutine)
  } catch (error) {
    next (error);
  }
});

app.get('/api/v1/activities', async (req, res, next) => {
  try{
    const allActivities = await getActivities();

    res.send(allActivities);
  } catch (error) {
    next (error);
  }
});

app.post('/api/v1/activities', async(req, res, next) => {
  try{
    const { name, description} = req.body;
    const newActivity = await createActivity( name, description);
    res.send(newActivity)
  } catch (error) {
    next (error);
  }
});

app.get('/api/v1/activities/:activityId', async (req, res, next) => {
  try{
    const activity = await getActivity(req.params.activityId);

    res.send(activity);
  } catch (error) {
    next (error);
  }
});

app.get('/api/v1/routines/:routineId', async (req, res, next) => {
  try{
    const routine = await getRoutine(req.params.routineId);

    res.send(routine);
  } catch (error) {
    next (error);
  }
});

app.post('/api/v1/routines_activities/', async(req, res, next) => {
  try{
    const {routine_id, activity_id, count} = req.body;
    const routineActivity = await createActivity_Routine( routine_id, activity_id, count);
    res.send(routineActivity)
  } catch (error) {
    next (error);
  }
});

app.delete('/api/v1/activities/:activityId', async (req, res, next) => {
  try{
    const activity = await deleteActivity(req.params.activityId);

    res.send(activity);
  } catch (error) {
    next (error);
  }
});

app.delete('/api/v1/routines/:routineId', async (req, res, next) => {
  try{
    const routine = await deleteRoutine(req.params.routineId);

    res.send(routine);
  } catch (error) {
    next (error);
  }
});


app.listen(8080, () => console.log(`listening to port 8080`))