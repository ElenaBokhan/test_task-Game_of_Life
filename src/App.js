import './App.css';
import React, { Component } from 'react';
import backUrl from './background.jpg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			width: "",
			height: "",
			percentLivingCell: "",			
			timerId: undefined,
			initial: false,
			field: [],
			gameOver: false,
			strState:""
		}
	}
	
	start = () => {
		this.setState({
			timerId: setInterval(() => {				
				this.setState({ field: this.getNewField() });
				const str = this.exportToConsole();
				this.compareState(str);
			}, 1000)
		})
	}
	pause = () => {
		clearTimeout(this.state.timerId);
	}
	getNewField() {
		const currentField = [];
		for(let i=0; i<this.state.height; i++){	
			currentField[i]=[];		
			for(let j=0; j<this.state.width; j++){
				const neighbors = this.getLiveNeighbours(j,i);

				if ((this.state.field[i][j] === 1 && (neighbors.length === 2 || neighbors.length === 3)) || 
					(this.state.field[i][j] === 0 && neighbors.length === 3)) {
						currentField[i].push(1);
				} else  currentField[i].push(0);
			}
		}		
		return 	currentField;
	}
	getLiveNeighbours = (x, y) => {	
		const possibleNeighbors = [[x-1,y],[x+1,y],
								 [x,y-1],[x,y+1],
								 [x-1,y-1],[x+1,y-1],
								 [x-1,y+1],[x+1,y+1]];
	 	const liveNeighbors = possibleNeighbors.filter( ([col, row]) => this.state.field?.[row]?.[col] === 1);
	 	return liveNeighbors;		
	}
	exportToConsole = () => {
		let str = "";
		for(let i=0; i<this.state.height;i++){
			for(let j=0; j<this.state.width;j++){
				if (j===0) str+="|";
				this.state.field[i][j] === 1 ? str+="x|" : str+="-|";
				if (j===this.state.width-1) str+="\n";
			}
		}
		console.log(str);
		console.log("=".repeat(this.state.width*2+1));
		return str;
		
	}
	compareState = (str) => {
		if(str === this.state.strState) {
			this.setState({ gameOver: true })
			clearTimeout(this.state.timerId);
		} else {
			this.setState({ strState: str })
		}
	}
	init = () => {		
		const cells = this.getLivingCells();
		this.renderField(cells);
		this.setState({ initial: true });	
	}
	renderField = (cells) => {
		const field = [];
		let count = 0;

		for(let i=0; i<this.state.height; i++){
			field[i]=[];
			for(let j=0; j<this.state.width; j++){
				cells.includes(count) ? field[i].push(1) : field[i].push(0);
				count++;
			}
		}
		this.setState({ field: field});
	};	
	getLivingCells = () => {
		const arr = new Set();
		const amountLivingCell = this.state.width*this.state.height*this.state.percentLivingCell/100;
		while (arr.size < amountLivingCell) {
			let number = Math.floor(Math.random() * this.state.width*this.state.height + 1);
			arr.add(number);
		}
		this.setState({ livingCells: Array.from(arr) });
		return Array.from(arr);
	}
	setHeight = (e) => {
		this.setState({ height: e.target.value });	
	}
	setWidth = (e) => {
		this.setState({ width: e.target.value });	
	}
	setAmount = (e) => {		
		this.setState({ percentLivingCell: parseInt(e.target.value) });	
	}
	render() {
		return  <div style={{ backgroundImage: `url(${backUrl})` }} className="back">
					<div className="field-wrap">
						<h1>Game of Life</h1>
						<h3>test task</h3>
						{!this.state.initial 
						? <div className="init-size-field">
								<span>Введите размер ширины поля</span>
								<input onChange = {this.setWidth} 
									   value = {this.state.width}/>
								<span>Введите размер высоты поля</span>
								<input onChange = {this.setHeight} 
								 	   value = {this.state.height}/>
								<span>Введите колличество живых клеток(%)</span>
								<input onChange = {this.setAmount} 
									   value = {this.state.amountLivingCell}/>
								<button onClick = {this.init}>OK</button>
							</div>
						: <>
							<div className="buttons-wrap">
								<button onClick = {this.start}>Start</button>
								<button onClick = {this.pause}>Pause</button>
							</div>
							<div className="field" 
								 style={{ width: `${this.state.width * 40}px`, 
										height: `${this.state.height * 40}px` }}>
								{this.state.field.flat(1).map((item, index) => {
									return <div className={item===1 ? "alive" : "dead"}
												data-num={item}
												key={index}>
										   </div>
								})}
							</div>
						  </>
						}
						{this.state.gameOver && <span className = {"game-over"}>The End!</span>}
					</div>					
				</div>		
	}
}

export default App;
