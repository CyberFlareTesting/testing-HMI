
    // Default Info
    var DataDELocate = [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 27, 29, 31, 33, 35, 37, 39, 41, 43, 45, 47, 49, 51, 53, 55, 57, 59, 61, 63, 65, 67, 70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92, 94, 96, 98, 100, 102, 104, 106, 108, 110, 113, 116, 118, 121, 123, 125, 127, 131, 133, 135, 137, 139, 141, 143, 145, 147, 149, 151, 153];
    
    // Placeholders
    var Name;
    var Data;
    var DataMod = [];
    var reader;
    var ToExcel;

    var hasFile1 = false;
    var hasFile2 = false;
   
    /**
     * Check for support.
     */
    function checkFileAPI() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            reader = new FileReader();
            return true; 
        } else {
            alert('The File APIs are not fully supported by your browser.');
            return false;
        }
    }

    // checks for file
    function alertBot(b){
        if ((b==2 && hasFile2 == false) || (b==1 && hasFile1 == false)){
            alert("you have not entered a file!");
        }
        window.location.reload();
    }

    // hides the box
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

    /**
     * read text input
     */
    function readText(filePath, bool) {
        ToExcel = bool;
        var output = "";
        if(filePath.files && filePath.files[0]) {           
            reader.onload = function (e) {
                output = e.target.result;
                grabData(output);
            };//end onload()
            Name = filePath.files[0].name;
            reader.readAsText(filePath.files[0], 'windows-1252');
        }
        else {
            return false;
        }       
        return true;
    }   

    /**
     * display content using a basic HTML 
     * replacement & prep for download 
     */
    function grabData(output) {
    try{
        Data = output.split("\n");
        if (ToExcel){
            Name = Data[1].substring(Data[1].indexOf(":")+2);
            for (var x = 0; x<DataDELocate.length; x++){
                var temp = Data[DataDELocate[x]-1].replaceAll("\r", "");
                DataMod.push((temp=="Ja")? "on": (temp=="Nein")? "off": temp);
            }
            ext = Name.substring(0, Name.length-1);
            el = document.getElementById('main');
        } else{
            for (var y = 0; y<Data.length; y++){
                var temp = (Data[y].split(","));
                var temp2 = temp[3];
                console.log(temp2);
                DataMod.push((temp2=="on")? "Ja": (temp2=="off")? "Nein": temp2);
            }
            ext = Name.substring(0, Name.length-4);
            el = document.getElementById('other');
        }
        htm = DataMod.toString();
        el.innerHTML = htm.replaceAll(",", "<br>");
        download(ext + ((ToExcel)? ".csv": ".txt"), ext);
    }
    catch{
        alert("The File Type Is Incorrect! Only " + ((ToExcel)? ".txt": ".csv") + " Files Created By Your Machine Are Accepted There!");
        console.log(DataMod);
        window.location.reload();
    }
    }   

    // Function to download data to a file
function download(name, ext) {
    doc = ((ToExcel)? documentEN():documentDE(ext)).replaceAll("\n", "\r\n");
  var a = (ToExcel)? document.getElementById("a"): document.getElementById("y");
  var file = new Blob([doc], {type: 'windows-1252'});
  a.href = URL.createObjectURL(file);
  a.download = name;
(ToExcel)? hasFile1 = true: hasFile2 = true;

  ////////////////////
  Name = null;
  Data = null;
  DataMod = [];
  ToExcel = null;
  n=0;
  hideCount1 = 0;
  hideCount2 = 0;
}


//counter for doctypes
var n = 0;
function count(){
    n++;
    return n-1;
}



//
//
// DocTypes beyond this point DO-NOT-MODIFY
//
//

