window.addEventListener("DOMContentLoaded", (event) => {
	let codeEditor = document.getElementById("codeEditor");
	let lineCounter = document.getElementById("lineCounter");
	let codeRunner = document.getElementById("codeRunner");
	let dark = document.getElementById("dark");
	let defoult = "dark";
	let body = document.getElementById("body");
	let keys = [];

	// ====================================== ALL EVENT LISTENERS ======================================
	// LISTEN INPUT EVENTS TO CODEEDITOR
	codeEditor.addEventListener("input", () => {
		tabCodes();
		line_counter();
		writeCode();
	});

	// MOVE COUNTERBAR WHEN SCROL CODEEDITOR
	codeEditor.addEventListener("scroll", () => {
		lineCounter.scrollTop = codeEditor.scrollTop;
		lineCounter.scrollLeft = codeEditor.scrollLeft;
	});

	// LAY SPACES WHEN CLICKED TAB
	codeEditor.addEventListener("keydown", (e) => {
		let { keyCode } = e;
		console.log(keys);
		let { value, selectionStart, selectionEnd } = codeEditor;
		keys.push(keyCode);
		if (keyCode === 9) {
			e.preventDefault();
			codeEditor.value =
				value.slice(0, selectionStart) + "    " + value.slice(selectionEnd);
			codeEditor.setSelectionRange(selectionStart + 2, selectionStart + 2);
		}
	});
	// DARK-LIGHT BUTTON
	dark.addEventListener("click", () => {
		let remAdd = (nomi, classAdd, classRe) => {
			nomi.classList.add(`${classAdd}`);
			nomi.classList.remove(`${classRe}`);
		};
		let light1 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-brightness-high" viewBox="0 0 16 16"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/></svg>  LIGHT`;
		let dark1 = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16"><path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/><d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.734 1.734 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.734 1.734 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.734 1.734 0 0 0 1.097-1.097l.387-1.162zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L13.863.1z"/></svg>  DARK`;
		if (defoult == "dark") {
			dark.innerHTML = dark1;
			remAdd(dark, "btn-dark", "btn-warning");
			remAdd(codeEditor, "lightEditor", "darkEditor");
			remAdd(codeRunner, "lightEditor", "darkEditor");
			body.style.backgroundImage = 'url("./back.png")';
			defoult = "light";
		} else {
			dark.innerHTML = light1;
			remAdd(dark, "btn-warning", "btn-dark");
			remAdd(codeEditor, "darkEditor", "lightEditor");
			remAdd(codeRunner, "darkEditor", "lightEditor");
			body.style.backgroundImage = 'url("./nightBack.png")';
			defoult = "dark";
		}
	});
	// ====================================== LINE COUNTER ======================================
	let lineCountCache = 0;
	function line_counter() {
		let lineCount = codeEditor.value.split("\n").length;
		let outarr = new Array();
		if (lineCountCache != lineCount) {
			for (let x = 0; x < lineCount; x++) {
				outarr[x] = x + 1 + ".";
			}
			lineCounter.value = outarr.join("\n");
		}
		lineCountCache = lineCount;
	}
	// ====================================== REPLACE CODE WITH SPACE ======================================
	// ====================================== e.g/ clg => console.log ======================================
	function tabCodes() {
		codeEditor.value = codeEditor.value.replace(/frz/g, `Farruxbek zo'r bola`);
		let oxiri = (i) => codeEditor.value[codeEditor.value.length - i];
		let cursorPos = (i, j) => {
			codeEditor.selectionStart = codeEditor.selectionEnd - i;
			codeEditor.selectionEnd = codeEditor.selectionEnd - i;
		};
		if (
			oxiri(1) == " " &&
			oxiri(2) == "r" &&
			oxiri(3) == "o" &&
			oxiri(4) == "f"
		) {
			codeEditor.value += "(let i = 0; i < count; i++){\n\n}";
		}
		if (codeEditor.value.includes("clg ")) {
			codeEditor.value = codeEditor.value.replace(/clg/g, "console.log('');");
			cursorPos(4);
		}
		if (codeEditor.value.includes("log ")) {
			codeEditor.value = codeEditor.value.replace(/log/g, "console.log('');");
			cursorPos(4);
		}
		if (oxiri(1) == " " && oxiri(2) == "f" && oxiri(3) == "i") {
			codeEditor.value += "	(){\n\n}";
			cursorPos(5, 6);
		}
		if (
			oxiri(1) == " " &&
			oxiri(2) == "h" &&
			oxiri(3) == "c" &&
			oxiri(4) == "t" &&
			oxiri(5) == "i" &&
			oxiri(6) == "w" &&
			oxiri(7) == "s"
		) {
			codeEditor.value += `() {\n\tcase value:\n\t\tbreak;\n\tdefault:\n\t\tbreak;\n}`;
			cursorPos(8);
		}
		if (
			oxiri(1) == " " &&
			oxiri(2) == "c" &&
			oxiri(3) == "n" &&
			oxiri(4) == "u" &&
			oxiri(5) == "f"
		) {
			codeEditor.value = codeEditor.value.replace(/func /g, "function(){\n\n}");
			cursorPos(5, 9);
		}
		if (oxiri(1) == "{" && keys[keys.length - 2] != 8) {
			codeEditor.value += "}";
		} else if (oxiri(1) == "(") {
			codeEditor.value += ")";
		} else if (oxiri(1) == "[") {
			codeEditor.value += "]";
		} else if (oxiri(1) == "{") {
			codeEditor.value += "}";
		} else if (oxiri(1) == '"') {
			codeEditor.value += '"';
			cursorPos(1, 1);
		}
		if (keys[keys.length - 1] === 13 && keys[keys.length - 2] == 17) {
			codeEditor.value = codeEditor.value.replace(/;/g, ";\n");
		}
	}
	// ====================================== MAIN SECTION ======================================
	function writeCode() {
		let javob = "OUTPUT : \n\n";
		function myLog(smth) {
			if (Array.isArray(smth)) {
				javob += `[${smth}]\n`;
			} else {
				javob += smth + "\n";
			}
		}
		let res = codeEditor.value.replace(/console.log/g, `myLog`);
		//  SET COLOR CODERUNNER WHEN YOU GET ERROR
		try {
			codeRunner.style.background = "";
			codeRunner.style.color = "";
			res = eval(`${res}`);
			codeRunner.innerHTML = javob;
		} catch (err) {
			codeRunner.style.background = "rgb(255, 50, 50)";
			codeRunner.innerHTML = err;
		}
	}
});
