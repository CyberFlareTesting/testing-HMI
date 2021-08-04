//
//
// Batch uploads
//
//
var DataDELocate = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 113, 116, 118, 121, 123, 125, 127, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153];
var Data, FileData;
var MData, FileMData;
var fileInput1 = document.getElementById('input1');
var fileInput2 = document.getElementById('input2');
var table = document.getElementById("table");
var isMaster;
var TableCount = 0;

// hides footer and boxes
var hideCount1 = 0;
    var hideCount2 = 0;
    var hideCount3 = 0;
    function THide(a){
        var elem = ((a==1)? "main": (a==2)?"other": "foot");
        (a==1)? hideCount1++: (a==2)? hideCount2++: hideCount3++;
        if ((a==1 && hideCount1%2 == 0)||(a==2 && hideCount2%2 == 0)||(a==3 && hideCount3%2 == 0)){
            document.getElementById(elem).style.display = "block";
        } else if ((a==1 && hideCount1%2 == 1)||(a==2 && hideCount2%2 == 1)||(a==3 && hideCount3%2 == 1)){
            document.getElementById(elem).style.display = "none";
        }
    }

fileInput1.onchange = () => {
    MData=[], FileMData=[];
    isMaster = true;
    var selectedFiles = [...fileInput1.files];
    for(var k = 0; k<selectedFiles.length; k++){
        ReadFile(selectedFiles[k])
    }
}
fileInput2.onchange = () => {
    Data=[], FileData=[];
    isMaster = false;
    var selectedFiles = [...fileInput2.files];
    for(var i = 0; i<selectedFiles.length; i++){
        ReadFile(selectedFiles[i])
    }
}

function ReadFile(file){
    const reader = new FileReader();
    var Fname = file.name;
    reader.addEventListener('load', (event) => {
        var output = event.target.result;
        GrabData(output.split("\n"), Fname);
    });
    reader.readAsText(file, 'windows-1252');
}

function GrabData(input, fileName) {
    var temp = [];
    for (var x=0; x<input.length; x++){
    temp.push(input[x].replaceAll("\r", ""))
    }
    var ConciseInput = [];
    for (var x=0; x<DataDELocate.length; x++){
        ConciseInput.push(temp[DataDELocate[x]-1])
    }
    if(isMaster){
        MData.push(ConciseInput);
        FileMData.push(fileName);
    }else{
        Data.push(ConciseInput);
        FileData.push(fileName);
    }
}

//
// On Start Main Prog
//

function Compare(){
MDataT = [];
DataT = [];
if (MData.length > 0 && Data.length > 0){
        TableCount++;
}
    for (let m = 0; m<MData.length; m++){
        MDataT.push(FileMData[m].substring(0, FileMData[m].indexOf(".")));
    } 
    for(let d = 0; d<Data.length; d++){
        DataT.push(FileData[d].substring(0, FileData[d].indexOf(".")));
    }
    let Missing = MDataT.filter(x => DataT.indexOf(x) === -1);
    let Extra = DataT.filter(x => MDataT.indexOf(x) === -1);
        console.log("Missing: " +  Missing.join(", "))
        console.log("Extra: " + Extra.join(", "))

    var Question;
    var askQ=true;
    if(Missing.length!=0 && Extra.length!=0){
        Question = `you are missing ${Missing.join(", ")} and have extra ${Extra.join(", ")}! Would you still like to continue? (we will skip these)`
    }else if(Missing.length!=0){
        Question = `you are missing ${Missing.join(", ")}! Would you still like to continue? (we will skip these)`
    }else if(Extra.length!=0){
        Question = `you have extra ${Extra.join(", ")}! Would you still like to continue? (we will skip these)`
    }else{
        askQ = false;
        checkContents(MDataT, Missing, DataT, Extra)
    }
    if(askQ){
        if (confirm(Question)) {
            checkContents(MDataT, Missing, DataT, Extra)
        } else {
            return;
        }
    }
    
}

function checkContents(MDataT, Missing){
    console.log(MData)
    var MasterData = [...MDataT];
    var MasterDocs = [];
    var CurrentDocs = [];
    var maindoc = [];
    var changes = []
   
    for (var t = 0; t<Missing.length; t++){
       MasterData = [...MasterData.filter(function(f) { return f !== Missing[t]})];
    }
    for(var k =0; k<MasterData.length; k++){
         var temp = []
        maindoc.push(MasterData[k] + ":")
        MasterDocs.push(MData[FileMData.indexOf(MasterData[k]+".txt")])
        CurrentDocs.push(Data[FileData.indexOf(MasterData[k]+".txt")])
        for(var j=0; j<MasterDocs[0].length; j++){
            if (!(MasterDocs[k][j] == CurrentDocs[k][j])){
                temp.push(false)
            }else{
                temp.push(true)
            }
        }
        changes.push(temp);
        console.log(changes)
    }
        drawToTable(MasterData, changes)
}

