import { useBlockProps } from '@wordpress/block-editor';
export default function save() {
	return (
		<div { ...useBlockProps.save() }>
			<p>Hi There</p>
		</div>
	);
}
