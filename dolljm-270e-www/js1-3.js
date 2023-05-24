// $(document).ready(function() {
//     alert("Document loaded successful!");
//     var canvas = document.getElementById("canvas1");
//     var ctx = canvas.getContext("2d");
//     // loop through and draw four random rectangles
//     for (var i = 0; i < 4; i++) {
//         var x = Math.random() * canvas.width;
//         var y = Math.random() * canvas.height;
//         var width = Math.random() * 100;
//         var height = Math.random() * 100;
//         ctx.beginPath();
//         ctx.rect(x, y, width, height);
//         ctx.stroke();
//     }
// });

var loader = setInterval(function () {
    if(document.readyState !== "complete") return;
    clearInterval(loader);
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    // loop through and draw four random rectangles
    for (var i = 0; i < 4; i++) {
        var x = Math.random() * (canvas.width - 10);
        var y = Math.random() * (canvas.height - 10);
        var width = Math.random() * 100;
        var height = Math.random() * 100;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
    }
    var canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext("2d");
    for (var i = 0; i < 4; i++) {
        var x = Math.random() * (canvas2.width - 10);
        var y = Math.random() * (canvas2.height - 10);
        var width = Math.random() * 100;
        var height = Math.random() * 100;
        ctx2.beginPath();
        ctx2.rect(x, y, width, height);
        ctx2.stroke();
    }
 }, 300);