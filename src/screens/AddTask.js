import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput, Platform } from 'react-native';
import commonStyles from '../commonStyle';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment';

const initialState = { desc: '', date: new Date(), showDatePicker: false }

export default class AddTask extends React.Component {

    state = {
        ...initialState
    } 

    save = () => {
        const data = { ...this.state }
        this.props.onSave(data)
        this.setState({ ...initialState })
    }

    getDateTimePicker = () => {
        let datePicker = <DateTimePicker value={this.state.date}
            onChange={(_, date) => this.setState({ date, showDatePicker: false })}
            mode='date' />

        const dateString = moment(this.state.date).format('ddd, D [de] MMM [de] YYYY')

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity onPress={() => this.setState({ showDatePicker: true })}>
                        <Text style={styles.date}>
                            {dateString}
                        </Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            )
        }

        return datePicker;
    }

    render() {
        return (
            <Modal onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='slide'>

                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input}
                        placeholder="Informe a descrição ..."
                        onChangeText={desc => this.setState({ desc })}
                        value={this.state.desc} />
                    {this.getDateTimePicker()}
                    <View style={styles.buttons}>

                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback
                    onPress={this.props.onCancel}>
                    <View style={styles.background}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    container: {
        //flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        width: '90%',
        marginTop: 10,
        height: 40,
        marginLeft: 15,
        backgroundColor: '#FFF',
        borderColor: '#E3E3E3',
        borderRadius: 6
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today
    },
    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        marginLeft: 15,
    }
})
