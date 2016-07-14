'use strict';

/**
 * Copyright (C) Krypton Project 2016.  All rights Reserved.
 * Krypton Mute App.  Collect mute state of participant and simply publish it.
 */

function onApiReady() {
  console.log('KMute started');
  let isMuted = false;
  const me = gapi.hangout.getLocalParticipant();
  const googleId = me.person.id;
  const googleName = me.person.displayName;
  gapi.hangout.av.onMicrophoneMute.add(checkMuteState);

  function checkMuteState() {
    const wasMuted = localMicrophoneMuted;
    isMuted = gapi.hangout.av.getMicrophoneMute();
    if (wasMuted !== isMuted ) updateStatus(googleId, googleName, isMuted);
  }

  function updateStatus(googleId, googleName, newStatus) {
    console.log('KMute status changed yo:', googleId, googleName, newStatus);
  }
}

function onLoad() {
  gapi.hangout.onApiReady.add(onApiReady);
}

gadgets.util.registerOnLoadHandler(onLoad);
