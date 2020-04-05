import React,{Component} from 'react';
import ReactPlayer from 'react-player'
import ClassNames from 'classnames'

class Player extends Component{
	constructor(props){
		super(props);
		this.state = {
            index:Math.floor(Math.random()*10),
            playing:true,
            value:'',
            error:null,
            rangeStyle:null,
            loaded:false,
            hovering:false,
            volume:0.4,
            muted:false
        };
        this.playPause = this.playPause.bind(this);
        this.onDuration = this.onDuration.bind(this);
        this.onProgress = this.onProgress.bind(this);
	    this.stop= this.stop.bind(this);
        this.onBackTenSec=this.onBackTenSec.bind(this);
        this.onFwdTenSec=this.onFwdTenSec.bind(this);
        this.handleHower=this.handleHower.bind(this);
        this.onVolumeChange=this.onVolumeChange.bind(this);
        this.handleToggleMuted=this.handleToggleMuted.bind(this);
    }

	playPause=()=>{
        this.setState({
            playing: !this.state.playing
        })
    }

    onDuration=(time)=> {
        this.setState({
            duration: this.formatTime(time),
            value: 0,
            currentTime: '00:00',
        })
    }

    onProgress=(state)=>{
        const percent_long = state.played*100+'%';
        const percent_weight = '100%';
        this.setState({
            value:state.played,
            rangeStyle:percent_long+' '+percent_weight,
            currentTime1:state.playedSeconds? this.formatTime(state.playedSeconds): '00:00'
        });
        if(state.played===1){
            if(this.state.playing)
                this.playPause();
            this.setState({
                value:'',
                currentTime1:'00:00'
            });
        }
    }

    onChange=(e)=>{
        const percent_long = e.target.value*100+'%';
        const percent_weight = '100%';
        this.setState({
            playing:true,
            value:parseFloat(e.target.value),
            rangeStyle:percent_long+' '+percent_weight,
        });
        this.player.seekTo(parseFloat(e.target.value));
    }

    onVolumeChange=(e)=>{
       if(!this.state.muted)
       this.setState({
            volume:parseFloat(e.target.value)
       })
    }

    stop=()=>{
        this.setState({
            playing:false
        })
        this.player.seekTo(0);
    }


    formatTime=(timeTemp)=>{
        let m = Math.floor(timeTemp/60);
        let s = Math.floor(timeTemp%60);
        return (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s);
    }

    onBackTenSec=()=>{
        let played = this.player.getCurrentTime();
        if(played<10)
            this.player.seekTo(0);
        else
            this.player.seekTo(played-10);

    }

    onFwdTenSec=()=>{
        let played = this.player.getCurrentTime();
        let duration = this.player.getDuration();
        if(duration-played<10)
            this.stop();
        else
            this.player.seekTo(played+10);
    }

    handleHower=()=>{
        this.state.hovering=!this.state.hovering;
    }

    handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
    }
	
	render(){
		const playPauseClass = ClassNames({
	      'fa fa-play': this.state.playing === true ? false : true,
	      'fa fa-pause': this.state.playing === true ? true : false
	    });
		return(
			<div>

				<ReactPlayer url={this.props.source}  playing={this.state.playing} controls={true} ref={player =>{this.player = player}} volume={this.state.volume} muted={this.state.muted} width='0px' height='0px' onProgress={this.onProgress} onDuration={this.onDuration} /> 
                <div className="footer" >
    				<div className="thumbnail"><img src={this.props.details.snippet.thumbnails.default.url} alt='' height="70" width="120" /></div>
                    <div className="details">
                        <div className="track">{this.props.details.snippet.title}</div>
                    </div>
                    <div className="player">
                      <button onClick={this.onBackTenSec}><i className="fa fa-backward"></i></button>
    		          <button onClick={this.playPause}><i className={playPauseClass}></i></button>
                      <button onClick={this.onFwdTenSec}><i className="fa fa-forward"></i></button>
    		          <button onClick={this.stop}><i className="fa fa-stop"></i></button>
    		          <div className="player-time">
                        <div className="time_left">{this.state.currentTime1}</div>
                        <div className="player-range">
                            <input type='range' min={0} max={1} step='any' value={this.state.value || '0'}
                                style={{backgroundSize: this.state.rangeStyle}} onChange={this.onChange}/>
                        </div>
                        <div className="time_right">{this.state.duration}</div>
                      </div>
                      
                      {this.state.muted===false ?
                          <button onMouseEnter={this.handleHower} onMouseLeave={this.handleHower} onClick={this.handleToggleMuted}>
                            <svg className="bi bi-volume-down-fill" viewBox="0 0 17 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8.717 3.55A.5.5 0 019 4v8a.5.5 0 01-.812.39L5.825 10.5H3.5A.5.5 0 013 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clipRule="evenodd"/>
                                <path d="M10.707 11.182A4.486 4.486 0 0012.025 8a4.486 4.486 0 00-1.318-3.182L10 5.525A3.489 3.489 0 0111.025 8c0 .966-.392 1.841-1.025 2.475l.707.707z"/>
                            </svg>
                          </button>
                         :
                        
                          <button onMouseEnter={this.handleHower} onMouseLeave={this.handleHower} onClick={this.handleToggleMuted}>
                            <svg className="bi bi-volume-mute-fill" viewBox="0 0 17 13" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zm7.137 1.596a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0z" clipRule="evenodd"/>
                              <path fillRule="evenodd" d="M9.146 5.146a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0z" clipRule="evenodd"/>
                            </svg>
                          </button>
                        
                      }
                      {this.state.hovering && 
                      <div>
                        <input type='range' min={0} max={1} step='any' value={this.state.volume || '0'}
                         onChange={this.onVolumeChange}
                        onMouseEnter={this.handleHower} onMouseLeave={this.handleHower}/>
                      </div>}
                    </div>
                
                </div>
          		
			</div>




		);
	}

}

export default Player;