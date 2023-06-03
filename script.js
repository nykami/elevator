const numOfFloors = 7;
const doorWidth = 100;
const doorHeight = 150;
const upButtons = document.querySelectorAll('.up-button');
const downButtons = document.querySelectorAll('.down-button');
const floorHeight = 200;
const elevatorA = document.getElementById('movingElevatorA');
const elevatorB = document.getElementById('movingElevatorB');
const floors = document.querySelectorAll('.floor');

const liftButtonsA = document.getElementById('lift-buttons-A');
const liftButtonsB = document.getElementById('lift-buttons-B');

let currentFloorA = 1;
let currentFloorB = 7;
let dirA = null;
let dirB = null;
let ismovingA = false;
let ismovingB = false;

function moveElevator(elevator, currentFloor, targetFloor, duration, distance, liftButtons) {
  let targetTranslateY = null;

  if (currentFloor < targetFloor) {
    // moving upwards
    switch (elevator) {
      case elevatorA: {
        ismovingA = true;
        dirA = 'up';
        targetTranslateY = -((currentFloor - 1) * floorHeight) - (distance * floorHeight);
        console.log(`Elevator A moving ${dirA} to floor ${targetFloor - 1}`);
        break;
      }
      case elevatorB: {
        ismovingB = true;
        dirB = 'up';
        targetTranslateY = ((numOfFloors - currentFloor) * floorHeight) - (distance * floorHeight);
        console.log(`Elevator B moving ${dirB}  to floor ${targetFloor - 1}`);
        break;
      }
    }
  }
  else {
    // moving downwards
    switch (elevator) {
      case elevatorA: {
        ismovingA = true;
        dirA = 'down';
        targetTranslateY = (distance * floorHeight) - ((currentFloor - 1) * floorHeight);
        console.log(`Elevator A moving ${dirA} to floor ${targetFloor - 1}`);
        break;
      }
      case elevatorB: {
        ismovingB = true;
        dirB = 'down';
        targetTranslateY = (distance * floorHeight) + ((numOfFloors - currentFloor) * floorHeight);
        console.log(`Elevator B moving ${dirB} to floor ${targetFloor - 1}`);
        break;
      }
    }
  }
  elevator.style.transition = `transform ${duration / 1000}s ease-in-out`;
  elevator.style.transform = `translateY(${targetTranslateY}px)`;

}

// Function to update the direction and current floor of the elevators
function updateElevatorStatus() {
  floors.forEach((floor) => {
    const arrows = floor.querySelectorAll('.dir-arrow');
    arrows.forEach((arrow, index) => {
      if (index === 0) {
        // Left side (elevator A)
        if (ismovingA) {
          arrow.innerText = dirA === 'up' ? '⬆' : '⬇';
        } else {
          arrow.innerText = currentFloorA - 1;
        }
      } else {
        // Right side (elevator B)
        if (ismovingB) {
          arrow.innerText = dirB === 'up' ? '⬆' : '⬇';
        } else {
          arrow.innerText = currentFloorB - 1;
        }
      }
    });
  })
}

window.onload = () => {

  // initialize innerText for direction arrows on each floor with the current position of the elevators
  updateElevatorStatus();


  liftButtonsA.addEventListener('click', (event) => {
    const targetButton = event.target;
    if (targetButton.classList.contains('lift-floor-button')) {
      const destination = parseInt(targetButton.innerText) + 1;
      console.log(`Controls lift-A: ${destination - 1} was selected`);
      const distanceA = Math.abs(destination - currentFloorA);
      targetButton.style.borderColor = 'green';
      const duration = distanceA * 1000;
      moveElevator(elevatorA, currentFloorA, destination, duration, distanceA, liftButtonsA);
      currentFloorA = destination;
      setTimeout(() => {
        console.log(`Elevator A reached destination floor ${destination - 1}`);
        ismovingA = false;
        updateElevatorStatus();
        targetButton.style.borderColor = '';
      }, duration);
      updateElevatorStatus();
    }
  });

  liftButtonsB.addEventListener('click', (event) => {
    const targetButton = event.target;
    if (targetButton.classList.contains('lift-floor-button')) {
      const destination = parseInt(targetButton.innerText) + 1;
      console.log(`Controls lift-B: ${destination - 1} was selected`);
      const distanceB = Math.abs(destination - currentFloorB);
      targetButton.style.borderColor = 'green';
      const duration = distanceB * 1000;
      moveElevator(elevatorB, currentFloorB, destination, duration, distanceB, liftButtonsB);
      currentFloorB = destination;
      setTimeout(() => {
        console.log(`Elevator B reached destination floor ${currentFloorB - 1}`);
        ismovingB = false;
        updateElevatorStatus();
        targetButton.style.borderColor = '';
      }, duration);
      updateElevatorStatus();
    }
  });

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
        if (currentFloorA <= currentFloorB) { // case elevatorA is on lower level than elevatorB
          if (distanceA <= distanceB) {

            const duration = distanceA * 1000;
            moveElevator(elevatorA, currentFloorA, targetFloor, duration, distanceA);
            currentFloorA = targetFloor;
            setTimeout(() => {
              console.log(`Elevator A reached floor ${targetFloor - 1} `);
              ismovingA = false;
              updateElevatorStatus();
              button.style.borderColor = '';
            }, duration);
          } else {
            const duration = distanceB * 1000;
            moveElevator(elevatorB, currentFloorB, targetFloor, duration, distanceB);
            currentFloorB = targetFloor;
            setTimeout(() => {
              console.log(`Elevator B reached floor ${targetFloor - 1}`);
              ismovingB = false;
              updateElevatorStatus();
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
              ismovingA = false;
              updateElevatorStatus();
              button.style.borderColor = '';
            }, duration);
          } else {
            const duration = distanceB * 1000;
            moveElevator(elevatorB, currentFloorB, targetFloor, duration, distanceB);
            currentFloorB = targetFloor;
            setTimeout(() => {
              console.log(`Elevator B reached floor ${targetFloor - 1} `);
              ismovingB = false;
              updateElevatorStatus();
              button.style.borderColor = '';
            }, duration);
          }
        }
      }
      updateElevatorStatus();
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
        if (currentFloorA <= currentFloorB) { // case elevatorA is on lower level than elevatorB
          if (distanceA <= distanceB) {

            const duration = distanceA * 1000;
            moveElevator(elevatorA, currentFloorA, targetFloor, duration, distanceA);
            currentFloorA = targetFloor;
            setTimeout(() => {
              console.log(`Elevator A reached floor ${targetFloor - 1} `);
              ismovingA = false;
              updateElevatorStatus();
              button.style.borderColor = '';
            }, duration);
          } else {
            const duration = distanceB * 1000;
            moveElevator(elevatorB, currentFloorB, targetFloor, duration, distanceB);
            currentFloorB = targetFloor;
            setTimeout(() => {
              console.log(`Elevator B reached floor ${targetFloor - 1}`);
              ismovingB = false;
              updateElevatorStatus();
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
              ismovingA = false;
              updateElevatorStatus();
              button.style.borderColor = '';
            }, duration);
          } else {
            const duration = distanceB * 1000;
            moveElevator(elevatorB, currentFloorB, targetFloor, duration, distanceB);
            currentFloorB = targetFloor;
            setTimeout(() => {
              console.log(`Elevator B reached floor ${targetFloor - 1} `);
              ismovingB = false;
              updateElevatorStatus();
              button.style.borderColor = '';
            }, duration);
          }
        }
      }
      updateElevatorStatus();
    });
  });
};

