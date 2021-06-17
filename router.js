var root = null;
var useHash = true; // Defaults to: false
var hash = "#c"; // Defaults to: '#'
window.router = new Navigo(root, useHash, hash);

let $app = document.getElementById("app");

window.router
    .on("/login", function () {
        $app.innerHTML = "<login-screen></login-screen>";
    })
    .resolve();

window.router
    .on("/register", function () {
        $app.innerHTML = "<register-screen></register-screen>";
    })
    .resolve();

window.router
    .on("/index", function () {
        $app.innerHTML = "<index-screen></index-screen>";
    })
    .resolve();

// xử lý trường hợp người dùng truy cập vào route không tồn tại
window.router.notFound(function () {
    $app.innerHTML = "không tìm thấy trang này";
});
