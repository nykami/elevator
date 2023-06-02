const openElevatorDoor = new Image();
const closedElevatorDoor = new Image();
openElevatorDoor.src = 'images/openElevatorDoor.png';
closedElevatorDoor.src = 'images/closedElevatorDoor.png';
const elevatorWidth = 40;
const elevatorHeight = 15;
const paddingHorizontal = 40;
const paddingBottom = 0.5;
const paddingTop = 6;

let xA = paddingHorizontal;
let yB = paddingTop;

const upButtons = Array.from(document.getElementsByClassName('up-button'));
const downButtons = Array.from(document.getElementsByClassName('down-button'));
const allButtons = upButtons.concat(downButtons);
const floorButtons = Array.from(document.getElementsByClassName('lift-floor-button'));

window.onload = () => {
  allButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.borderColor = 'green';
    })
  });
  floorButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.borderColor = 'green';
    })
  });
};


