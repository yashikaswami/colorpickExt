const colorPickerBtn = document.querySelector("#color-picker");
const colorList = document.querySelector(".all-colors")
const pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");
const clearAll = document.querySelector(".clear-all")

const copyColor = e=>{
     navigator.clipboard.writeText(e.dataset.color);
     e.innerHTML = "Copied";
     setTimeout(()=> e.innerHTML = e.dataset.color, 300)
}

const showColors = () =>{
    if(!pickedColors.length){
        return
    }
    colorList.innerHTML = pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color}; border: 0.5px solid black;"></span>
            <span class="value" data-color="${color}">${color}</span>
        </li>
        `
    ).join("");

    document.querySelector(".picked-colors").classList.remove("hide");

    document.querySelectorAll(".color").forEach(li =>{
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild))
    })
    
};


const activateEyeDropper = async ()=>{
    try{
        const eyeDropper = new EyeDropper();
        const {sRGBHex}  = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);

        /*to remove the duplicate colors from the list*/
        if(!pickedColors.includes(sRGBHex)){
            
            pickedColors.push(sRGBHex);
            localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
            showColors();
}


    }

    catch(error){
        console.log(error)
    }
}

const clearAllColors = ()=>{
    pickedColors.length  = 0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors)
colorPickerBtn.addEventListener("click", activateEyeDropper)

showColors();


