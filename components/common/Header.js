import React from 'react';
import firebase from 'firebase';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Button } from './index';


const Header = (props) => {
	const { textStyle, viewStyle, btnStyle } = styles;

	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
			<TouchableOpacity onPress={() => firebase.auth().signOut()} style={{display: props.isLogIn ? 'flex' : 'none'}}>
				<Icon name="sign-out" size={25} />
    		</TouchableOpacity>
		</View>
	);
};

const styles = {
	viewStyle: {
		flexDirection: 'row',
		backgroundColor: 'rgb(0, 188, 212)',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	},
	textStyle: {
		textAlign: 'center',
		fontSize: 20,
		flex: 1
	}
};

export { Header };
