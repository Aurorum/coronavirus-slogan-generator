window.onload = function () {
  canvasUpdate();
  collectStatistics("new view");
};

function buildCanvas(canvasId, version) {
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext("2d");
  var img = document.getElementById(version);
  ctx.drawImage(img, 10, 10);
  var ctx = canvas.getContext("2d");
  let canvasHeight = canvas.height / 2;
  if (document.getElementById("secondlinesecondrow").value === "") {
    canvasHeight = canvas.height / 2 + 30;
  }

  ctx.font = "900 52px Arial";
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.fillText(
    document.getElementById("secondline").value.toUpperCase(),
    canvas.width / 2,
    canvasHeight
  );
  ctx.fillText(
    document.getElementById("secondlinesecondrow").value.toUpperCase(),
    canvas.width / 2,
    canvas.height / 2 + 50
  );
  ctx.font = "900 36px Arial";
  ctx.fillText(
    document.getElementById("firstline").value.toUpperCase(),
    canvas.width / 2,
    canvas.height / 4 - 14
  );
  ctx.fillText(
    document.getElementById("finalline").value.toUpperCase(),
    canvas.width / 2,
    canvas.height - 100
  );

  document.getElementById("canvas-download-" + version).href = canvas.toDataURL(
    "image/png"
  );
}

function canvasUpdate() {
  buildCanvas("green-canvas", "green");
  buildCanvas("red-canvas", "red");
}

function downloadImage(version) {
  var canvas = document.getElementById(version + "-canvas");
  var img = canvas.toDataURL("image/png");
  document.getElementById("canvas-download").href = img;
}

function collectStatistics(data) {
  // Fires stats to Hive.
  if (data === undefined) {
    data = "unknown source";
  }

  var request = new XMLHttpRequest();
  request.open(
    "POST",
    "https://discord.com/api/webhooks/717677497315098640/DuxJGBC0WVRVPAG9o8_FilfxEhk819PhdR66QHo6ycnLQopdzIaDmNs9wehEhf1q16XL"
  );

  request.setRequestHeader("Content-type", "application/json");

  var params = {
    content:
      "**Statistics: " +
      data +
      "** at " +
      new Date() +
      " with data of " +
      navigator.userAgent,
  };

  request.send(JSON.stringify(params));
}
