let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');

function guess() {
	if(!answer.value) setHiddenFields(); 
    let input = document.getElementById('user-guess');
    if(!validateInput(input.value)) return false;
    attempt.value=parseInt(attempt.value)+1;
    if(getResults(input.value)) { setMessage("You Win! :)"); showAnswer(true);   }
    else if(attempt.value>=10)  { setMessage("You Lose! :("); showAnswer(false); }
    else setMessage("Incorrect, try again.");
    
}
function showAnswer(win){
	let out = document.getElementById('code');
	out.innerHTML="<strong>"+answer.value+"</strong>";
	out.className=win?"code success":"code failure";
	showReplay();
}

function showReplay(){
	document.getElementById('guessing-div').style.display='none';	
	document.getElementById('replay-div').style.display='block';	
}

function getResults(inp){
	let res = document.getElementById('results'),cnt=0,c,i,len=inp.length,v=answer.value,
		o='<div class="row"><span class="col-md-6">' + inp + '</span><div class="col-md-6">';
	for(i=0;i<len;i++){
		c=inp.charAt(i);
		if(c==v.charAt(i)) { cnt++; o+='<span class="glyphicon glyphicon-ok"></span>'; }
		else if (v.indexOf(c)<0) o+='<span class="glyphicon glyphicon-remove"></span>';
		else o+='<span class="glyphicon glyphicon-transfer"></span>';
	}
	res.innerHTML=res.innerHTML+o+'</div></div>';
	return (cnt==len);
}

function setHiddenFields(){
	let a=Math.floor(Math.random()*9999).toString();
	while(a.length<4) a='0'+a;
	answer.value=a;
	attempt.value=0;
}

function setMessage(a){	message.innerHTML=a; }

function validateInput(inp){
	let m=inp.length==4?'':"Guesses must be exactly 4 characters long.";
	setMessage(m);
	return m=='';
}
