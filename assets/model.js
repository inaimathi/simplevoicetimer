const exercises = {
  shoulder-stretch: {name: "Shoulder Stretch"},
  standing-side-bend: {name: "Standing Side Bend"},
  chest-stretch: {name: "Chest Stretch"},
  tricep-stretch: {name: "Tricep Stretch"},
  spine-lumbar-twist-stretch: {name: "Spine Lumbar Twist Stretch"},
  seated-butterfly-stretch: {name: "Seated Butterfly Stretch"},
  forward-bend: {name: "Forward Bend"}
};

const workouts = {
  full-body-stretch: {
    name: "Full Body Stretch",
    rest-between: {seconds: 10},
    exercises: [
      {id: "shoulder-stretch", duration: {seconds: 30}},
      {id: "standing-side-bend", duration: {seconds: 30}},
      {id: "chest-stretch", duration: {seconds: 30}},
      {id: "tricep-stretch", side: "left", duration: {seconds: 20}},
      {id: "tricep-stretch", side: "right", duration: {seconds: 20}},
      {id: "spine-lumbar-twist-stretch", side: "left", duration: {seconds: 40}},
      {id: "spine-lumbar-twist-stretch", side: "right", duration: {seconds: 40}},
      {id: "seated-butterfly-stretch", duration: {minutes: 1}},
      {id: "forward-bend", duration: {minutes: 3, seconds: 30}}
    ]
  }
};

const workoutOrder = ["full-body-stretch"];


// function loadWorkout(name) {
//   if (hasStorage) {
//     const serialized = window.localStorage.getItem("workout/" + name);
//     if (serialized !== null) {
//       return JSON.parse(serialized);
//     }
//   }
//   return {};
// }

// function saveWorkout(name, workout) {
//   if (hasStorage) {
//     window.localStorage.setItem("workout/" + name, JSON.serialize(workout));
//     return true;
//   };
//   return false;
// }

// function listWorkouts() {
//   return ["lower-body-stretch", "full-body-stretch"];
// }
