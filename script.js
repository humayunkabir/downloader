/////////////////////////
// AJAX with Promise
/////////////////////////
let getData = (method, url) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function() {
            if(this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                });
            }
        };
        xhr.onerror = () => {
            reject({
                status: this.status,
                statusText: xhr.statusText,
            });
        };
        xhr.send();
    });
}

document.querySelector(".download").onclick = () => {
    let getvalue = document.querySelector(".getvalue");
    let url = getvalue.querySelector(".url").value;
    let array = getvalue.querySelector(".array").value;
    let key = getvalue.querySelector(".key").value;

    getData("GET", url).then((data) => {
        let JSONdata = JSON.parse(data);
        let actualArray = JSONdata[array];

        let $ajax = document.querySelector(".ajax");
        let output = ``;

        for (item of actualArray){
            console.log(item[key]);
            output += `
              <div class="col-sm-6 col-md-4 col-lg-4 col-xl-2 mb-4">
                <a href="${item[key]}" target="_blank">
                    <img src="${item[key]}" alt="" class="img-fluid">
                 </a>
              </div>
            `;
        }
        $ajax.innerHTML = output;
    }).catch((err) => {
        console.log(err);
    });

}
