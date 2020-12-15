import './App.css';
import React, { Component, useState } from 'react';
import backUrl from './background.jpg';
import './App.css';


const App = () => {

	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [percentLiveCells, setPercent] = useState("");
	const [initial, setInitial] = useState(false);
	const [livingCells, setLivingCells] = useState();
	// const [timerId, setTimerId] = useState(undefined);
	// const livingCells = [];
	let timerId = null;

	const init = () => {
		const arr = new Set();
		const amountLivingCell = width*height*percentLiveCells/100;
		while (arr.size < amountLivingCell) {
			let number = Math.floor(Math.random() * width*height + 1);
			arr.add(number);
		}
		setLivingCells(Array.from(arr));
		setInitial(true);	
	}
	const addFunc = (arr) => {
		setLivingCells(arr);
	}
	const start = () => {
		 timerId = setInterval(() => {
			 let sss = liveOrDie()
			addFunc(sss)			
			exportToConsole();
		}, 1000)
	}
	const pause = () => {
		clearTimeout(timerId);
	}
	const liveOrDie = () => {
		const currentAlive = [];

		// for(let i=0; i<this.state.width; i++){
		// 	for(let j=0; j<this.state.height; j++){
			
		// 	}
		// }

		[...Array(width*height).keys()].forEach(el => {
			const neibors = getNeighbours(el);
			const aliveNeibors = neibors.filter(item =>livingCells.includes(item));

			if ((livingCells.includes(el) 
			&& (aliveNeibors.length === 2 || aliveNeibors.length === 3)) 
			|| (!livingCells.includes(el) 
			&& aliveNeibors.length === 3)) {
				currentAlive.push(el)
			} 
		})
		return currentAlive;
	}
	const getNeighbours = cell => {		
		const sizeW = +width;
		const sizeH = +height;
		const possibleNeibors = [cell + 1, cell - 1, cell - sizeW - 1, cell - sizeW,
									cell - sizeW + 1, cell + sizeW - 1, 
									cell + sizeW, cell + sizeW + 1];
		return possibleNeibors.filter(el => el>=0 && el<sizeW*sizeH)
		
		// if (cell % 10 === 9 || cell === 9) {
		// 	return neightbours = [cell - 1, cell - 11, cell - 10, cell + 9, cell + 10]}
		// else if (cell % 10 === 0) {
		// 	return neightbours = [cell - 10, cell - 9, cell + 1, cell + 10, cell + 11]}
		// else neightbours = [cell + 1, cell - 1, cell - 11, cell - 10, cell - 9, cell + 9, cell + 10, cell + 11];
		// return neightbours;
	}
	const exportToConsole = () => {
		let str = "";
		for(let i=0; i<width*height;i++){
			if (i===0 || i%width === 0) str+="|";
			livingCells.includes(i) ? str+="x|" : str+="-|";
			if (i+1===width || (i+1)%width === 0) str+="\n";
		}
		console.log(str);
		console.log("=".repeat(width*2+1));
	}
	return  <div style={{ backgroundImage: `url(${backUrl})` }} className="back">
				<div className="field-wrap">
					<h1>Game of Life</h1>
					<h3>test task</h3>
					{!initial ? <div className="init-size-field">
									<span>Введите размер ширины поля</span>
									<input onChange = {(e) => setWidth(e.target.value)} 
										   value = {width}/>
									<span>Введите размер высоты поля</span>
									<input onChange = {(e) => setHeight(e.target.value)} 
										   value = {height}/>
									<span>Введите колличество живых клеток(%)</span>
									<input onChange = {(e) => setPercent(e.target.value)} 
										   value = {percentLiveCells}/>
									<button onClick = {init}>OK</button>
								</div>
								: <>
									<div className="buttons-wrap">
										<button onClick = {() => start()}>Start</button>
										<button onClick = {() => pause()}>Pause</button>
									</div>
									<div className="field" 
										style={{ width: `${width * 40}px`, 
												height: `${height * 40}px` }}>
										{[...Array(width * height).keys()].map(item => {
											return <div className={livingCells.includes(item) ? "alive" : "dead"}
														data-num={item}
														key={item}>
												</div>
										})}
									</div>
								</>
					}
				</div>					
			</div>		
}
// class App extends Component {
// 	constructor(props) {
// 		super(props)
// 		this.state = {
// 			width: "",
// 			height: "",
// 			percentLivingCell: "",
// 			livingCells: [],
// 			timerId: undefined,
// 			initial: false
// 		}
// 	}

// 	start = () => {
// 		this.setState({
// 			timerId: setInterval(() => {
// 				this.setState({ livingCells: this.liveOrDie() });
// 				this.exportToConsole();
// 			}, 1000)
// 		})
// 	}
// 	pause = () => {
// 		clearTimeout(this.state.timerId);
// 	}
// 	liveOrDie() {
// 		const currentAlive = [];