documentDE = (name) => {
    return `1************************************************************************************
2*********Datensatz für das Bauteil: ${name}
3************************************************************************************
4******************************DMC Patrone Einstellungen********************************
5******Anwahl DMC Patrone:
${DataMod[count()]}
7******Anwahl DMC 1 Patrone:
${DataMod[count()]}
9*****Soll DMC 1:
${DataMod[count()]}
11******Scannen bei Spanner 1 zu:
${DataMod[count()]}
13*****Anwahl DMC 2 Patrone:
${DataMod[count()]}
15*****Soll DMC 2:
${DataMod[count()]}
17******Scannen bei Spanner 2 zu:
${DataMod[count()]}
19*****Anwahl DMC 3 Patrone:
${DataMod[count()]}
21*****Soll DMC 3:
${DataMod[count()]}
23******Scannen bei Spanner 3 zu:
${DataMod[count()]}
25******************Wechselteile Einstellungen********************
26*****Anwahl RFID Code:
${DataMod[count()]}
28*****Anwahl RFID Vorrichtung:
${DataMod[count()]}
30*****Soll RFID Code:
${DataMod[count()]}
32*****Anwahl RFID Wechselteil 1:
${DataMod[count()]}
34*****Soll RFID Code:
${DataMod[count()]}
36*****Anwahl RFID Wechselteil 2:
${DataMod[count()]}
38*****Soll RFID Code:
${DataMod[count()]}
40*****Anwahl RFID Wechselteil 3:
${DataMod[count()]}
44*****Soll RFID Code:
${DataMod[count()]}
46*****Anwahl RFID Wechselteil 4:
${DataMod[count()]}
48*****Soll RFID Code:
${DataMod[count()]}
50*****Anwahl RFID Wechselteil 5:
${DataMod[count()]}
52*****Soll RFID Code:
${DataMod[count()]}
54*****Anwahl RFID Wechselteil 6:
${DataMod[count()]}
56*****Soll RFID Code:
${DataMod[count()]}
58*****Anwahl RFID Wechselteil 7:
${DataMod[count()]}
60*****Soll RFID Code:
${DataMod[count()]}
62*****Anwahl RFID Wechselteil 8:
${DataMod[count()]}
64*****Soll RFID Code:
${DataMod[count()]}
66*****Anwahl RFID Wechselteil 9:
${DataMod[count()]}
68*****Soll RFID Code:
${DataMod[count()]}
70********************Beistellteile Einstellungen********************
71*****Anwahl DMC Beistellteile:
${DataMod[count()]}
73*****Anwahl DMC Beistellteil 1:
${DataMod[count()]}
75*****Code:
${DataMod[count()]}
77*****Anwahl DMC Beistellteil 2:
${DataMod[count()]}
79*****Code:
${DataMod[count()]}
81*****Anwahl DMC Beistellteil 3:
${DataMod[count()]}
83*****Code:
${DataMod[count()]}
85*****Anwahl DMC Beistellteil 4:
${DataMod[count()]}
87*****Code:
${DataMod[count()]}
89*****Anwahl DMC Beistellteil 5:
${DataMod[count()]}
91*****Code:
${DataMod[count()]}
93*****Anwahl DMC Beistellteil 6:
${DataMod[count()]}
95*****Code:
${DataMod[count()]}
97*****Anwahl DMC Beistellteil 7:
${DataMod[count()]}
99*****Code:
${DataMod[count()]}
101*****Anwahl DMC Beistellteil 8:
${DataMod[count()]}
103*****Code:
${DataMod[count()]}
105*****Anwahl DMC Beistellteil 9:
${DataMod[count()]}
107****Code:
${DataMod[count()]}
109****Anwahl DMC Beistellteil 10:
${DataMod[count()]}
111****Code:
${DataMod[count()]}
113********************Roboter Einstellungen********************
114****Teilenummer:
${DataMod[count()]}
116********************Drucker Einstellungen********************
117****Anwahl Labeldrucker:
${DataMod[count()]}
119****Labelnummer :
${DataMod[count()]}
121********************Teilekontrolle Einstellungen********************
122****Anwahl Teilekontrolle:
${DataMod[count()]}
124****Anwahl Teilekontrolle 3.0:
${DataMod[count()]}
126****Anwahl Teilekontrolle 3.1:
${DataMod[count()]}
128****Anwahl Teilekontrolle 4.0:
${DataMod[count()]}
130********************Infozeilen & Setup Einstellungen********************
131*********************Infozeile max. mit 25 Zeichen *********************
132****Zeile 1:
${DataMod[count()]}
134****Zeile 2:
${DataMod[count()]}
136****Zeile 3:
${DataMod[count()]}
138****Zeile 4:
${DataMod[count()]}
140****Zeile 5:
${DataMod[count()]}
142****Zeile 6:
${DataMod[count()]}
144****Freigabe automatisch Lösen:
${DataMod[count()]}
146****Mit Hydraulik:
${DataMod[count()]}
148****Handvorrichtung:
${DataMod[count()]}
150****Laufzeit bis Schwimmstellung:
${DataMod[count()]}
152****Handfunktion vor dem Start:
${DataMod[count()]}
154****Handfunktion nach dem Start:
${DataMod[count()]}
156************************************************************************************
157******************************************Ende**************************************
158************************************************************************************
`;
}

