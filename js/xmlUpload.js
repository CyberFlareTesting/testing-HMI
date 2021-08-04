const fileSelector = document.getElementById('file-selector')
const reader2 = new FileReader()
let file, newFile = "", xmlname = ""

//gets file after user input
fileSelector.addEventListener('change', (evt) => {
    file = evt.target.files[0] 
    xmlname = file.name   
        reader2.onload = function (e) {
            start(e.target.result)
        };
        reader2.readAsText(file);
});

function start(txt){
try{
    if (window.DOMParser){
        console.log("using DOMParser")
        parser = new DOMParser()
        xml = parser.parseFromString(txt,"text/xml")
    }else{
        console.log("your browser is too outdated")
    }

    //routes
    var barcode = xml.getElementsByTagName("PRG")
    var additional = xml.getElementsByTagName("additional_signal")
    var screwdriver = xml.getElementsByTagName("screw_driver")[0].getElementsByTagName("screw_driver")
    var fixture = xml.getElementsByTagName("fixture")
    var labelPrinter = xml.getElementsByTagName("printer")
    var SingleParts = xml.getElementsByTagName("single_parts")[0].getElementsByTagName("single_part")
    var dynCtrl = xml.getElementsByTagName("dyn_partctrl")[0].getElementsByTagName("dyn_partctrl")
    var fixH = xml.getElementsByTagName("preclamp")[0].getElementsByTagName("preclamp")
    var clamps = xml.getElementsByTagName("clamp")[0].getElementsByTagName("clamp")
    var seqSteps = xml.getElementsByTagName("seq")[0].getElementsByTagName("step")
}catch(e){
    console.error(e)
    alert("please enter a valid file of type xml")
    return false
}

// ------ // PROGRAM // ------ //
    let prog = (`Program,\r\n`
    + `,Name:,${xml.getElementsByTagName("name")[0].textContent}\r\n`
    + `,Prog#:,${barcode[0].getAttribute("id")}\r\n`
    + `,Item# csv:,${xml.getElementsByTagName("part_nr_csv")[0].textContent}\r\n`
    + `,Item# caq:,${xml.getElementsByTagName("part_nr_caq")[0].textContent}\r\n`
    + `,Machine#:,${xml.getElementsByTagName("machine_nr")[0].textContent}\r\n`
    + `,Client #:,${xml.getElementsByTagName("customer_nr")[0].textContent}\r\n`
    + `,Protocol:,${(barcode[0].getAttribute("protocol")=="-1")? "Y": "N"}\r\n`
    + `,With ack:,${(barcode[0].getAttribute("quit")=="-1")? "Y": "N"}\r\n`)

// ------ // BARCODE // ------ //
    let bar = (`\r\n`
    + `Start-barcode\r\n`
    + `,Barcode: ${barcode[0].getAttribute("barcode")}\r\n`
    + `,CtrlScan:,${(barcode[0].getAttribute("control_scan")=="-1")? "Y": "N"}\r\n`
    + `,Clamped:,${(barcode[0].getAttribute("clamped")=="-1")? "Y": "N"}\r\n`)

// ------ // ADDITIONAL SIGNALS/VALUES // ------ //
    let add = ()=>{
        var values = "\r\nAdditional signals/values\r\n", bools = additional[0].getElementsByTagName("bool"), ints = additional[0].getElementsByTagName("int");
        for (var i = 0; i < bools.length; i++){
            values += `,Bool-${i+1}:,${((bools[i].getAttribute("value")!="0")? "Y": "N")},Int-${i+1}:,${ints[i].getAttribute("value")}\r\n`
        }
        return values
    }

// ------ // SCREWDRIVER // ------ //
    let screw = ()=>{
        var values = `\r\nScrewdriver,,active,quantity\r\n`
        for (var i = 0; i < screwdriver.length; i++){
            values += `,${i+1}-,${(screwdriver[i].getAttribute("active")==-1)? "Y": "N"},${screwdriver[i].getAttribute("quantity")}\r\n`
        }
        return values
    }

// ------ // Universal outputs // ------ //
    let uniout = () => {
        uni = barcode[0].getElementsByTagName("uni_outputs")
        row1 = FindFB(uni[0].getAttribute("mask_1_8"), 8)
        row2 = FindFB(uni[0].getAttribute("mask_9_16"), 8)
        return ("\r\nUniversal outputs\r\n," + row1 + "\r\n," + row2 + "\r\n")
    }

// ------ // FIXTURE // ------ //
    let fix = (`\r\n`
    + `Fixture\r\n`
    + `,ID:,${fixture[0].getAttribute("id")}\r\n`
    + `,Name:,${fixture[0].getElementsByTagName("nameE")[0].textContent}\r\n`
    + `,Code:,${fixture[0].getAttribute("code")}\r\n`
    + `,Hydraulic:,${(fixture[0].getAttribute("hydraulic")!="0")? "Y": "N"}\r\n`
    + `,Air:,${(fixture[0].getAttribute("air")!="0")? "Y": "N"}\r\n`
    + `,Gas:,${(fixture[0].getAttribute("gas")!="0")? "Y": "N"}\r\n`
    + (() => {
        var StationActivity = "", temp = fixture[0].getElementsByTagName("station")[0].getElementsByTagName("station");
        for (var i = 0; i < temp.length; i++){
            StationActivity += `,Station ${i+1}:,${(temp[i].getAttribute("active")  == -1)? "Y": "N"}\r\n`
        }
        return StationActivity
    })())

// ------ // COMMON PART CONTROLS // ------ //
    let comprt = () => {
        com = barcode[0].getElementsByTagName("preset_request")
        row1 = FindFB(com[0].getAttribute("mask_1_16"), 16)
        row2 = FindFB(com[0].getAttribute("mask_17_32"), 16)
        row3 = FindFB(com[0].getAttribute("mask_33_48"), 16)
        return ("\r\nCommon Part Controls\r\n," + row1 + "\r\n," + row2 + "\r\n," + row3 + "\r\n")
    }

// ------ // Active // ------ //
    let act = () => {
        var partActivity = `\r\nActive,,,active,RFID\r\n`, temp = fixture[0].getElementsByTagName("parts")[0].getElementsByTagName("part");
        for (var i = 0; i < temp.length; i++){
            partActivity += `,RFID exchng. part ${i+1},,${(temp[i].getAttribute("active")  == -1)? "Y":"N"},${temp[i].getAttribute("tag")}\r\n`
        }
        return partActivity;
    }

// ------ // Label Printer // ------ //
    let labpr = (`\r\nLabel Printer\r\n`
    + `,Active:,${(labelPrinter[0].getAttribute("active")!="0")? "Y": "N"}\r\n`
    + `,Series Prt:,${(labelPrinter[0].getAttribute("series_part")!="0")? "Y": "N"}\r\n`
    + `,Type:,${labelPrinter[0].getAttribute("type")}\r\n`
    + `,Print before:,,${(labelPrinter[0].getAttribute("before_welding")!="0")? "Y": "N"}\r\n`)
    
// ------ // Single part // ------ //
    let singlepart = () => {
        temp = `\r\nSingle Parts,,active,unique,scan after,barcode,,,,mask\r\n`
        for (var j = 0; j<SingleParts.length; j++){     
            temp += `,part ${j+1}:,${(SingleParts[j].getAttribute("active")!="0")? "Y": "N"},${(SingleParts[j].getAttribute("check")!="0")? "Y": "N"},${(SingleParts[j].getAttribute("clamped")!="0")? "Y": "N"},${SingleParts[j].getAttribute("barcode")},,,,${SingleParts[j].getAttribute("mask")}\r\n`
        }
        return temp
    }

// ------ // Dynamic Part // ------ //
    let dynpart = () => {
        let temp = `\r\nDynamic Part Ctrls,,,priority,open fb,,,,,close fb,,,,1/O\r\n`
        let conv = ["", 0, 1]
        for (var i = 0; i<dynCtrl.length; i++){
            temp += `,,part ${i+1}:,${dynCtrl[i].getAttribute("prio")},${FindFB(dynCtrl[i].getAttribute("fb_mask"), 8, true)},${conv[dynCtrl[i].getAttribute("type")]}\r\n`
        }
        return temp
    }

// ------ // Fixed Holds // ------ //
    let fixedhold = () => {
        let temp = `\r\nFixed Holds,,open fb,,,,,close fb\r\n`
        for (var i = 0; i<fixH.length; i++){
            temp += `,preclp ${i+1}:,${FindFB(fixH[i].getAttribute("fb_mask"), 8, true)}\r\n`
        }
        return temp
    }


// ------ // clampers // ------ //
    let clampers = () => {
        let temp = `\r\nClampers,,open fb,,,,,close fb,,,,,float,,Part Ctrl`
        for (var i = 0; i<clamps.length; i++){
            temp += `\r\n,Clamp ${i+1}:,${FindFB(clamps[i].getAttribute("fb_mask"), 8, true)},,${(clamps[i].getAttribute("type")!=0)? "Y": "N"},,${(()=>{
                let row1 = FindFB(clamps[i].getElementsByTagName("preset_request")[0].getAttribute("mask_1_16"), 16)
                let row2 = FindFB(clamps[i].getElementsByTagName("preset_request")[0].getAttribute("mask_17_32"), 16)
                let row3 = FindFB(clamps[i].getElementsByTagName("preset_request")[0].getAttribute("mask_33_48"), 16)
                return (row1 + "\r\n,,,,,,,,,,,,,," + row2 + "\r\n,,,,,,,,,,,,,," + row3)
            })()}\r\n`
        }
        return temp
    }

// ----- // fixed stop seq // ----- //
    let fixedSeq = () => {
        let temp = `\r\nFixed Stops Seq.\r\n,priority,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16`
        for (var i=0; i<fixH.length; i++){
            let opnMask = FindFB(fixH[i].getAttribute("open_seq_mask"), 16).split(",")
            let clsMask = FindFB(fixH[i].getAttribute("close_seq_mask"), 16).split(",")
            temp += `\r\n,preclp ${i+1}:`
            for (var j=0; j<16; j++){
                temp+= `,${(opnMask[j] == "Y")? "Open": (clsMask[j] == "Y")? "Close": ""}`
            }
        }
        return temp+"\r\n"
    }

// ----- // clamp seq // ----- //
    let clampSeq = () => {
        let temp = `\r\nClamp Seq.,,\r\n,priority,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16\r\n,position`
        for (var j=0; j<16; j++){
            temp+= `,${seqSteps[j].getAttribute("pos")}`
        }
        temp+="\r\n"
        for (var i=0; i<fixH.length; i++){
            let opnMask = FindFB(clamps[i].getAttribute("open_seq_mask"), 16).split(",")
            let clsMask = FindFB(clamps[i].getAttribute("close_seq_mask"), 16).split(",")
            temp += `\r\n,clamp ${i+1}:`
            for (var j=0; j<16; j++){
                temp+= `,${(opnMask[j] == "Y")? "Open": (clsMask[j] == "Y")? "Close": ""}`
            }
        }
        return temp+"\r\n"
    }

    var doc = prog+bar+add()+screw()+uniout()+fix+comprt()+act()+labpr+singlepart()+dynpart()+fixedhold()+clampers()+fixedSeq()+clampSeq()
    var a = document.getElementById("download")
    var file = new Blob([doc])
    a.href = URL.createObjectURL(file)
    a.download = xmlname + ".csv"
    
console.log(prog+bar+add()+screw()+uniout()+fix+comprt()+act()+labpr+singlepart()+dynpart()+fixedhold()+clampers()+fixedSeq()+clampSeq())
}

function FindFB(x, size, splitByte){
    splitByte = (splitByte==undefined)? false: splitByte;
    let temp = [], bin = (parseInt(x).toString(2))
    if (bin.length < size){
        for(x=0; 0!=(size-bin.length); x++){
            bin = "0" + bin
        }
    }
    var arr = bin.split("")
    if(size!=16){
        for(x=0; x<(size/4); x++){
            n = x*4
            temp = temp.concat([arr[n+3], arr[n+2], arr[n+1], arr[n+0]]) 
        }
    }else{
        temp = arr.reverse()
    }
    
    for(var y = 0; y<temp.length; y++){
        temp[y] = (temp[y].includes("0"))? "N": "Y"
    }
    if (splitByte){temp[3] += ","}
    return temp.join(",")
}