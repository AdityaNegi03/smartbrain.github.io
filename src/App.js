import React,{Component } from 'react';
import Navigation from "./Components/Navigation/Navigation.js";
import Logo from "./Components/Logo/Logo.js";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm.js";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition" ;
import Rank from "./Components/Rank/Rank.js";
import Particles from "react-tsparticles";
import './App.css';
import Clarifai from 'clarifai';
const app = new Clarifai.App({
 apiKey: '9ce7c28598fb4f559baa019cc6167632'
});
const options={
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              value_area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "square",
          },
          size: {
            random: true,
            value: 5,
          },
        },
        detectRetina: true,
}


class App extends Component{
  constructor() {
    super();
    this.state={
      input:'',
      imageUrl:'',
      box:{}
    }   }

  calculateFacePosition=(data)=>{
   const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
   const image= document.getElementById('inputImage');
   const width= Number(image.width);
   const height = Number(image.height);
   return{
    leftCol: clarifaiFace.left_col * width,
    topRow: clarifaiFace.top_row * height,
    rightCol: width-(clarifaiFace.right_col * width),
    bottomRow: height -(clarifaiFace.bottom_row*height)
   }
 }

 displayFaceBox=(box)=>{
this.setState({box:box});
}

 onInputChange=(event)=>{
this.setState({input:event.target.value});
}

onButtonSubmit=()=>{
  this.setState({imageUrl:this.state.input})
  app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a',this.state.input)
  .then(response=>{
      // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      console.log(response);
      this.displayFaceBox(this.calculateFacePosition(response))
     }).catch(err=>console.log(err)
    )
      
  }

	render()
	{
    const particlesInit = (main) => {
    console.log(main);
  }

  const particlesLoaded = (container) => {
    console.log(container);
  }
		return(
        <div className='App'>

          <Particles className='particles' 
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
 
        
          <Navigation/>
	        <Logo/>
	        <Rank/>
	        <ImageLinkForm onButtonSubmit={this.onButtonSubmit} onInputChange={this.onInputChange} />
	               <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
        </div>
			)
	}
}



export default App;