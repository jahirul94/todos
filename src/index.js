import { registerBlockType } from '@wordpress/blocks';
import './todos-store';
// import './plugins/sidebar'
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType( 'blocks-course/wp-todos', {
	edit: Edit,
	save,
} );
