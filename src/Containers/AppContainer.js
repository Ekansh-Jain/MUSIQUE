import React from 'react';
import Search from '../Components/Search'
import TrackList from '../Components/TrackList'
import Player from '../Components/Player'
require('dotenv').config;
class AppContainer extends React.Component{
	constructor(){
		super();

		this.state={
			query: '',

      		youtubekey:process.env.API_KEY,

      		error: null,

      		isLoaded: false,

      		isClicked:false,

    		trackResult: {},

    		source:'',

    		videoId:'',

    		details:{}

		};

		this.onInputChange=this.onInputChange.bind(this);
		this.onVideoSelect=this.onVideoSelect.bind(this);
		this.onSearchButtonSubmit=this.onSearchButtonSubmit.bind(this);
		this.trackSearch=this.trackSearch.bind(this);
	}
	onInputChange=(event)=>{
		this.setState({query:event.target.value});
	}

	onVideoSelect=(event)=>{
		this.setState({
			videoId:event.currentTarget.id, 
			source:"https://www.youtube.com/embed/"+event.currentTarget.id,
			details:this.state.trackResult[event.currentTarget.getAttribute('videodet')]
		});
	}

	onSearchButtonSubmit=()=>{
		console.log(this.state.youtubekey);
		this.trackSearch();
	}

	trackSearch=()=>{
		
		fetch(

      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${this.state.query}&videoDuration!=long&key=${this.state.youtubekey}`

    )
	.then(result => result.json())
	.then(result => {
		this.setState({
			isLoaded: true,
			trackResult: result.items
		})

	},
      error => {

          this.setState({

            isLoaded: true,

            error

          })

          console.log(Response.ok)

        }

     )

	}
	render(){
		return(
			<div>
				<Search onInputChange={this.onInputChange} onSearchButtonSubmit={this.onSearchButtonSubmit}/>
				{this.state.isLoaded ?
					<div>
						 <TrackList 
						 list={Object.entries(this.state.trackResult)} onVideoSelect={this.onVideoSelect}/>
						 {(this.state.source.length!==0) ?
						 	
						 	<div>
						 	<Player youtubekey={this.state.youtubekey} videoId={this.state.videoId} source={this.state.source} details={this.state.details}/>
						 	</div>
						 			:
						 	<div/>
						 }
					</div>
					:

					<div/>
				
			}
			</div>

		);
	}
}

export default AppContainer;
