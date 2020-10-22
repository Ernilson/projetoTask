import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import commonStyle from '../commonStyle';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import moment from 'moment';
import 'moment/locale/pt-br';

export default props => {

    const doneOrNotStyle = props.doneAt != null ?
        { textDecorationLine: 'line-through' } : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt
    const formattedDate = moment(date).locale('pt-br')
        .format('ddd, D [de] MMM')

    const getRightContent = () => {
        return (
            <TouchableOpacity style={styles.right}
            onPress={()=>props.onDelete && props.onDelete(props.id)}>
                <Icon name="trash" size={30} color='#fff' />
            </TouchableOpacity>
        )
    }

    const getLeftContent = () => {
        return (
            <View style={styles.left}>
                <Icon name="trash" size={20} color='#fff'
                style={styles.excludIcon} />
                <Text style={styles.excludText}>Excluir</Text>
            </View>
        )
    }

    return (
        <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent}
        onSwipeableLeftOpen={()=> props.onDelete && props.onDelete(props.id)}>
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => props.onToggleTask(props.id)}>
                    <View style={styles.checkContainer}>
                        {getCheckView(props.doneAt)}
                    </View>
                </TouchableWithoutFeedback>
                <View>
                    <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                    <Text style={styles.date}>{formattedDate}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

function getCheckView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon name='check' size={20}
                    color='#fff'></Icon>
            </View>
        )
    } else {
        return (
            <View>
                <Text style={styles.pending}></Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
    },
    checkContainer: {
        width: '12%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 20,
        width: 20,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },
    done: {
        height: 20,
        width: 20,
        borderRadius: 18,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: commonStyle.fontFamily,
        color: commonStyle.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: commonStyle.fontFamily,
        color: commonStyle.colors.subText,
        fontSize: 12
    },
    right:{
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20
    },
    left:{
        flex:1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
    },
    excludIcon:{
      marginLeft: 10  
    },
    excludText:{
        fontFamily: commonStyle.fontFamily,
        color:  '#fff',
        fontSize: 20,
        margin: 10
    },    
})



