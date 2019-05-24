import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: 'red'};
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render () {
    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg"/>
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg"/>
        </a-assets>

        <Entity primitive="a-entity" position="0 -1.6 2">
            <Entity primitive="a-camera">
                <Entity primitive="a-cursor"></Entity>
            </Entity>
        </Entity>

        <Entity primitive="a-entity" position="3 2 -2" id="winner" text="value:no one has won yet; color:black" height="1.5" width="4" scale="10 10 10"></Entity>
        {/* Top Row */ }
        <Entity primitive="a-box" color="tomato" position="-1 1 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('0,0')" id="0,0">
           <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>
        <Entity primitive="a-box" color="tomato" position="0 1 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('0,1')" id="0,1">
             <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>
        <Entity primitive="a-box" color="tomato" position="1 1 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('0,2')" id="0,2">
             <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>
        {/* Middle Row */ }
        <Entity primitive="a-box" color="tomato" position="-1 0 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('1,0')" id="1,0">
             <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>
        <Entity primitive="a-box" color="tomato" position="0 0 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('1,1')" id="1,1">
             <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>
        <Entity primitive="a-box" color="tomato" position="1 0 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('1,2')" id="1,2">
             <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>
        {/* Bottom Row */ }
        <Entity primitive="a-box" color="tomato" position="-1 -1 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('2,0')" id="2,0">
             <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>
        <Entity primitive="a-box" color="tomato" position="0 -1 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('2,1')" id="2,1">
             <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>
        <Entity primitive="a-box" color="tomato" position="1 -1 -2" height="0.5" width="0.5" depth="0.5" onclick="clicked('2,2')" id="2,2">
             <Entity primitive="a-animation" attribute="rotation" to="360 0 0" dur="1000" begin="click"></Entity>
        </Entity>

        <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>
        <Entity primitive="a-light" type="ambient" color="#445451"/>
        <Entity primitive="a-light" type="point" intensity="2" position="2 4 4"/>
        <Entity primitive="a-sky" height="2048" radius="30" src="#skyTexture" theta-length="90" width="2048"/>
        <Entity particle-system={{preset: 'snow', particleCount: 1000}}/>
        <Entity text={{value: 'VR Tic Tac Toe!', align: 'center'}} position={{x: 0, y: 2, z: -1}}/>

{ /*
        <Entity id="box"
          geometry={{primitive: 'box'}}
          material={{color: this.state.color, opacity: 0.6}}
          animation__rotate={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          position={{x: 0, y: 1, z: -3}}
          events={{click: this.changeColor.bind(this)}}>
          <Entity animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
                  geometry={{primitive: 'box', depth: 0.2, height: 0.2, width: 0.2}}
                  material={{color: '#24CAFF'}}/>
        </Entity>
*/ }

      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
