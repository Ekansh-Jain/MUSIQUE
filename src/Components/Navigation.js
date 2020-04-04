import React from 'react';

const Navigation =(onRouteChange)=>{
			return(
				<nav className="navbar navbar-light bg-light" style={{display:'flex'}}>
  <a style={{justifyContent:'flex-end'}}>Welcome User</a>
  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign Out</button>
 
</nav>

			

	);
}

export default Navigation;