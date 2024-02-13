import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { useSelect, useDispatch} from '@wordpress/data';
import { CheckboxControl, TextControl, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';

export default function Edit() {
	const [ addingTodo, setAddingTodo ] = useState( false );
	const [ newTodo, setNewTodo ] = useState( '' );
	const todos = useSelect( ( select ) => {
		const todosStore = select( 'wp-todos/todos' );
		return todosStore && todosStore.getTodos();
	}, [] );

	const actions = useDispatch( 'wp-todos/todos' );
	const addTodo = actions && actions.addTodo;
	const toggleTodo = actions && actions.toggleTodo;

	return (
		<div { ...useBlockProps() }>
			{ todos && (
				<>
					<ol>
						{ todos?.map( ( todo, index ) => (
							<li
								key={ todo.id }
								className={ todo.completed && 'todo-completed' }
							>
								<CheckboxControl
									disabled={ todo.loading }
									label={ todo.title }
									checked={ todo.completed }
									onChange={ () => {
										if ( toggleTodo ) {
											toggleTodo( todo, index );
										}
									} }
								/>
							</li>
						) ) }
					</ol>
					<form
						onSubmit={ async ( e ) => {
							e.preventDefault();
							if ( addTodo && newTodo ) {
								setAddingTodo( true );
								await addTodo( newTodo );
								setNewTodo( '' );
								setAddingTodo( false );
							}
						} }
						className="addtodo-form"
					>
						<TextControl
							value={ newTodo }
							onChange={ ( val ) => setNewTodo( val ) }
						/>
						<Button disabled={ addingTodo } type="submit" isPrimary>
							{ __( 'Add Todo', 'wp-todos' ) }
						</Button>
					</form>
				</>
			) }
		</div>
	);
}
