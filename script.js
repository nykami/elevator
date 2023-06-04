const numOfFloors = 7;
const floorHeight = 200;
const floors = document.querySelectorAll('.floor');
const segmentDisplayA = document.querySelector('#display-A')
const segmentDisplayB = document.querySelector('#display-B')

const upButtons = document.querySelectorAll('.up-button');
const downButtons = document.querySelectorAll('.down-button');
const liftButtonsA = document.getElementById('lift-buttons-A');
const liftButtonsB = document.getElementById('lift-buttons-B');

const elevatorA = document.getElementById('movingElevatorA');
const elevatorB = document.getElementById('movingElevatorB');

let currentFloorA = 1;
let currentFloorB = 7;
let dirA = null;
let dirB = null;
let ismovingA = false;
let ismovingB = false;

function moveElevator(elevator, currentFloor, targetFloor, duration, distance) {
  let targetTranslateY = null;
  if (currentFloor < targetFloor) {
    // moving upwards
    switch (elevator) {
      case elevatorA: {
        ismovingA = true;
        dirA = 'up';
        targetTranslateY = -((currentFloor - 1) * floorHeight) - (distance * floorHeight);
        console.log(`Elevator A moving ${dirA} to floor ${targetFloor - 1}`);
        //updateSevenDigitDisplay(elevatorA, distance, duration, dirA, currentFloorA);
        break;
      }
      case elevatorB: {
        ismovingB = true;
        dirB = 'up';
        targetTranslateY = ((numOfFloors - currentFloor) * floorHeight) - (distance * floorHeight);
        console.log(`Elevator B moving ${dirB}  to floor ${targetFloor - 1}`);
        break;
      }
      default: {
        break;
      }
    }
  } else {
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
      default: {
        break;
      }
    }
  }
  elevator.style.transition = `transform ${duration / 1000}s ease-in-out`;
  elevator.style.transform = `translateY(${targetTranslateY}px)`;
  switch (elevator) {
    case elevatorA: {
      updateSevenDigitDisplay(elevatorA, distance, duration, dirA, currentFloorA);
      break;
    }
    case elevatorB: {
      updateSevenDigitDisplay(elevatorB, distance, duration, dirB, currentFloorB);
      break;
    }
  }
}

function updateSevenDigitDisplay(elevator, distance, duration, dir, currentFloor) {
  let timeout = null;
  let numberToBeDisplayed = currentFloor - 1;
  console.log("Curr: ", numberToBeDisplayed);
  for (let i = 1; i <= distance; i++) {
    timeout = duration / i + distance * i;
    setTimeout(() => {
      if (dir == 'up') {
        numberToBeDisplayed += 1;
      }
      else {
        numberToBeDisplayed -= 1;
      }
      console.log("Curr: ", numberToBeDisplayed);
      switch (elevator) {
        case elevatorA:
          {
            segmentDisplayA.style.backgroundImage = `url("images/display/${numberToBeDisplayed.toString()}.png")`;
            break;
          }
        case elevatorB:
          {
            segmentDisplayB.style.backgroundImage = `url("images/display/${numberToBeDisplayed.toString()}.png")`;
            break;
          }
      }
    }, timeout);
  }
}

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
  });
}

function handleLiftButtonEvent(elevator, targetButton) {
  switch (elevator) {
    case (elevatorA): {
      const destination = parseInt(targetButton.innerText) + 1;
      console.log(`Controls lift - A: ${destination - 1} was selected`);
      const distanceA = Math.abs(destination - currentFloorA);
      if (distanceA === 0) {
        alert('Lift A is already one the selected floor');
        break;
      } else {
        targetButton.style.borderColor = 'green';
        const duration = distanceA * 1000;
        moveElevator(elevatorA, currentFloorA, destination, duration, distanceA, liftButtonsA);
        currentFloorA = destination;
        setTimeout(() => {
          console.log(`Elevator A reached destination floor ${destination - 1} `);
          ismovingA = false;
          updateElevatorStatus();
          targetButton.style.borderColor = '';
        }, duration);
        break;
      }
    }
    case (elevatorB): {
      const destination = parseInt(targetButton.innerText) + 1;
      console.log(`Controls lift - B: ${destination - 1} was selected`);
      const distanceB = Math.abs(destination - currentFloorB);
      if (distanceB === 0) {
        alert('Lift B is already one the selected floor');
        break;
      } else {
        targetButton.style.borderColor = 'green';
        const duration = distanceB * 1000;
        moveElevator(elevatorB, currentFloorB, destination, duration, distanceB, liftButtonsB);
        currentFloorB = destination;
        setTimeout(() => {
          console.log(`Elevator B reached destination floor ${currentFloorB - 1} `);
          ismovingB = false;
          updateElevatorStatus();
          targetButton.style.borderColor = '';
        }, duration);
        break;
      }
    }
    default: {
      break;
    }
  }
}

function moveElevatorA(distance, targetFloor, button) {
  const duration = distance * 1000;
  moveElevator(elevatorA, currentFloorA, targetFloor, duration, distance);
  currentFloorA = targetFloor;
  setTimeout(() => {
    console.log(`Elevator A reached floor ${targetFloor - 1} `);
    ismovingA = false;
    updateElevatorStatus();
    button.style.borderColor = '';
  }, duration);
}

function moveElevatorB(distance, targetFloor, button) {
  const duration = distance * 1000;
  moveElevator(elevatorB, currentFloorB, targetFloor, duration, distance);
  currentFloorB = targetFloor;
  setTimeout(() => {
    console.log(`Elevator B reached floor ${targetFloor - 1} `);
    ismovingB = false;
    updateElevatorStatus();
    button.style.borderColor = '';
  }, duration);
}

function handleCallButtonEvent(button, index) {
  const targetFloor = numOfFloors - index;
  const distanceA = Math.abs(targetFloor - currentFloorA);
  const distanceB = Math.abs(targetFloor - currentFloorB);

  if (distanceA === 0 || distanceB === 0) {
    alert(`There is already one elevator on floor ${targetFloor - 1} `);
  } else {
    button.style.borderColor = 'green';
    if (currentFloorA <= currentFloorB) { // case elevatorA is on lower level than elevatorB
      if (distanceA <= distanceB) {
        moveElevatorA(distanceA, targetFloor, button);
      } else {
        moveElevatorB(distanceB, targetFloor, button);
      }
    } else if (currentFloorA > currentFloorB) {  // case elevatorA is on higher floor than elevatorB
      if (distanceA < distanceB) {
        moveElevatorA(distanceA, targetFloor, button);
      } else {
        moveElevatorB(distanceB, targetFloor, button);
      }
    }
  }
}

window.onload = () => {
  updateElevatorStatus();

  let segmentss = new Array();
  segmentDisplayA.querySelectorAll('.segment-circle').forEach((segment) => {
    segmentss.push(segment);
  })
  liftButtonsA.addEventListener('click', (event) => {
    const targetButton = event.target;
    handleLiftButtonEvent(elevatorA, targetButton);
    updateElevatorStatus();
  });

  liftButtonsB.addEventListener('click', (event) => {
    const targetButton = event.target;
    handleLiftButtonEvent(elevatorB, targetButton);
    updateElevatorStatus();
  });

  upButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      handleCallButtonEvent(button, index);
      updateElevatorStatus();
    });
  });

  downButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      handleCallButtonEvent(button, index);
      updateElevatorStatus();
    });
  });
};
