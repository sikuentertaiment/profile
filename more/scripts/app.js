// define the root
const root = document.querySelector('#root');
// define the pages
const pages = document.querySelectorAll('.onepage');
// define the target
const targets = document.querySelectorAll('#label');
let displayIndex = 0;
// tell the end of the page
const pageEnd = pages.length - 1;
const walking = (index,labels,target,time=1000,delays=1000)=>{
	let intervalId;
	let oi = 0;
	let ii = 0;
	const oiend = labels.length;
	let iiend = labels[oi].length;
	let char = labels[oi][ii];
	const display = (char)=>{
		target.innerHTML += char;
		ii += 1;
		if(ii === iiend){
			// delay
			delay();
		}
	}
	const deletE = ()=>{
		target.innerHTML = '- ';
	}
	const run = ()=>{
		intervalId = setInterval(()=>{
			if(displayIndex !== index){
				oi = 0;
				ii = 0;
				char = labels[oi][ii];
				iiend = labels[oi].length;
				deletE();
				return;
			}
			char = labels[oi][ii];
			display(char);
		},time);
	}
	const delay = ()=>{
		clearInterval(intervalId);
		setTimeout(()=>{
			deletE();
			ii = 0;
			oi += 1;
			if(oi === oiend){
				oi = 0;
			}
			iiend = labels[oi].length;
			char = labels[oi][ii];
			display(char);
			run();
		},delays);
	}
	display(char);
	run();
}

// walking on all target
targets.forEach((target,i)=>{
	walking(i,labels[i],target,100);
})
// working on the nav buttons
const controllSetup = ()=>{
	const buttons = document.querySelectorAll('.button');
	const controlls = {
		// working on simple infinite action
		// no limit
		up(){
			if(displayIndex === 0)
				return displayIndex = pageEnd;
			displayIndex -= 1;
		},
		down(){
			if(displayIndex === pageEnd)
				return displayIndex = 0;
			displayIndex += 1;
		},
		show(){
			pages[displayIndex].scrollIntoView();
		}
	}
	// loop all button, give it click event
	buttons.forEach((button)=>{
		button.onclick = ()=>{
			controlls[button.id]();
			controlls.show({behavior:'smooth'});
		}
	})
}
controllSetup();