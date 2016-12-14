//Open json file
function readJsonFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//Shorten Link
function shortenLink(){
//    Copy Link
    if(document.getElementById("imp_urls_submit").value == "Copiar"){
        button.click();
    }else{
//        Get Link in Json File
        readJsonFile("../Assets/urls.json", function(text){
        var obj = JSON.parse(text);
        for (i in obj) {
            if(obj[i].url == document.getElementById("imp_urls").value){
                document.getElementById("imp_urls").value  = obj[i].shortUrl;
                document.getElementById("imp_urls_submit").value  = "Copiar";
                var input  = document.getElementById("imp_urls");
                var button = document.getElementById("imp_urls_submit");
                button.addEventListener("click", function (event) {
                    event.preventDefault();
                    input.select();
                    document.execCommand("copy");
                    document.getElementById("imp_urls_submit").value  = "Encurtar";
                });
            }
            };
        });
    }
}

//Load Top Links (5)
function loadTopLinks(){
//    Open Json File
    readJsonFile("../Assets/urls.json", function(text){
        var data = JSON.parse(text);
        data.sort(function(a, b) {
            return parseFloat(b.hits) - parseFloat(a.hits);
        });
        for (i = 0; i < 5; i++) {
//            tr
            var tr = document.createElement("tr");
            var tdUrl = document.createElement("td");
//            td
            var tdAccesses = document.createElement("td");
            var aUrl = document.createElement("a");
            var textAccesses = document.createTextNode(data[i].hits);
            aUrl.setAttribute("href", data[i].url);
            aUrl.innerText = data[i].shortUrl;
            tdUrl.appendChild(aUrl);
            tdAccesses.appendChild(textAccesses);
            tr.appendChild(tdUrl);
            tr.appendChild(tdAccesses);
//            body table
            document.getElementById('bodyTable').appendChild(tr);
        }
    });
    countHits();
}

//Count Hits
function countHits(){
//    Open Json File
    readJsonFile("../Assets/urls.json", function(text){
        var obj = JSON.parse(text);
        var count = 0;
        for (i in obj) {
            count += obj[i].hits;
        }
        document.getElementById("count_hits").value  = "" + count;
    });
}