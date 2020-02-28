import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, Text, View, Dimensions } from 'react-native';
import api from './src/services/api'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Home!</Text>
		</View>
	);
}
  
function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Settings!</Text>
		</View>
	);
}

const Tab = createMaterialBottomTabNavigator();

export default function App() {

	const [ days, setDays ] = useState([]);

	useEffect(() => {
		async function loadMeals() {
			const response = await api.get('/list');
			setDays(response.data);
		}

		loadMeals();
	}, []);

	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Home" component={HomeScreen} />
				<Tab.Screen name="Settings" component={SettingsScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	menuContainer: {
		flex: 1,
		flexDirection: "row",
		height: 50,
		paddingTop: 30,
		backgroundColor: "#F2F2F2"
	},
	btn: {
		flex: 1,
		width: 50,
		height: 150,
		paddingTop: 15,
		alignItems: "center",
		textAlign: "center",
		backgroundColor: "#F2F2F2"
	},
	scene: {
		flex: 1,
	}
});
