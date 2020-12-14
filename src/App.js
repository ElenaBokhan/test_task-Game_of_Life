import './App.css';
import React, { Component } from 'react';
import backUrl from './background.jpg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			width: 10,
			height: 10,
			countTable: 100,
			livingCells: [],
			timerId: undefined,
			// init()
		}
	}
	// componentWillMount(){
	// 	console.log("Введите размер ширины поля")
	// 	let widthT = console.ReadLine();
	// 	console.log("Введите размер высоты поля");
	// 	let heightT = console.ReadLine();
	// }
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
			if 	(this.state.livingCells.includes(el) && (aliveNeibors.length === 2 || aliveNeibors.length === 3) || (!this.state.livingCells.includes(el) && aliveNeibors.length === 3)) {
				currentAlive.push(el)
			} 
		})
		return currentAlive;
	}
	getNeighbours = cell => {
		let neightbours;
		if (cell % 10 === 9 || cell === 9) {
			return neightbours = [cell - 1, cell - 11, cell - 10, cell + 9, cell + 10]}
		else if (cell % 10 === 0) {
			return neightbours = [cell - 10, cell - 9, cell + 1, cell + 10, cell + 11]}
		else neightbours = [cell + 1, cell - 1, cell - 11, cell - 10, cell - 9, cell + 9, cell + 10, cell + 11];
		return neightbours;
	}
	exportToConsole = () => {
		let str = "";
		for(let i=0; i<this.state.width*this.state.height;i++){
			if (i===0 || i%10 === 0) str+="|";
			this.state.livingCells.includes(i) ? str+="x|" : str+="-|";
			if (i===9 || i%10 === 9) str+="\n";
		}
		console.log(str);
		console.log("=".repeat(this.state.width*2+1));
	}
	render() {
		return (<div style={{ backgroundImage: `url(${backUrl})` }} className="back">
			<div className="field-wrap">
				<h1>Game of Life</h1>
				<h3>test task</h3>
				<div className="buttons-wrap">
					<button onClick = {() => this.start()}>Start</button>
					<button onClick = {() => this.pause()}>Pause</button>
				</div>
				
				<div className="field" style={{ width: `${this.state.width * 40}px`, height: `${this.state.height * 40}px` }}>
					{[...Array(this.state.width * this.state.height).keys()].map(item => {
						return <div className={this.state.livingCells.includes(item) ? "alive" : "dead"}
							data-num={item}
							key={item}>
						</div>
					})}
				</div>
			</div>
		</div>
		);
	}
}

export default App;
