const textarea = document.querySelector("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.querySelector("button");
let synth = speechSynthesis,  //interface
isSpeaking = true;
voices();
function voices(){ // getVoices gives voices of interface
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";  // selecting default 
        // creating an option tag passing voice name and voice lnguage
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option); // inserting option tag beforeend
    }
}
synth.addEventListener("voiceschanged", voices);
function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);  // send request
    for(let voice of synth.getVoices()){
        // available voice = selected voice then set speech voice to user selected voice
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance); // set request in queue
}
speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){ //if speech is not using
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Convert To Speech";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }else{
            speechBtn.innerText = "Convert To Speech";
        }
    }
});
// to calculate the indixes of given array use sum of the elements equal to the given target
