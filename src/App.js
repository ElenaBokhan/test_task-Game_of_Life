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
			livingCells: [],
			timerId: undefined,
			initial: false
		}
	}
	componentDidMount() {
		const arr = new Set();
		while (arr.size < 30) {
			let number = Math.floor(Math.random() * 100 + 1);
			arr.add(number);
		}
		this.setState({ livingCells: Array.from(arr) });		
	}
	start = () => {
		this.setState({
			timerId: setInterval(() => {
				this.setState({ livingCells: this.liveOrDie() });
				this.exportToConsole();
			}, 1000)
		})
	}
	pause = () => {
		clearTimeout(this.state.timerId);
	}
	liveOrDie() {
		const currentAlive = [];
		[...Array(100).keys()].forEach(el => {
			const neibors = this.getNeighbours(el);
			const aliveNeibors = neibors.filter(item => this.state.livingCells.includes(item));

			if ((this.state.livingCells.includes(el) 
			&& (aliveNeibors.length === 2 || aliveNeibors.length === 3)) 
			|| (!this.state.livingCells.includes(el) 
			&& aliveNeibors.length === 3)) {
				currentAlive.push(el)
			} 
		})
		return currentAlive;
	}
	getNeighbours = cell => {		
		const sizeW = +this.state.width;
		const sizeH = +this.state.height;
		const possibleNeibors = [cell + 1, cell - 1, cell - sizeW - 1, cell - sizeW,
								 cell - sizeW + 1, cell + sizeW - 1, 
								 cell + sizeW, cell + sizeW + 1];
		return possibleNeibors.filter(el => el>=0 && el<sizeW*sizeH)
		// try{

		// } catch(e){

		// } 
		// if (cell % 10 === 9 || cell === 9) {
		// 	return neightbours = [cell - 1, cell - 11, cell - 10, cell + 9, cell + 10]}
		// else if (cell % 10 === 0) {
		// 	return neightbours = [cell - 10, cell - 9, cell + 1, cell + 10, cell + 11]}
		// else neightbours = [cell + 1, cell - 1, cell - 11, cell - 10, cell - 9, cell + 9, cell + 10, cell + 11];
		// return neightbours;
	}
	exportToConsole = () => {
		let str = "";
		for(let i=0; i<this.state.width*this.state.height;i++){
			if (i===0 || i%this.state.width === 0) str+="|";
			this.state.livingCells.includes(i) ? str+="x|" : str+="-|";
			if (i+1===this.state.width || (i+1)%this.state.width === 0) str+="\n";
		}
		console.log(str);
		console.log("=".repeat(this.state.width*2+1));
	}
	initSize = () => {
		this.setState({ initial: true });	
	}
	setHeight = (e) => {
		this.setState({ height: e.target.value });	
	}
	setWidth = (e) => {
		this.setState({ width: e.target.value });	
	}
	render() {
		return  <div style={{ backgroundImage: `url(${backUrl})` }} className="back">
					<div className="field-wrap">
						<h1>Game of Life</h1>
						<h3>test task</h3>
						{!this.state.initial 
						? <div className="init-size-field">
								<span>Введите размер ширины поля</span>
								<input onChange = {(e) => this.setWidth(e)} 
									   value = {this.state.width}/>
								<span>Введите размер высоты поля</span>
								<input onChange = {(e) => this.setHeight(e)} 
								 	   value = {this.state.height}/>
								<button onClick = {() => this.initSize()}>OK</button>
							</div>
						: <>
							<div className="buttons-wrap">
								<button onClick = {() => this.start()}>Start</button>
								<button onClick = {() => this.pause()}>Pause</button>
							</div>
							<div className="field" 
								 style={{ width: `${this.state.width * 40}px`, 
										height: `${this.state.height * 40}px` }}>
								{[...Array(this.state.width * this.state.height).keys()].map(item => {
									return <div className={this.state.livingCells.includes(item) ? "alive" : "dead"}
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
}

export default App;
