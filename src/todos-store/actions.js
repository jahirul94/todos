import { ADD_TODO, POPULATE_TODOS, UPDATE_TODO } from './types';
import { createTodo, toggleTodo as toggleTodoControl } from './controls';

export function* addTodo( title ) {
	const todo = yield createTodo( title );

	return {
		type: ADD_TODO,
		todo: todo.data.data,
	};
}

export function* toggleTodo( todo, index ) {
	try {
		yield updateTodo( { ...todo, loading: true }, index );
		const updatedTodo = yield toggleTodoControl( todo );
		return updateTodo( updatedTodo.data, index );
	} catch ( error ) {
		console.log( error.message );
	}
}

export const updateTodo = ( todo, index ) => {
	return {
		type: UPDATE_TODO,
		index,
		todo,
	};
};

export const populateTodos = ( todos ) => {
	return {
		type: POPULATE_TODOS,
		todos,
	};
};
