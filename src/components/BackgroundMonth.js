import React from 'react';
import '../images/monthlybackground/jan.jpg'
import '../images/monthlybackground/feb.png'
import '../images/monthlybackground/march.jpg'
import '../images/monthlybackground/april.jpg'
import '../images/monthlybackground/may.jpg'
import '../images/monthlybackground/june.jpg'
import '../images/monthlybackground/july.jpg'
import '../images/monthlybackground/aug.jpg'
import '../images/monthlybackground/sept.jpg'
import '../images/monthlybackground/oct.jpg'
import '../images/monthlybackground/nov.jpg'
import '../images/monthlybackground/dec.jpg'

function BackgroundMonth() {
  const currentDate = new Date();
  const month = currentDate.getMonth();

  const monthImages = {
    0: require('../images/monthlybackground/jan.jpg'),
    1: require('../images/monthlybackground/feb.png'),
    2: require('../images/monthlybackground/march.jpg'),
    3: require('../images/monthlybackground/april.jpg'),
    4: require('../images/monthlybackground/may.jpg'),
    5: require('../images/monthlybackground/june.jpg'),
    6: require('../images/monthlybackground/july.jpg'),
    7: require('../images/monthlybackground/aug.jpg'),
    8: require('../images/monthlybackground/sept.jpg'),
    9: require('../images/monthlybackground/oct.jpg'),
    10: require('../images/monthlybackground/nov.jpg'),
    11: require('../images/monthlybackground/dec.jpg'),
  };

  return monthImages[month];
}

export default BackgroundMonth;