function drawToTable(MasterData, changes){
    var TableDown = "Anwahl DMC Patrone</th><th>Anwahl DMC 1 Patrone</th><th>Soll DMC 1</th><th>Scannen bei Spanner 1 zu</th><th>Anwahl DMC 2 Patrone</th><th>Soll DMC 2</th><th>Scannen bei Spanner 2 zu</th><th>Anwahl DMC 3 Patrone</th><th>Soll DMC 3</th><th>Scannen bei Spanner 3 zu</th><th>Anwahl RFID Code</th><th>Anwahl RFID Vorrichtung</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 1</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 2</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 3</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 4</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 5</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 6</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 7</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 8</th><th>Soll RFID Code</th><th>Anwahl RFID Wechselteil 9</th><th>Soll RFID Code</th><th>Anwahl DMC Beistellteile</th><th>Anwahl DMC Beistellteil 1</th><th>Code</th><th>Anwahl DMC Beistellteil 2</th><th>Code</th><th>nwahl DMC Beistellteil 3</th><th>Code</th><th>Anwahl DMC Beistellteil 4</th><th>Code</th><th>Anwahl DMC Beistellteil 5</th><th>Code</th><th>Anwahl DMC Beistellteil 6</th><th>Code</th><th>Anwahl DMC Beistellteil 7</th><th>Code</th><th>Anwahl DMC Beistellteil 8</th><th>Code</th><th>Anwahl DMC Beistellteil 9</th><th>Code</th><th>Anwahl DMC Beistellteil 10</th><th>Code</th><th>Teilenummer</th><th>Anwahl Labeldrucker</th><th>Labelnummer</th><th>Anwahl Teilekontrolle</th><th>Anwahl Teilekontrolle 3.0</th><th>Anwahl Teilekontrolle 3.1</th><th>Anwahl Teilekontrolle 4.0</th><th>Zeile 1</th><th>Zeile 2</th><th>Zeile 3</th><th>Zeile 4</th><th>Zeile 5</th><th>Zeile 6</th><th>Freigabe automatisch Lösen</th><th>Mit Hydraulik</th><th>Handvorrichtung</th><th>Laufzeit bis Schwimmstellung</th><th>Handfunktion vor dem Start</th><th>Handfunktion nach dem Start"
    var TableArray = TableDown.split("</th><th>");
if(TableCount==1){
    var row = table.insertRow();
    var freecell = document.createElement("TD");
    freecell.innerHTML = "SBM";
    row.appendChild(freecell);

    for (var i = 0; i < TableArray.length; i++) {
        var headerCell = document.createElement("TD");
        headerCell.innerHTML = TableArray[i];
        row.appendChild(headerCell);
    }
}else{
    var row = table.insertRow();
    var freecell = document.createElement("TD");
    freecell.innerHTML = "New Batch Compare";
    row.appendChild(freecell);
}
    for (var i = 0; i < MasterData.length; i++) {
        var Bodyrow = table.insertRow();
        var cell = document.createElement("TD");
        cell.innerHTML = MasterData[i];
        Bodyrow.appendChild(cell);
        for(var k = 0; k<changes[i].length; k++){
            var bodycell = document.createElement("TD");
            bodycell.style.backgroundColor = (changes[i][k])? "green": "red";
            bodycell.innerHTML = (changes[i][k])? "Same": "Different";
            Bodyrow.appendChild(bodycell);
        }
    }
document.getElementById("scrollingTable").style.display = 'block';
}

function PrintTable(){
    var printWindow = window.open('', '', 'height=400,width=600');
    printWindow.document.write('<html><head><title>Table Contents</title>');

    //Print the Table CSS.
    var table_style = document.getElementById("table_style").innerHTML;
    printWindow.document.write('<style type = "text/css">');
    printWindow.document.write(table_style+"tr { display: block; float: left; }\nth, td { display: block; }");
    printWindow.document.write('</style>');
    printWindow.document.write('</head>');

    //Print the DIV contents i.e. the HTML Table.
    printWindow.document.write('<body>');
    var divContents = document.getElementById("scrollingTable").innerHTML;
    printWindow.document.write(divContents);
    printWindow.document.write('</body>');
    printWindow.document.write('</html>');
    printWindow.document.close();
    printWindow.print();
}