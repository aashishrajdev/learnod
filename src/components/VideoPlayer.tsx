import React from "react";

const VideoPlayer = ({ videoId }) : { videoId: string } => {
    <div className="video-container">
        <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="acccelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full h-64"
        />
        </div>      


export default VideoPlayer;