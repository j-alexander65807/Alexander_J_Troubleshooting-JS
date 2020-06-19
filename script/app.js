(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				gameBoard = document.querySelector('.puzzle-board'),
				puzzlePieces = document.querySelectorAll('.puzzle-pieces img'),
				dropZones = document.querySelectorAll('.drop-zone'),
				zonePieces = document.querySelector('.puzzle-pieces');;

	const pieceName = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	function changeImageSet() {
		//change all the image elements on the page 
		// change the image elements on the left to match the selection puzzle
		pieceName.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgkey}.jpg`;
			
		});

		// and set the drop zone background image based on the puzzle the user selects
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
		//debugger;
	}

	function allowDrag(event) {
		console.log('started dragging - ', event.target.id);
		event.dataTransfer.setData("draggedImg", this.id);
	}

	function allowDragOver(event) {
		event.preventDefault();
		console.log('dragging over me');
	}

	function allowDrop(event) {
		// BUG_1_Solution
		// if a drop zone already has 1 or more puzzle piece, this function will stop
		if (this.children.length >= 1) {
			return;
		}

		//event.preventDefault();
		console.log('dropped an image');

		// get the dragged element's ID from the data transfer
		let droppedImage = event.dataTransfer.getData("draggedImg");

		// add that image to whatever drop zone we're dropping on
		event.target.appendChild(document.querySelector(`#${droppedImage}`));
	}

	
	// add event handling here
	// what triggers do we need

	// click on the bottom buttons to change the puzzle images and reset pieces
	puzzleButtons.forEach(button => {
		button.addEventListener('click', changeImageSet);
	});

	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	// call the function and pass in the first nav button as a reference
	changeImageSet.call(puzzleButtons[0]);
})();