// 		// for(let i=0; i<this.state.width; i++){
// 		// 	for(let j=0; j<this.state.height; j++){
			
// 		// 	}
// 		// }


// 		[...Array(100).keys()].forEach(el => {
// 			const neibors = this.getNeighbours(el);
// 			const aliveNeibors = neibors.filter(item => this.state.livingCells.includes(item));

// 			if ((this.state.livingCells.includes(el) 
// 			&& (aliveNeibors.length === 2 || aliveNeibors.length === 3)) 
// 			|| (!this.state.livingCells.includes(el) 
// 			&& aliveNeibors.length === 3)) {
// 				currentAlive.push(el)
// 			} 
// 		})
// 		return currentAlive;
// 	}
// 	getNeighbours = cell => {		
// 		const sizeW = +this.state.width;
// 		const sizeH = +this.state.height;
// 		const possibleNeibors = [cell + 1, cell - 1, cell - sizeW - 1, cell - sizeW,
// 								 cell - sizeW + 1, cell + sizeW - 1, 
// 								 cell + sizeW, cell + sizeW + 1];
// 		return possibleNeibors.filter(el => el>=0 && el<sizeW*sizeH)
// 		// try{

// 		// } catch(e){

// 		// } 
// 		// if (cell % 10 === 9 || cell === 9) {
// 		// 	return neightbours = [cell - 1, cell - 11, cell - 10, cell + 9, cell + 10]}
// 		// else if (cell % 10 === 0) {
// 		// 	return neightbours = [cell - 10, cell - 9, cell + 1, cell + 10, cell + 11]}
// 		// else neightbours = [cell + 1, cell - 1, cell - 11, cell - 10, cell - 9, cell + 9, cell + 10, cell + 11];
// 		// return neightbours;
// 	}
// 	exportToConsole = () => {
// 		let str = "";
// 		for(let i=0; i<this.state.width*this.state.height;i++){
// 			if (i===0 || i%this.state.width === 0) str+="|";
// 			this.state.livingCells.includes(i) ? str+="x|" : str+="-|";
// 			if (i+1===this.state.width || (i+1)%this.state.width === 0) str+="\n";
// 		}
// 		console.log(str);
// 		console.log("=".repeat(this.state.width*2+1));
// 	}
// 	init = () => {
// 		const arr = new Set();
// 		const amountLivingCell = this.state.width*this.state.height*this.state.percentLivingCell/100
// 		while (arr.size < amountLivingCell) {
// 			let number = Math.floor(Math.random() * this.state.width*this.state.height + 1);
// 			arr.add(number);
// 		}
// 		this.setState({ livingCells: Array.from(arr) });
// 		this.setState({ initial: true });	
// 	}
// 	setHeight = (e) => {
// 		this.setState({ height: e.target.value });	
// 	}
// 	setWidth = (e) => {
// 		this.setState({ width: e.target.value });	
// 	}
// 	setAmount = (e) => {
		
// 		this.setState({ percentLivingCell: parseInt(e.target.value) });	
// 	}
// 	render() {
// 		return  <div style={{ backgroundImage: `url(${backUrl})` }} className="back">
// 					<div className="field-wrap">
// 						<h1>Game of Life</h1>
// 						<h3>test task</h3>
// 						{!this.state.initial 
// 						? <div className="init-size-field">
// 								<span>Введите размер ширины поля</span>
// 								<input onChange = {(e) => this.setWidth(e)} 
// 									   value = {this.state.width}/>
// 								<span>Введите размер высоты поля</span>
// 								<input onChange = {(e) => this.setHeight(e)} 
// 								 	   value = {this.state.height}/>
// 								<span>Введите колличество живых клеток(%)</span>
// 								<input onChange = {(e) => this.setAmount(e)} 
// 									   value = {this.state.amountLivingCell}/>
// 								<button onClick = {() => this.init()}>OK</button>
// 							</div>
// 						: <>
// 							<div className="buttons-wrap">
// 								<button onClick = {() => this.start()}>Start</button>
// 								<button onClick = {() => this.pause()}>Pause</button>
// 							</div>
// 							<div className="field" 
// 								 style={{ width: `${this.state.width * 40}px`, 
// 										height: `${this.state.height * 40}px` }}>
// 								{[...Array(this.state.width * this.state.height).keys()].map(item => {
// 									return <div className={this.state.livingCells.includes(item) ? "alive" : "dead"}
// 												data-num={item}
// 												key={item}>
// 										   </div>
// 								})}
// 							</div>
// 						  </>
// 						}
// 					</div>					
// 				</div>		
// 	}
// }

export default App;
