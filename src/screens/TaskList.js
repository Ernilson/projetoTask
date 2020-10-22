import React, { Component } from 'react';
import { View, Text, ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import commonStyles from '../commonStyle';
import todayImage from '../../assets/imgs/today.jpg';
import moment from 'moment';
import 'moment/locale/pt-br';
import Task from '../components/Task';
import AddTask from './AddTask';

import AsyncStorage from "@react-native-community/async-storage"

import Icon from 'react-native-vector-icons/FontAwesome'

const initialState = {
  showDoneTasks: true,
  showAddTask: false,
  visibleTasks: [],
  tasks: []

}

export default class TaskList extends Component {

  state = {
      ...initialState
  }

  addTask = newTask => {
    if (!newTask.desc) {
      Alert.alert('Dados invalidos', 'Descrição não informada!!!')
      return
    }
    const tasks = [...this.state.tasks]
    tasks.push({
      id: Math.random(),
      desc: newTask.desc,
      estimateAt: newTask.date,
      doneAt: newTask.date,
      doneAt: null
    })
    this.setState({ tasks, showAddTask: false }, this.filterTasks)
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id)
    this.setState({ tasks }, this.filterTasks)
  }

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState')
    const state = JSON.parse(stateString) || initialState
    this.setState(state, this.filterTasks)
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    } else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }
    this.setState({ visibleTasks })
    AsyncStorage.setItem('tasksState', JSON.stringify(this.state))
  }


  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date()
      }
    })
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMM')
    return (
      <View style={styles.container} >
        <AddTask isVisible={this.state.showAddTask}
          onCancel={() => this.setState({ showAddTask: false })}
          onSave={this.addTask} />
        <ImageBackground source={todayImage}
          style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={60} color={commonStyles.colors.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Glória a Deus!!!</Text>
            <Text style={styles.subtitle}>Hoje</Text>
            <Text style={styles.subtitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.TaskList}>
          <FlatList data={this.state.visibleTasks}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <Task {...item} onToggleTask={this.toggleTask}
              onDelete={this.deleteTask} />} />
        </View>
        <TouchableOpacity style={styles.AddButton} activeOpacity={0.7}
          onPress={() => this.setState({ showAddTask: true })}>
          <Icon name="plus" size={20}
            color={commonStyles.colors.secondary} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 3
  },
  TaskList: {
    flex: 7
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 30,
    marginLeft: 20,
    marginBottom: 20
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'center',
    marginTop: Platform.OS === 'ios' ? 40 : 100
  },
  AddButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: commonStyles.colors.today,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
