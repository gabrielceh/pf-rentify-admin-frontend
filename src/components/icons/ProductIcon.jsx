const ProductIcon = (props) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		width={28}
		height={28}
		fill='none'
		stroke='#2c3e50'
		strokeLinecap='round'
		strokeLinejoin='round'
		strokeWidth={1.5}
		className='icon icon-tabler icon-tabler-box-seam'
		viewBox='0 0 24 24'
		{...props}>
		<path stroke='none' d='M0 0h24v24H0z' />
		<path d='m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3M12 12l8-4.5M8.2 9.8l7.6-4.6M12 12v9M12 12 4 7.5' />
	</svg>
)
export default ProductIcon
