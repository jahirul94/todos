import axios from 'axios';
import { FETCH_TODOS, CREATE_TODO, TOGGLE_TODO } from './types';

export const fetchTodos = () => {
	return {
		type: FETCH_TODOS,
	};
};

export const createTodo = ( title ) => {
	return {
		type: CREATE_TODO,
		title,
	};
};

export const toggleTodo = ( todo ) => {
	return {
		type: TOGGLE_TODO,
		todo,
	};
};

export default {
	FETCH_TODOS() {
		return window
			.fetch( 'https://jsonplaceholder.typicode.com/todos?_limit=30' )
			.then( ( res ) => {
				if ( res.ok ) {
					return res.json();
				}
				throw new Error( 'Could not fetch todos' );
			} );
	},
	CREATE_TODO( { title } ) {
		const data = {
			title,
			completed: false,
			userId: `u-${ new Date().getDate() }-${ Math.floor(
				Math.random().toFixed( 10 ) * 99999999
			) }`,
		};
		return axios.post( 'https://jsonplaceholder.typicode.com/todos', {
			data,
		} );
	},
	TOGGLE_TODO( { todo } ) {
		return axios.patch(
			`https://jsonplaceholder.typicode.com/todos/${ todo.id }`,
			{
				completed: ! todo.completed,
			}
		);
	},
};
