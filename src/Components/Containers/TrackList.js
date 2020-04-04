import React from 'react';

const TrackList = ({ onVideoSelect, list }) => {

    const trackComponent = list.map((track)=>{
      return (
        <tr key={track[0]} onClick={onVideoSelect} id={track[1].id.videoId} videodet={track[0]}>
          <td><img src={track[1].snippet.thumbnails.default.url} alt=''/></td>
          <td>{track[1].snippet.title}</td>
          <td>{track[1].snippet.channelTitle}</td>
        </tr>
      );
    }) 
    return(
        <div>
          <table>
          <tbody>
          <tr>
            <td></td>
            <td>TITLE</td>
            <td>ARTIST</td>
          </tr>
          {trackComponent}
          </tbody>
          </table>
          
        </div>
    );
}



export default TrackList

/*
<div>

    {list.forEach(track => (
      
      <div key={track[0]}>

        <img width="30" src={PlayIcon} alt="Track" />
        <a

          href={track[1].url}

          title={track[1].name}

          target="_blank"

          rel="noopener noreferrer"

        >

          {track[1].name} - {track[1].artist}

        </a>

      </div>

    ))}

  </div>
  */