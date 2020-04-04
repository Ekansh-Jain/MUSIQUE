import React from 'react';
import tachyons from 'tachyons'

const Search=({onInputChange,onSearchButtonSubmit})=>{
	return(
	<div className='pa2'>
		<input
		className='pa2 ba b--green'
		type='text'
		onChange={onInputChange}
		placeholder=' '
		/>
		<button className='pa1' onClick={onSearchButtonSubmit}>Search</button>
	</div>
	);
}
export default Search;