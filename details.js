$(document).ready(() => {
    const dropArea = document.querySelector(".drop_box");
    const button = dropArea.querySelector("button");
    const dragText = dropArea.querySelector("header");
    input = dropArea.querySelector("input");
    let file;
    var filename;

    button.onclick = () => {
        input.click();
    };

    input.addEventListener("change", (e) => {
    var fileName = e.target.files[0].name;
    let filedata = `
        <form action="" method="post">
        <div class="form">
        <h4>${fileName}</h4>
        </div>
        </form>`;
        $(e.target).parent().find('#file-upload-div').append(filedata);

        $(e.target).parent().find('.button').html('upload');

    });

    const url = localStorage.getItem('url');

    if (url !== undefined) {
        document.getElementById('qrimage').textContent = '';
        let qrc = new QRCode(document.getElementById("qrimage"), {
            text: url,
            width: 150,
            height: 150,
        });
    }

})