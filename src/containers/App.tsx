import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyCABhQoF1w6kpMoRCJIJgMYMnN0N99lcdw',
	authDomain: 'react-firechat-ef4e1.firebaseapp.com',
	projectId: 'react-firechat-ef4e1',
	storageBucket: 'react-firechat-ef4e1.appspot.com',
	messagingSenderId: '585380617734',
	appId: '1:585380617734:web:2039a62c10e64c0b082d87',
	measurementId: 'G-R8SFZ4BK5K',
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
	return (
		<>
			<header className='App-header'></header>

			<section>
				
			</section>
		</>
	);
}

export default App;
