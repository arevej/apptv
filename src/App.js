import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


function GridItem({title, icon, isActive, onHover, onClick}) {
  return (
    <div className={'item ' + (isActive ? 'active' : '')} onMouseMove={onHover} onClick={onClick}>
      <div className='icon' style={{backgroundImage: `url(" ${icon} ")`}}/>
      <h3>{title}</h3>
    </div>
  )
}


class App extends Component {
  state = {
    items: [
      {title: 'Jaguar', icon: 'https://listverse.com/wp-content/uploads/2012/11/jaguar-mouth.jpg'},
      {title: 'Koala', icon: 'https://media.nationalgeographic.org/assets/photos/000/337/33744_r400x300.jpg?25dbc0b6d882f0283b7ce5960f7057c3b8513ab8'},
      {title: 'Lion', icon: 'https://imgc.allpostersimages.com/img/print/karine-aigner-full-frame-close-up-portrait-of-a-male-white-lion-with-blue-eyes-south-africa_u-L-Q11019F0.jpg?src=gp'},
      {title: 'Hedgehog', icon: 'http://hedgehoghannah.com/wp-content/uploads/2015/02/hedgehog3-800x600-400x300.jpg'},
      {title: 'Wolforator', icon: 'https://static.howstuffworks.com/gif/grey-wolf-pups.jpg'},
      {title: 'Puppy', icon: 'http://img.timesnownews.com/story/1511485704-puppy.JPG?d=400x300'},
      {title: 'Squirrel', icon: 'https://i.pinimg.com/originals/81/d9/ed/81d9ed4192f789db752c0a9ee7430dd9.jpg'},
      {title: 'Catymiders', icon: 'https://scottoline.com/wp-content/uploads/photo-gallery/animal3.jpg'},
      {title: 'Rabbit', icon: 'https://www.hpcimedia.com/images/website/ManChemNews/DIR_55/F_37485.jpg'},
      {title: 'Cow', icon: 'http://www.efeedlink.com/cps/images/2017/october/2017100615251759975105.gif'},
      {title: 'Gazelle', icon: 'https://frankvanlangevelde.files.wordpress.com/2014/01/img_9723-e1487795906325.jpg?w=400'},
    ],
    activeItemIndex: 0,
    activeScreen: 'homescreen',
  };

  // componentDidMount вызывается 1 раз когда компонент начинает показываться
  componentDidMount() {
    window.addEventListener('keydown', evt => {
      evt.preventDefault(); // отменить станжартное поведение, например чтобы стрелочки не листали саму страницу

      const { activeItemIndex, activeScreen } = this.state;

      const bound = (num) => Math.min(Math.max(num, 0), this.state.items.length - 1);

      if (evt.keyCode === 87 || evt.keyCode === 38 ) { //w
        this.setState({ activeItemIndex: bound(activeItemIndex - 4) });
      } else if (evt.keyCode === 83 || evt.keyCode === 40 ) { //s
        this.setState({ activeItemIndex: bound(activeItemIndex + 4) });
      } else if (evt.keyCode === 65 || evt.keyCode === 37 ) { //a
        this.setState({ activeItemIndex: bound(activeItemIndex - 1) });
      } else if (evt.keyCode === 68 || evt.keyCode === 39 ) { //d
        this.setState({ activeItemIndex: bound(activeItemIndex + 1) });
      } else if (evt.keyCode === 27) { //esc
        this.setState({ activeScreen: 'homescreen' })
      } else if (evt.keyCode === 13) { //enter
        this.setState({ activeScreen: this.state.items[activeItemIndex].title})
      }
    });
  }

  handleHover = (idx) => {
    this.setState({ activeItemIndex: idx });
  };

  handleClick = (title) => () => {
    this.setState({ activeScreen: title })
    console.log(title)
  }

  render() {
    return (
      <div className='container'>
        {this.state.activeScreen === 'homescreen' ?
        <div className='grid'>
          {this.state.items.map((item, index) => (
            <GridItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              isActive={this.state.activeItemIndex === index ? true : false}
              onHover={() => this.handleHover(index)}
              onClick={this.handleClick(item.title)}
            />
          ))}
        </div>
        :
        <div>
          <h3>{this.state.activeScreen}</h3>
        </div>
      }
    </div>
    );
  }
}

export default App;
