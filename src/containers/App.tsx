import './App.css';

import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';

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
	const [user] = useAuthState(auth);

	return (
		<>
			<header className='App-header'></header>

			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
	return (
		auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
	);
}

function ChatRoom() {
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt').limit(25);
	const [messages] = useCollectionData(query, { idField: 'id' });
	console.log(messages)
	return (
		<>
			<SignOut />
			<div>
				{messages &&
					messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
			</div>
			
		</>
	);
}

function ChatMessage(props: {
	message: Data<firebase.firestore.DocumentData, '', ''>;
}) {
	const { text, uid, photoURL } = props.message;
	const messageClass = uid ===auth.currentUser?.uid ? "sent" : "received";

	return (
		<div className={`message ${messageClass}`}>
			<img src={photoURL} alt="User Photo" />
			<p>{text}</p>
		</div>
	);
}
export default App;
