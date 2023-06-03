const numOfFloors = 7;
const doorWidth = 100;
const doorHeight = 150;
const upButtons = document.querySelectorAll('.up-button');
const downButtons = document.querySelectorAll('.down-button');
const floorHeight = 200;
const elevatorA = document.getElementById('movingElevatorA');
const elevatorB = document.getElementById('movingElevatorB');
let currentFloorA = 1;
let currentFloorB = 7;

function moveElevator(elevator, currentFloor, targetFloor, duration, distance) {
  let targetTranslateY = null;

  if (currentFloor < targetFloor) {
    // moving upwards
    switch (elevator) {
      case elevatorA: {
        targetTranslateY = -((currentFloor - 1) * floorHeight) - (distance * floorHeight);
        console.log(`Elevator A moving to floor ${targetFloor - 1}`);
        break;
      }
      case elevatorB: {
        targetTranslateY = ((numOfFloors - currentFloor) * floorHeight) - (distance * floorHeight);
        console.log(`Elevator B moving to floor ${targetFloor - 1}`);
        break;
      }
    }
  }
  else {
    // moving downwards
    switch (elevator) {
      case elevatorA: {
        targetTranslateY = (distance * floorHeight) - ((currentFloor - 1) * floorHeight);
        console.log(`Elevator A moving to floor ${targetFloor - 1}`);
        break;
      }
      case elevatorB: {
        targetTranslateY = (distance * floorHeight) + ((numOfFloors - currentFloor) * floorHeight);
        console.log(`Elevator B moving to floor ${targetFloor - 1}`);
        break;
      }
    }
  }
  elevator.style.transition = `transform ${duration / 1000}s ease-in-out`;
  elevator.style.transform = `translateY(${targetTranslateY}px)`;
}

window.onload = () => {
  upButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      let targetFloor = numOfFloors - index;

      const distanceA = Math.abs(targetFloor - currentFloorA);
      const distanceB = Math.abs(targetFloor - currentFloorB);

      if (distanceA == 0 || distanceB == 0) {
        alert(`There is already one elevator on floor ${targetFloor - 1} `);
      }
      else {
        button.style.borderColor = 'green';
        if (currentFloorA < currentFloorB) { // case elevatorA is on lower level than elevatorB
          if (distanceA <= distanceB) {

            const duration = distanceA * 1000;
            moveElevator(elevatorA, currentFloorA, targetFloor, duration, distanceA);
            currentFloorA = targetFloor;
            setTimeout(() => {
              console.log(`Elevator A reached floor ${targetFloor - 1} `);
              button.style.borderColor = '';
            }, duration);
          } else {
            const duration = distanceB * 1000;
            moveElevator(elevatorB, currentFloorB, targetFloor, duration, distanceB);
            currentFloorB = targetFloor;
            setTimeout(() => {
              console.log(`Elevator B reached floor ${targetFloor - 1}`);
              button.style.borderColor = '';
            }, duration);
          }
        } else if (currentFloorA > currentFloorB) {  // case elevatorA is on higher floor than elevatorB
          if (distanceA < distanceB) {
            const duration = distanceA * 1000;
            moveElevator(elevatorA, currentFloorA, targetFloor, duration, distanceA);
            currentFloorA = targetFloor;
            setTimeout(() => {
              console.log(`Elevator A reached floor ${targetFloor - 1}`);
              button.style.borderColor = '';
            }, duration);
          } else {
            const duration = distanceB * 1000;
            moveElevator(elevatorB, currentFloorB, targetFloor, duration, distanceB);
            currentFloorB = targetFloor;
            setTimeout(() => {
              console.log(`Elevator B reached floor ${targetFloor - 1} `);
              button.style.borderColor = '';
            }, duration);
          }
        }
      }
    });
  });

  downButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      let targetFloor = numOfFloors - index;

      const distanceA = Math.abs(targetFloor - currentFloorA);
      const distanceB = Math.abs(targetFloor - currentFloorB);

      if (distanceA == 0 || distanceB == 0) {
        alert(`There is already one elevator on floor ${targetFloor - 1} `);
      }
      else {
        button.style.borderColor = 'green';
        if (currentFloorA < currentFloorB) { // case elevatorA is on lower level than elevatorB
          if (distanceA <= distanceB) {

            const duration = distanceA * 1000;
            moveElevator(elevatorA, currentFloorA, targetFloor, duration, distanceA);
            currentFloorA = targetFloor;
            setTimeout(() => {
              console.log(`Elevator A reached floor ${targetFloor - 1} `);
              button.style.borderColor = '';
            }, duration);
          } else {
            const duration = distanceB * 1000;
            moveElevator(elevatorB, currentFloorB, targetFloor, duration, distanceB);
            currentFloorB = targetFloor;
            setTimeout(() => {
              console.log(`Elevator B reached floor ${targetFloor - 1}`);
              button.style.borderColor = '';
            }, duration);
          }
        } else if (currentFloorA > currentFloorB) {  // case elevatorA is on higher floor than elevatorB
          if (distanceA < distanceB) {
            const duration = distanceA * 1000;
            moveElevator(elevatorA, currentFloorA, targetFloor, duration, distanceA);
            currentFloorA = targetFloor;
            setTimeout(() => {
              console.log(`Elevator A reached floor ${targetFloor - 1}`);
              button.style.borderColor = '';
            }, duration);
          } else {
            const duration = distanceB * 1000;
            moveElevator(elevatorB, currentFloorB, targetFloor, duration, distanceB);
            currentFloorB = targetFloor;
            setTimeout(() => {
              console.log(`Elevator B reached floor ${targetFloor - 1} `);
              button.style.borderColor = '';
            }, duration);
          }
        }
      }
    });
  });
};

