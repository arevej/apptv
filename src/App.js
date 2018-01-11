import React, { Component } from 'react';

import Calc from './Calc';
import Reminders from './Reminders';


import './App.css';


function GridItem({title, icon, isActive, onHover, onClick}) {
  return (
    <div className={'item ' + (isActive ? 'active' : '')} onMouseMove={onHover} onClick={onClick}>
      <div className='icon' style={{backgroundImage: `url(" ${icon} ")`}}/>
      <h3>{title}</h3>
    </div>
  )
}

const NA = () => <div>XXX</div>;

class App extends Component {
  state = {
    items: [
      {title: 'Jaguar', component: <NA />, icon: 'https://listverse.com/wp-content/uploads/2012/11/jaguar-mouth.jpg'},
      {title: 'Koala', component: <NA />, icon: 'https://media.nationalgeographic.org/assets/photos/000/337/33744_r400x300.jpg?25dbc0b6d882f0283b7ce5960f7057c3b8513ab8'},
      {title: 'Lion', component: <NA />, icon: 'https://imgc.allpostersimages.com/img/print/karine-aigner-full-frame-close-up-portrait-of-a-male-white-lion-with-blue-eyes-south-africa_u-L-Q11019F0.jpg?src=gp'},
      {title: 'Hedgehog', component: <NA />, icon: 'http://hedgehoghannah.com/wp-content/uploads/2015/02/hedgehog3-800x600-400x300.jpg'},
      {title: 'Wolforator', component: <Calc />, icon: 'https://static.howstuffworks.com/gif/grey-wolf-pups.jpg'},
      {title: 'Puppy', component: <NA />, icon: 'http://img.timesnownews.com/story/1511485704-puppy.JPG?d=400x300'},
      {title: 'Squirrel', component: <NA />, icon: 'https://i.pinimg.com/originals/81/d9/ed/81d9ed4192f789db752c0a9ee7430dd9.jpg'},
      {title: 'Catymiders', component: <Reminders />, icon: 'https://scottoline.com/wp-content/uploads/photo-gallery/animal3.jpg'},
      {title: 'Rabbit', component: <NA />, icon: 'https://www.hpcimedia.com/images/website/ManChemNews/DIR_55/F_37485.jpg'},
      {title: 'Cow', component: <NA />, icon: 'http://www.efeedlink.com/cps/images/2017/october/2017100615251759975105.gif'},
      {title: 'Gazelle', component: <NA />, icon: 'https://frankvanlangevelde.files.wordpress.com/2014/01/img_9723-e1487795906325.jpg?w=400'},
    ],
    activeItemIndex: 0,
    activeScreen: 'homescreen',
  };

  // componentDidMount вызывается 1 раз когда компонент начинает показываться
  componentDidMount() {
    window.addEventListener('keydown', evt => {
      if (this.state.activeScreen === 'homescreen') {
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
        } else if (evt.keyCode === 13) { //enter
          this.setState({ activeScreen: this.state.items[activeItemIndex].title})
        }
      } else {
        if (evt.keyCode === 27) { //esc
          evt.preventDefault();
          this.setState({ activeScreen: 'homescreen' });
        }
      }
    });
  }

  closeApplicaton = () => {
    this.setState({ activeScreen: 'homescreen' })
  }

  handleHover = (idx) => {
    this.setState({ activeItemIndex: idx });
  };

  handleClick = (title) => () => {
    this.setState({ activeScreen: title })
  }

  render() {
    return (
      <div className='container'>
        {this.state.activeScreen === 'homescreen' ? (
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
        ) : (
          <div>
            <div className='header' onClick={this.closeApplicaton}>
              <h3 className='title'>{this.state.activeScreen}</h3>
              <span className='close-button'>×</span>
            </div>
            <div>
              {this.state.items.find(item => item.title === this.state.activeScreen).component}
            </div>
          </div>
        )
      }
    </div>
    );
  }
}

export default App;
