class StyleBox {
    constructor(style) {
        this.font = style.font;

        this.selectedSize = style.selectedSize;
        this.size = style.size || 12;

        this.color = style.color;
        this.selectedColor = style.selectedColor;
        this.applyTo = style.applyTo;

        this.makeDiv();
        this.update();
    }

    makeDiv() {
        this.elt = document.createElement("div");
        this.elt.className = "innerDiv";
        this.elt.innerHTML = `
        Apply to:
        <button class="deleteStyle" style="font-size:15px;float:right">-</button>
        <br>
        <select class="applyToSelect">
            <option value="all" >All</option>
            <option value="head">Headings</option>
            <option value="para" >Paragraphs</option>
            <option value="link" >links</option>
            <option value="input">Inputs</option>
            <option value="list" >List Items</option>
            <option value="strong">Bold</option>
            <option value="ital">Italics</option>
            <option value="sup">Superscripts</option>
            <option value="code">Code</option>
        </select>
        <br><br>
        Choose Font:
        <br>
        <select class="dropdown">
            <option value="Default" > --Default-- </option>
            <option value="Custom" > --Add Font-- </option>
        </select>
        <br>
        <div class="hide" style="display: none">
            <br>
            Font: <input class="customFont">
            <br>
            Link: <input class="customLink">
            <button class="addFont">Add</button>
        </div>
        <br>
        Choose Size:
        <br>
        <form class="sizeForm">
            <input type="radio" value="Custom" class="selectNumber sizeFormOption"><input type="number" class="setNumber" min="0" max="300">px<br>
            <input type="radio" value="Random" class="randomSize sizeFormOption">Random<br>
            <input type="radio" value="" class="defaultSize sizeFormOption" checked>Default<br>
        </form>
        <br><br>
        Choose Color:
        <br>
        <form class="colorForm">
            <input type="radio" value="Custom" class="selectColor colorFormOption">
            <input type="color" class="setColor">
            <br>
            <input type="radio" value="Random" class="randomCol colorFormOption">Random
            <br>
            <input type="radio" value="" class="defaultCol colorFormOption" checked>Default
            <br><br>
        </form>`;

        this.deleteStyle = this.elt.getElementsByClassName("deleteStyle")[0];
        this.applyToSelect = this.elt.getElementsByClassName("applyToSelect")[0];

        this.dropdown = this.elt.getElementsByClassName("dropdown")[0];

        for (let elt of presetFonts) {
            if (doesFontExist(presetFonts[presetFonts.indexOf(elt)]) || rels.includes(presetFonts[presetFonts.indexOf(elt)])) {
                let newOpt = document.createElement("option");
                newOpt.innerText = elt;
                newOpt.value = elt;
                this.dropdown.appendChild(newOpt);
            }
        }

        this.hide = this.elt.getElementsByClassName("hide")[0];
        this.customFont = this.elt.getElementsByClassName("customFont")[0];
        this.customLink = this.elt.getElementsByClassName("customLink")[0];
        this.addFont = this.elt.getElementsByClassName("addFont")[0];
        this.sizeForm = this.elt.getElementsByClassName("sizeForm")[0];
        this.selectNumber = this.elt.getElementsByClassName("selectNumber")[0];
        this.setNumber = this.elt.getElementsByClassName("setNumber")[0];
        this.randomSize = this.elt.getElementsByClassName("randomSize")[0];
        this.defaultSize = this.elt.getElementsByClassName("defaultSize")[0];
        this.colorForm = this.elt.getElementsByClassName("colorForm")[0];
        this.selectColor = this.elt.getElementsByClassName("selectColor")[0];
        this.setColor = this.elt.getElementsByClassName("setColor")[0];
        this.randomCol = this.elt.getElementsByClassName("randomCol")[0];
        this.defaultCol = this.elt.getElementsByClassName("defaultCol")[0];

        this.colorFormOptions = document.getElementsByClassName("colorFormOption");
        this.sizeFormOptions = document.getElementsByClassName("sizeFormOption");
    }

    update() {
        this.applyToSelect.value = this.applyTo;
        this.dropdown.value = this.font || "Default";
        this.setColor.value = this.color || "";
        this.setNumber.value = this.size || 12;

        this.selectNumber.checked = this.selectNumber.value == this.selectedSize;
        this.randomSize.checked = this.randomSize.value == this.selectedSize;
        this.defaultSize.checked = this.defaultSize.value == this.selectedSize;

        this.selectColor.checked = this.selectColor.value == this.selectedColor;
        this.randomCol.checked = this.randomCol.value == this.selectedColor;
        this.defaultCol.checked = this.defaultCol.value == this.selectedColor;
    }

    send() {
        this.applyTo = this.applyToSelect.value;
        this.font = this.dropdown.value;
        this.color = this.setColor.value;
        this.size = this.setNumber.value;
    }
}
