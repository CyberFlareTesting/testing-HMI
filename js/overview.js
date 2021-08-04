var DataDELocate = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 113, 116, 118, 121, 123, 125, 127, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153];
var MData, FileMData;
var fileInput1 = document.getElementById('input1');
var collapse = false;

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

    function ToggleCollapse(){
        MData=[], FileMData=[];
        collapse = !collapse;
        console.log("toggle collapse: " + collapse)
        count = 0;
    var selectedFiles = [...fileInput1.files];
    for(var k = 0; k<selectedFiles.length; k++){
        ReadFile(selectedFiles[k])
    }
    setTimeout(Start, 500);
    }

fileInput1.onchange = () => {
    MData=[], FileMData=[];
    count = 0;
    var selectedFiles = [...fileInput1.files];
    for(var k = 0; k<selectedFiles.length; k++){
        ReadFile(selectedFiles[k])
    }
    setTimeout(Start, 500);
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
    FileMData.push(fileName.substring(0, fileName.indexOf(".txt")));
    MData.push([...temp]);
    n = document.getElementById("fileListp");
    n.innerHTML = "";
    n.innerHTML = "-" + FileMData.join("<br>-");
    n.style.border = "3px solid #808080";
}

var count = 0;
function Start(){
    var filetext = [];
    for(x=0; x<MData.length; x++){
        filetext.push(overviewFile(count, FileMData[count]))
        count++;
    }
    doc = overviewHeader + "\n" + filetext.join("\n");
    var file = new Blob([doc], {type: 'windows-1252'});
    var a = document.getElementById("y");
  a.href = URL.createObjectURL(file);
  a.download = "test.csv";
}

