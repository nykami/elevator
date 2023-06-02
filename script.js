const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
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
let yA = canvas.height - elevatorHeight ;
let xB = canvas.width - elevatorWidth - paddingHorizontal;
let yB = paddingTop;

const upButtons = Array.from(document.getElementsByClassName('up-button'));
const downButtons = Array.from(document.getElementsByClassName('down-button'));
const allButtons = upButtons.concat(downButtons);

function drawElevators() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(openElevatorDoor, xA, yA, elevatorWidth, elevatorHeight);
  context.drawImage(closedElevatorDoor, xB, yB, elevatorWidth, elevatorHeight);
}

window.onload = () => {
  drawElevators();
  //drawElevator(elevatorB, xB, yB)

  allButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.borderColor = 'green';
    })
  });
};


