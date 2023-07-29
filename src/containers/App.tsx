import './App.css';

import { Data } from 'react-firebase-hooks/firestore/dist/firestore/types';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState } from 'react';

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
		<div className='App'>
			<header>
				<h1>⚛️🔥💬</h1>
				<SignOut />
			</header>

			<section>{user ? <ChatRoom /> : <SignIn />}</section>
		</div>
	);
}

function SignIn() {
	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	return (
		<div className='sign-in-container'>
			<button className='sign-in' onClick={signInWithGoogle}>
				Sign in with Google
			</button>
			<p>
				Do not violate the community guidelines or you will be banned for life!
			</p>
		</div>
	);
}

function SignOut() {
	return (
		auth.currentUser && (
			<button className='sign-out' onClick={() => auth.signOut()}>
				Sign Out
			</button>
		)
	);
}

function ChatRoom() {
	const dummy = useRef<HTMLInputElement>(null);
	const messagesRef = firestore.collection('messages');
	const query = messagesRef.orderBy('createdAt', "desc").limit(25);

	const [messages] = useCollectionData(query, { idField: 'id' });
	messages?.reverse();

	const [formValue, setFormValue] = useState('');

	const sendMessage = async (e: React.FormEvent) => {
	e.preventDefault();

		const { uid, photoURL } = auth.currentUser!;

		await messagesRef.add({
			text: formValue,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid,
			photoURL,
		});
		setFormValue('');
		dummy.current!.scrollIntoView();

	};

	return (<>
		<main>
	
		  {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
	
		  <span ref={dummy}></span>
	
		</main>
	
		<form onSubmit={sendMessage}>
	
		  <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />
	
		  <button type="submit" disabled={!formValue}>🕊️</button>
	
		</form>
	  </>)
}

function ChatMessage(props: {
	message: Data<firebase.firestore.DocumentData, '', ''>;
}) {
	const { text, uid, photoURL } = props.message;
	const messageClass = uid === auth.currentUser?.uid ? 'sent' : 'received';

	return (
		<>
			<div className={`message ${messageClass}`}>
				<img
					src={
						photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'
					}
				/>
				<p>{text}</p>
			</div>
		</>
	);
}
export default App;
