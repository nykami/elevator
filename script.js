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
function animateElevator(elevator, targetFloor, duration) {
  const targetTranslateY = -((targetFloor) * floorHeight) + floorHeight - 10 * (targetFloor - 1);
  console.log("targetTranslateY: ", targetTranslateY);
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
      console.log("Button index: ", index);
      // Calculate the distance to the target floor
      const targetFloor = numOfFloors - index;
      const currentFloor = getCurrentFloor(elevatorA);
      console.log('currentFloor: ', currentFloor);
      console.log('target: ', targetFloor);
      const distance = Math.abs(targetFloor - currentFloor);

      // Calculate the duration for the elevator to reach the target floor (assuming 1 floor per second)
      const duration = distance * 1000;

      // Animate the elevator to the target floor
      animateElevator(elevatorA, targetFloor, duration);

      // Reset the button border color after the elevator reaches the target floor
      setTimeout(() => {
        button.style.borderColor = '';
      }, duration);
    });
  });

  downButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Add green border to the clicked button
      button.style.borderColor = 'green';

      // Calculate the distance to the target floor
      const targetFloor = numOfFloors - index;
      const currentFloor = getCurrentFloor(elevatorA);
      console.log('current: ', currentFloor);
      // console.log('target: ', targetFloor);
      const distance = Math.abs(targetFloor - currentFloor);

      // Calculate the duration for the elevator to reach the target floor (assuming 1 floor per second)
      const duration = distance * 1000;

      // Animate the elevator to the target floor
      animateElevator(elevatorA, numOfFloors - targetFloor, duration);

      // Reset the button border color after the elevator reaches the target floor
      setTimeout(() => {
        button.style.borderColor = '';
      }, duration);
    });
  });
};