var overviewHeader = "File,         SBM,,Part #,,Scan,,Additional Scans,,RFID,   Jig RFID,Robot Job,     Print Number,"
overviewFile = (count, fileName) => {
    backupPartNumber = (x) => {
        CheckData = [`${MData[x][130]}`,`${MData[x][132]}`,`${MData[x][134]}`,`${MData[x][136]}`,`${MData[x][138]}`,`${MData[x][140]}`]
        for(var y = 0; y<CheckData.length; y++){
            if(CheckData[y].includes(".") && CheckData[y].includes("-")){
                console.log("condition met: Beta- \"Part Finder\" has been activated. This is still in testing, please use sparingly")
                return CheckData[y];
            }
        }
        return "";
    }
    if(!collapse){
return `#${count+1},${fileName},,${(!(MData[count][130].includes(".")||MData[count][130].includes("-")))? backupPartNumber(count):MData[count][130]},,${(MData[count][5]=="Ja")?`DMC1: ${(MData[count][7]=="Ja")?`${MData[count][9]}`:"N"}`:"No"},,${(MData[count][69]=="Nein")?"No":`DMC1: ${(MData[count][71]=="Nein")? "N":`${MData[count][73]}`}`},,${(MData[count][26]=="Ja")?`ID1: ${(MData[count][32]=="Ja")?`${MData[count][34]}`:"N"}`:"No"},${(MData[count][28]=="Ja")?`${MData[count][30]}`: "No"},${MData[count][112]},${MData[count][117]},
,,,,,${(MData[count][5]=="Ja")?`DMC2: ${(MData[count][13]=="Ja")?`${MData[count][15]}`:"N"}`:""},,${(MData[count][69]=="Nein")?"":`DMC2: ${(MData[count][75]=="Nein")? "N":`${MData[count][77]}`}`},,${(MData[count][26]=="Ja")?`ID2: ${(MData[count][36]=="Ja")?`${MData[count][38]}`:"N"}`:""},,,
,,,,,${(MData[count][5]=="Ja")?`DMC3: ${(MData[count][19]=="Ja")?`${MData[count][21]}`:"N"}`:""},,${(MData[count][69]=="Nein")?"":`DMC3: ${(MData[count][79]=="Nein")? "N":`${MData[count][81]}`}`},,${(MData[count][26]=="Ja")?`ID3: ${(MData[count][40]=="Ja")?`${MData[count][42]}`:"N"}`:""},,,
,,,,,,,${(MData[count][69]=="Nein")?"":`DMC4: ${(MData[count][83]=="Nein")? "N":`${MData[count][85]}`}`},,${(MData[count][26]=="Ja")?`ID4: ${(MData[count][44]=="Ja")?`${MData[count][46]}`:"N"}`:""},,,
,,,,,,,${(MData[count][69]=="Nein")?"":`DMC5: ${(MData[count][87]=="Nein")? "N":`${MData[count][89]}`}`},,${(MData[count][26]=="Ja")?`ID5: ${(MData[count][48]=="Ja")?`${MData[count][50]}`:"N"}`:""},,,
,,,,,,,${(MData[count][69]=="Nein")?"":`DMC6: ${(MData[count][91]=="Nein")? "N":`${MData[count][93]}`}`},,${(MData[count][26]=="Ja")?`ID6: ${(MData[count][52]=="Ja")?`${MData[count][54]}`:"N"}`:""},,,
,,,,,,,${(MData[count][69]=="Nein")?"":`DMC7: ${(MData[count][95]=="Nein")? "N":`${MData[count][97]}`}`},,${(MData[count][26]=="Ja")?`ID7: ${(MData[count][56]=="Ja")?`${MData[count][58]}`:"N"}`:""},,,
,,,,,,,${(MData[count][69]=="Nein")?"":`DMC8: ${(MData[count][99]=="Nein")? "N":`${MData[count][101]}`}`},,${(MData[count][26]=="Ja")?`ID8: ${(MData[count][60]=="Ja")?`${MData[count][62]}`:"N"}`:""},,,
,,,,,,,${(MData[count][69]=="Nein")?"":`DMC9: ${(MData[count][103]=="Nein")? "N":`${MData[count][105]}`}`},,${(MData[count][26]=="Ja")?`ID9: ${(MData[count][64]=="Ja")?`${MData[count][66]}`:"N"}`:""},,,
,,,,,,,${(MData[count][69]=="Nein")?"":`DMC10: ${(MData[count][107]=="Nein")? "N":`${MData[count][109]}`}`},,,,,\n`;
}else{
return `# ${count},${fileName},,${(!(MData[count][130].includes(".")||MData[count][130].includes("-")))? backupPartNumber(count):MData[count][130]},,${(MData[count][5]=="Ja")?`DMC1: ${(MData[count][7]=="Ja")?`${MData[count][9]}`:"N"}`:"No"},,${(MData[count][69]=="Nein")?"No":`DMC1: ${(MData[count][71]=="Nein")? "N":`${MData[count][73]}`}`},,${(MData[count][26]=="Ja")?`ID1: ${(MData[count][32]=="Ja")?`${MData[count][34]}`:"N"}`:"No"},${(MData[count][28]=="Ja")?`${MData[count][30]}`: "No"},${MData[count][112]},${MData[count][117]},
,,,,,${(MData[count][5]=="Ja")?`DMC2: ${(MData[count][13]=="Ja")?`${MData[count][15]}`:"N"}`:""},,${(MData[count][69]=="Nein")?"":`DMC2: ${(MData[count][75]=="Nein")? "N":`${MData[count][77]}`}`},,${(MData[count][26]=="Ja")?`ID2: ${(MData[count][36]=="Ja")?`${MData[count][38]}`:"N"}`:""},,,
,,,,,${(MData[count][5]=="Ja")?`DMC3: ${(MData[count][19]=="Ja")?`${MData[count][21]}`:"N"}`:""},,${(MData[count][69]=="Nein")?"":`DMC3: ${(MData[count][79]=="Nein")? "N":`${MData[count][81]}`}`},,${(MData[count][26]=="Ja")?`ID3: ${(MData[count][40]=="Ja")?`${MData[count][42]}`:"N"}`:""},,,\n${(MData[count][69]=="Nein" && MData[count][26]=="Nein")? "":`,,,,,,,${(MData[count][69]=="Nein")?"":`DMC4: ${(MData[count][83]=="Nein")? "N":`${MData[count][85]}`}`},,${(MData[count][26]=="Ja")?`ID4: ${(MData[count][44]=="Ja")?`${MData[count][46]}`:"N"}`:""},,,\n`}${(MData[count][69]=="Nein" && MData[count][26]=="Nein")? "":`,,,,,,,${(MData[count][69]=="Nein")?"":`DMC5: ${(MData[count][87]=="Nein")? "N":`${MData[count][89]}`}`},,${(MData[count][26]=="Ja")?`ID5: ${(MData[count][48]=="Ja")?`${MData[count][50]}`:"N"}`:""},,,\n`}${(MData[count][69]=="Nein" && MData[count][26]=="Nein")? "":`,,,,,,,${(MData[count][69]=="Nein")?"":`DMC6: ${(MData[count][91]=="Nein")? "N":`${MData[count][93]}`}`},,${(MData[count][26]=="Ja")?`ID6: ${(MData[count][52]=="Ja")?`${MData[count][54]}`:"N"}`:""},,,\n`}${(MData[count][69]=="Nein" && MData[count][26]=="Nein")? "":`,,,,,,,${(MData[count][69]=="Nein")?"":`DMC7: ${(MData[count][95]=="Nein")? "N":`${MData[count][97]}`}`},,${(MData[count][26]=="Ja")?`ID7: ${(MData[count][56]=="Ja")?`${MData[count][58]}`:"N"}`:""},,,\n`}${(MData[count][69]=="Nein" && MData[count][26]=="Nein")? "":`,,,,,,,${(MData[count][69]=="Nein")?"":`DMC8: ${(MData[count][99]=="Nein")? "N":`${MData[count][101]}`}`},,${(MData[count][26]=="Ja")?`ID8: ${(MData[count][60]=="Ja")?`${MData[count][62]}`:"N"}`:""},,,\n`}${(MData[count][69]=="Nein" && MData[count][26]=="Nein")? "":`,,,,,,,${(MData[count][69]=="Nein")?"":`DMC9: ${(MData[count][103]=="Nein")? "N":`${MData[count][105]}`}`},,${(MData[count][26]=="Ja")?`ID9: ${(MData[count][64]=="Ja")?`${MData[count][66]}`:"N"}`:""},,,\n`}${(MData[count][69]=="Nein")? "":`,,,,,,,${(MData[count][69]=="Nein")?"":`DMC10: ${(MData[count][107]=="Nein")? "N":`${MData[count][109]}`}`},,,,,\n`}`;
} 
}