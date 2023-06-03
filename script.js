const numOfFloors = 7;
const upButtons = document.querySelectorAll('.up-button');
const downButtons = document.querySelectorAll('.down-button');


const elevatorA = document.getElementById('movingElevatorA');
const floorHeight = elevatorA.parentElement.parentElement.offsetHeight;
const elevatorB = document.getElementById('movingElevatorB');

function getCurrentFloor(elevator) {
  const translateY = parseInt(window.getComputedStyle(elevator).getPropertyValue('transform').split(',')[5]);
  const currentFloor = Math.abs(Math.round(translateY / floorHeight)) + 1;
  return currentFloor;
}

// Function to animate the elevator to the target floor
function animateElevator(elevator, currentFloor, targetFloor, duration) {
  let direction = null;
  let targetTranslateY = null;
  if (currentFloor < targetFloor) {
    // moving upwards
    direction = 1;
    console.log("targetFloor: ", targetFloor);
    console.log("floorHeight: ", floorHeight);
    targetTranslateY = -((targetFloor) * floorHeight) + floorHeight - (10 * (targetFloor - 1));
    console.log("targetTranslateY: ", targetTranslateY);
  }
  else {
    // moving downwards
    direction = -1;
    console.log("targetFloor: ", targetFloor);
    console.log("floorHeight: ", floorHeight);
    targetTranslateY = ((targetFloor - 1) * floorHeight) + (10 * (currentFloor - targetFloor)) - floorHeight; console.log("targetTranslateY: ", targetTranslateY);
  }

  // Apply CSS animation to elevator
  elevator.style.transition = `transform ${duration / 1000}s ease-in-out`;
  elevator.style.transform = `translateY(${targetTranslateY}px)`;
}

window.onload = () => {
  // Add event listener to each floor button
  upButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Add green border to the clicked button
      button.style.borderColor = 'green';
      // Calculate the distance to the target floor
      const targetFloor = numOfFloors - index;
      let currentFloorA = getCurrentFloor(elevatorA);
      if (isNaN(currentFloorA)) {
        currentFloorA = 1;
      }
      let currentFloorB = getCurrentFloor(elevatorB);
      if (isNaN(currentFloorB)) {
        currentFloorB = 7;
      }

      const distanceA = Math.abs(targetFloor - currentFloorA);
      const distanceB = Math.abs(targetFloor - currentFloorB);

      let chosenElevator = null;
      let distance = null;
      let currentFloor = null;
      if (distanceA <= distanceB) {
        chosenElevator = elevatorA;
        distance = distanceA;
        currentFloor = currentFloorA;
      } else {
        chosenElevator = elevatorB;
        distance = distanceB;
        currentFloor = currentFloorB;
      }

      // Calculate the duration for the elevator to reach the target floor (assuming 1 floor per second)
      const duration = distance * 1000;

      // Animate the elevator to the target floor
      console.log(`Elevator ${chosenElevator} moving to floor ${targetFloor}`);
      animateElevator(chosenElevator, currentFloor, targetFloor, duration);

      // Reset the button border color after the elevator reaches the target floor
      setTimeout(() => {
        console.log(`Elevator ${chosenElevator} reached ${targetFloor - 1} floor`);
        button.style.borderColor = '';
      }, duration);
    });
  });

  // Add event listener to each floor button
  downButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Add green border to the clicked button
      button.style.borderColor = 'green';
      // Calculate the distance to the target floor
      const targetFloor = numOfFloors - index;
      const currentFloor = getCurrentFloor(elevatorA);
      const distance = Math.abs(targetFloor - currentFloor);

      // Calculate the duration for the elevator to reach the target floor (assuming 1 floor per second)
      const duration = distance * 1000;

      // Animate the elevator to the target floor
      console.log("Eevator moving down");
      animateElevator(elevatorA, targetFloor, duration);

      // Reset the button border color after the elevator reaches the target floor
      setTimeout(() => {
        console.log(`Elevator reached ${targetFloor - 1} floor`);
        button.style.borderColor = '';
      }, duration);
    });
  });
};

