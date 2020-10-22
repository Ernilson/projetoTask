import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import TaskList from './src/screens/TaskList';


const AppNavigator = createSwitchNavigator({
  TaskList: TaskList,
  
},
{
  initialRouteName: 'TaskList'
}
)

export default createAppContainer(AppNavigator);