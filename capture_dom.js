const displayMediaOptions = {
  video: {
    displaySurface: "window",
    resizeMode: "none",
    frameRate: { ideal: 60 },
  },
  audio: false,
  preferCurrentTab: true,
};

let recorder;

async function startCapture() {
  try {
    const stream =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    const [track] = stream.getVideoTracks();
    const cropTarget = await CropTarget.fromElement(document.body);
    await track.cropTo(cropTarget);
    recorder.ondataavailable = (event) => {
      if (event.data) {
        const blob = new Blob([event.data], { type: "video/webm" });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "nagranie.webm";
        downloadLink.click();
      }
    };
    recorder.start();
  } catch (err) {
    console.error(err);
  }
}

function stopCapture(evt) {
  recorder.stop();
}
