(this.webpackJsonpliving_cell=this.webpackJsonpliving_cell||[]).push([[0],{15:function(t,e,i){},16:function(t,e,i){"use strict";i.r(e);var a=i(0),s=i(1),n=i.n(s),r=i(4),c=i.n(r),l=(i(15),i(7)),h=i(5),o=i(6),d=i(9),u=i(8),g=(i(3),i.p+"static/media/background.fbb7999e.jpg"),v=function(t){Object(d.a)(i,t);var e=Object(u.a)(i);function i(t){var a;return Object(h.a)(this,i),(a=e.call(this,t)).start=function(){a.setState({timerId:setInterval((function(){a.setState({field:a.getNewField()});var t=a.exportToConsole();a.compareState(t)}),1e3)})},a.pause=function(){clearTimeout(a.state.timerId)},a.getLiveNeighbours=function(t,e){return[[t-1,e],[t+1,e],[t,e-1],[t,e+1],[t-1,e-1],[t+1,e-1],[t-1,e+1],[t+1,e+1]].filter((function(t){var e,i,s=Object(l.a)(t,2),n=s[0],r=s[1];return 1===(null===(e=a.state.field)||void 0===e||null===(i=e[r])||void 0===i?void 0:i[n])}))},a.exportToConsole=function(){for(var t="",e=0;e<a.state.height;e++)for(var i=0;i<a.state.width;i++)0===i&&(t+="|"),1===a.state.field[e][i]?t+="x|":t+="-|",i===a.state.width-1&&(t+="\n");return console.log(t),console.log("=".repeat(2*a.state.width+1)),t},a.compareState=function(t){t===a.state.strState?(a.setState({gameOver:!0}),clearTimeout(a.state.timerId)):a.setState({strState:t})},a.init=function(){var t=a.getLivingCells();a.renderField(t),a.setState({initial:!0})},a.renderField=function(t){for(var e=[],i=0,s=0;s<a.state.height;s++){e[s]=[];for(var n=0;n<a.state.width;n++)t.includes(i)?e[s].push(1):e[s].push(0),i++}a.setState({field:e})},a.getLivingCells=function(){for(var t=new Set,e=a.state.width*a.state.height*a.state.percentLivingCell/100;t.size<e;){var i=Math.floor(Math.random()*a.state.width*a.state.height+1);t.add(i)}return a.setState({livingCells:Array.from(t)}),Array.from(t)},a.setHeight=function(t){a.setState({height:t.target.value})},a.setWidth=function(t){a.setState({width:t.target.value})},a.setAmount=function(t){a.setState({percentLivingCell:parseInt(t.target.value)})},a.state={width:"",height:"",percentLivingCell:"",timerId:void 0,initial:!1,field:[],gameOver:!1,strState:""},a}return Object(o.a)(i,[{key:"getNewField",value:function(){for(var t=[],e=0;e<this.state.height;e++){t[e]=[];for(var i=0;i<this.state.width;i++){var a=this.getLiveNeighbours(i,e);1===this.state.field[e][i]&&(2===a.length||3===a.length)||0===this.state.field[e][i]&&3===a.length?t[e].push(1):t[e].push(0)}}return t}},{key:"render",value:function(){return Object(a.jsx)("div",{style:{backgroundImage:"url(".concat(g,")")},className:"back",children:Object(a.jsxs)("div",{className:"field-wrap",children:[Object(a.jsx)("h1",{children:"Game of Life"}),Object(a.jsx)("h3",{children:"test task"}),this.state.initial?Object(a.jsxs)(a.Fragment,{children:[Object(a.jsxs)("div",{className:"buttons-wrap",children:[Object(a.jsx)("button",{onClick:this.start,children:"Start"}),Object(a.jsx)("button",{onClick:this.pause,children:"Pause"})]}),Object(a.jsx)("div",{className:"field",style:{width:"".concat(40*this.state.width,"px"),height:"".concat(40*this.state.height,"px")},children:this.state.field.flat(1).map((function(t,e){return Object(a.jsx)("div",{className:1===t?"alive":"dead","data-num":t},e)}))})]}):Object(a.jsxs)("div",{className:"init-size-field",children:[Object(a.jsx)("span",{children:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0440\u0430\u0437\u043c\u0435\u0440 \u0448\u0438\u0440\u0438\u043d\u044b \u043f\u043e\u043b\u044f"}),Object(a.jsx)("input",{onChange:this.setWidth,value:this.state.width}),Object(a.jsx)("span",{children:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0440\u0430\u0437\u043c\u0435\u0440 \u0432\u044b\u0441\u043e\u0442\u044b \u043f\u043e\u043b\u044f"}),Object(a.jsx)("input",{onChange:this.setHeight,value:this.state.height}),Object(a.jsx)("span",{children:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043a\u043e\u043b\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0436\u0438\u0432\u044b\u0445 \u043a\u043b\u0435\u0442\u043e\u043a(%)"}),Object(a.jsx)("input",{onChange:this.setAmount,value:this.state.amountLivingCell}),Object(a.jsx)("button",{onClick:this.init,children:"OK"})]}),this.state.gameOver&&Object(a.jsx)("span",{className:"game-over",children:"The End!"})]})})}}]),i}(s.Component);c.a.render(Object(a.jsx)(n.a.StrictMode,{children:Object(a.jsx)(v,{})}),document.getElementById("root"))},3:function(t,e,i){}},[[16,1,2]]]);
//# sourceMappingURL=main.eeaae266.chunk.js.map