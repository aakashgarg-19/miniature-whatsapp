import AgoraRTC from "agora-rtc-sdk-ng";
import React, { useEffect } from 'react';
import { BiPhoneCall } from 'react-icons/bi'
import { HiPhoneMissedCall } from 'react-icons/hi'

export default function VideoCall() {
  let rtc = {
    localAudioTrack: null,
    localVideoTrack: null,
    client: null,
  };
  const getCurrentUser = async () => {
    const data = await JSON.parse(
      localStorage.getItem("chat-app-login")
    );
    return data;
  }
  const user = getCurrentUser();
  let options = {
    appId: "955ffb6a010345a19b6f240808d0fa56",
    channel: "chatapp",
    token: "007eJxTYBDJ06o2LNn0Q6omtPSYukX2s1v3hFZuuPI848aE40lZ5qwKDJampmlpSWaJBoYGxiamiYaWSWZpRiYGFgYWKQZpiaZmaXaKKQ2BjAyzTCVZGRkgEMRnZ0jOSCxJLChgYAAAcsUfCg==",
    uid: user._id,
  };

  const handleJoin = async () => {
    await rtc.client.join(
      options.appId,
      options.channel,
      options.token,
      options.uid
    );
    rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
    rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
    await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
    const localPlayerContainer = document.createElement("div");
    const videoCallDiv = document.getElementById("video-call-us");
    videoCallDiv.appendChild(localPlayerContainer);
    localPlayerContainer.id = options.uid;
    localPlayerContainer.style.width = "25vw";
    localPlayerContainer.style.height = "25vw";
    localPlayerContainer.style.borderradius = "25vw";
    localPlayerContainer.style.margin = "0 5vw";
    rtc.localVideoTrack.play(localPlayerContainer);
  };

  const handleLeave = async () => {
    rtc?.localAudioTrack?.close();
    rtc?.localVideoTrack?.close();
    const playerContainerr = document.getElementById(user._id);
    playerContainerr && playerContainerr.remove();
    rtc.client.remoteUsers.forEach((user1) => {
      const playerContainer = document.getElementById(user1.uid);
      playerContainer && playerContainer.remove();
    });
    await rtc.client.leave();
  };

  const temp = async () => {
    rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    rtc.client.on("user-published", async (user, mediaType) => {
      await rtc.client.subscribe(user, mediaType);
      if (mediaType === "video") {
        const remoteVideoTrack = user.videoTrack;
        const remotePlayerContainer = document.createElement("div");
        const videoCallDiv = document.getElementById("video-call-they");
        videoCallDiv.appendChild(remotePlayerContainer);
        remotePlayerContainer.id = user.uid.toString();
        remotePlayerContainer.style.width = "25vw";
        remotePlayerContainer.style.height = "25vw";
        remotePlayerContainer.style.paddingBottom = "5px";
        remotePlayerContainer.style.padding = "0 auto";
        remoteVideoTrack.play(remotePlayerContainer);
      }
      if (mediaType === "audio") {
        const remoteAudioTrack = user.audioTrack;
        remoteAudioTrack.play();
      }
      rtc.client.on("user-unpublished", (user) => {
        const remotePlayerContainer = document.getElementById(user._id);
        remotePlayerContainer.remove();
      });
    });
  };

  useEffect(() => {
    temp();
    return handleLeave;
  }, []);
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        <h2>Video Call Room</h2>
        <div className="row">
          <div className="video-calll">
            <button
              style={{
                margin: "0.5rem",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "green",
                color: "white",
                fontSize: "0.8rem",
              }}
              type="button"
              onClick={handleJoin}
            >
              <BiPhoneCall /> JOIN CALL
            </button>
            <button
              style={{
                margin: "0.5rem",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "red",
                color: "white",
                fontSize: "0.8rem",
              }}
              type="button"
              onClick={handleLeave}
            >
              <HiPhoneMissedCall /> LEAVE CALL
            </button>
          </div>
          <div style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
          }}>
            <div
              id="video-call-us"
            ></div>
            <div
              id="video-call-they"
            ></div>
          </div>
        </div>
      </div>
    </>
  )
}
