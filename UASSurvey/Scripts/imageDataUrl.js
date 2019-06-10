const onSuccess = (s) => {
    // document.body.appendChild(s.image);
//    document.getElementById("imgg").setAttribute("src", s.data);
    console.log(s.data);
};

const onError = (e) => {
    alert(e.message);
};
function getImageDataURL(url, success, error) {
    var data, canvas, ctx;
    var img = new Image();
    img.onload = function () {
        // Create the canvas element.
        canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        // Get '2d' context and draw the image.
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        // Get canvas data URL
        try {
            data = canvas.toDataURL();
            img.src = data;
            success({ image: img, data: data });
        } catch (e) {
            error(e);
        }
    }
    // Load image URL.
    try {
        img.src = url;

    } catch (e) {
        error(e);
    }
}

