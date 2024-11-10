function define(){
    text = window.getSelection().toString();
    if(text.length == 0){return;}
    //make popup appear
    let defineBox = document.getElementById('defineBoxContent')
    if(!defineBox){
        defineBox = document.createElement('div');
        defineBox.id = 'defineBoxContent';
    }
    defineBox.innerText = lookUp(text)
    defineBox.style.display = 'block';
    defineBox.style.position = 'absolute'; // Make sure it's visible
    defineBox.style.backgroundColor = 'white'; // Add a background color
    defineBox.style.border = '1px solid black'; // Add a border for visibility
    defineBox.style.padding = '10px'; // Add some padding
    defineBox.style.zIndex = '9999'; // Ensure it's on top of other elements
    
    const rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
    defineBox.style.left = `${rect.left}px`;
    defineBox.style.top = `${rect.bottom + window.scrollY}px`;
    document.body.appendChild(defineBox);
    console.log(defineBox)
    document.addEventListener('selectionchange', () => {
        defineBox.style.display = 'none';
    })
    
}

function lookUp(text){
    //find given word(s) in dictionary
    //tokenize words

    var result = [];
    var words = tokenize(text);
    for(i = 0; i < words.length; i++){
        let word = words[i];
        let entry = dictionary[word];
        console.log(dictionary[word])
        result.push(entry);
    }
    console.log("looked up :" + words[0])
    return result;
}

function tokenize(text){
    var words = []
    console.log("text: " + text);
    for (char in text){
        words.push(text[char]);
        console.log("logged:" + text[char]);
    }
    return words;
}

function queueForLearning(){
//adds word to the user's learning list

words = window.getSelection().toString();
/*chrome.storage.sync.get(["targetLanguages"], (result) =>
    console.log("Target Languages retrieved")
);
if(not(detectLanguage(text) in result.targetLanguages)){
   return -1;
}
*/
return null;

//get context to generate learning tasks
}
function getContext(selection){
    if(!selection.rangeCount){return null;}
    var range = selection.getRangeAt(0);
    const text = startContainer.textContent();
    const offset = range.startOffset
    let sentenceStart = 0;
    let sentenceEnd = -1;
    for (punct in ['。', '？', '！']){
        if (sentenceStart === 0) sentenceStart = text.lastIndexOf(punct,startOffset) + 1;
        if (text.lastIndexOf(punct,startOffset) > sentenceStart) sentenceStart = text.lastIndexOf(punct,startOffset); 
        if (sentenceEnd === -1) sentenceEnd = text.indexOf(punct, startOffset);
        if (text.indexOf(punct,startOffset) < sentenceEnd) sentenceEnd = text.indexOf(punct, startOffset);
    }
    range.setStart(sentenceStart);
    range.setEnd(sentenceEnd);
    return range; 
}

dictionary = chrome.storage.local.get('ctoe_dict').then((result) => {
    console.log("retrieved dict");
    console.log(dictionary.是);
});
define();