documentEN = () => {
return `Enable DMC Scans:,,,${DataMod[count()]},(on/off)
Activate Scan 1:,,,${DataMod[count()]},(on/off)
DMC 1 Input:,,,${DataMod[count()]},
Scan with Clamping:,,,${DataMod[count()]},(on/off)
Activate Scan 2:,,,${DataMod[count()]},(on/off)
DMC 2 Input:,,,${DataMod[count()]},
Scan with Clamping:,,,${DataMod[count()]},(on/off)
Activate Scan 3:,,,${DataMod[count()]},(on/off)
DMC 3 Input:,,,${DataMod[count()]},
Scan with Clamping:,,,${DataMod[count()]},(on/off)
Activate RFID Code:,,,${DataMod[count()]},(on/off)
Activate RFID for Jig:,,,${DataMod[count()]},(on/off)
SBM RFID code:,,,${DataMod[count()]},
Activate RFID Exchange Piece 1:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate RFID Exchange Piece 2:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate RFID Exchange Piece 3:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate RFID Exchange Piece 4:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate RFID Exchange Piece 5:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate RFID Exchange Piece 6:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate RFID Exchange Piece 7:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate RFID Exchange Piece 8:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate RFID Exchange Piece 9:,,,${DataMod[count()]},(on/off)
Exchange Piece RFID:,,,${DataMod[count()]},
Activate Additional DMC scan:,,,${DataMod[count()]},(on/off)
Activate Additional DMC 1:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 1:,,,${DataMod[count()]},
Activate Additional DMC 2:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 2:,,,${DataMod[count()]},
Activate Additional DMC 3:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 3:,,,${DataMod[count()]},
Activate Additional DMC 4:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 4:,,,${DataMod[count()]},
Activate Additional DMC 5:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 5:,,,${DataMod[count()]},
Activate Additional DMC 6:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 6:,,,${DataMod[count()]},
Activate Additional DMC 7:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 7:,,,${DataMod[count()]},
Activate Additional DMC 8:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 8:,,,${DataMod[count()]},
Activate Additional DMC 9:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 9:,,,${DataMod[count()]},
Activate Additional DMC 10:,,,${DataMod[count()]},(on/off)
Aditional DMC Code 10:,,,${DataMod[count()]},
Robot Job Number:,,,${DataMod[count()]},
Enable Printer:,,,${DataMod[count()]},(on/off)
Printer Job Number :,,,${DataMod[count()]},
Enable Part/Clamping Control:,,,${DataMod[count()]},(on/off)
Part and Clamping Control: 3.0:,,,${DataMod[count()]},(on/off)
Part and Clamping Control: 3.1:,,,${DataMod[count()]},(on/off)
Part and Clamping Control: 4.0:,,,${DataMod[count()]},(on/off)
Job Information Line 1:,,,${DataMod[count()]},(LIMIT: 25 CHARACTERS)
Job Information Line 2:,,,${DataMod[count()]},(LIMIT: 25 CHARACTERS)
Job Information Line 3:,,,${DataMod[count()]},(LIMIT: 25 CHARACTERS)
Job Information Line 4:,,,${DataMod[count()]},(LIMIT: 25 CHARACTERS)
Job Information Line 5:,,,${DataMod[count()]},(LIMIT: 25 CHARACTERS)
Job Information Line 6:,,,${DataMod[count()]},(LIMIT: 25 CHARACTERS)
Automatic Unclamp:,,,${DataMod[count()]},(on/off)
Activate Hydraulic:,,,${DataMod[count()]},(on/off)
Activate Manual Clamping:,,,${DataMod[count()]},(on/off)
Unclamp Delay:,,,${DataMod[count()]},
Manual Clamp Before Start:,,,${DataMod[count()]},(on/off)
Manual Unclamp After Start:,,,${DataMod[count()]},(on/off)`;
}