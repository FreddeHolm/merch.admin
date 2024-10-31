import React from "react"
//import "./SwipeButtons.css"
import IconButton from "@material-ui/core/IconButton";

//https://mui.com/material-ui/material-icons/?query=image
import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import FilterIcon from "@material-ui/icons/Filter";

import ArrowForwardIos from "@material-ui/icons/ArrowForwardIos";
import NavigateNext from "@material-ui/icons/NavigateNext";






function SwipeButtons () {
  return (
    <div className="swipeButtons">
        <IconButton className="swipeButtons__repeat">    <ReplayIcon fontSize="large"/>  </IconButton>
        <IconButton className="swipeButtons__left">    <CloseIcon fontSize="large"/> </IconButton>
        <IconButton className="swipeButtons__star">    <StarRateIcon fontSize="large"/> </IconButton>
        <IconButton className="swipeButtons__right">    <FavoriteIcon fontSize="large"/> </IconButton>
        <IconButton className="swipeButtons__lightning">    <FlashOnIcon fontSize="large"/> </IconButton>

        <IconButton className="swipeButtons__image"><FilterIcon fontSize="large"/></IconButton>

        <IconButton className="swipeButtons__next1"><ArrowForwardIos fontSize="large"/></IconButton>
        <IconButton className="swipeButtons__next2"><NavigateNext fontSize="large"/></IconButton>


    </div>
  )
};

export default SwipeButtons;
