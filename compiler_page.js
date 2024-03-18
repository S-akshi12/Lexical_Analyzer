let my_button = document.getElementById('lexify');
let my_text = document.querySelector('textarea');
let right_div = document.getElementById('right_div');


// console.log(selectedItem);

function tokenizeJavaCode(javaCode) {
    const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|\/\/[^\n]*|\/\*[\s\S]*?\*\/|[\{\}\(\)\[\];,]|(?:\d+\.\d*|\.\d+|\d+)(?:[eE][-+]?\d+)?|\b(?:class|public|static|void|int|while|if|else|for|switch|case|break|return|System\.out\.println)\b|\b[a-zA-Z_]\w*\b|\S+/g;

    const tokenTypes = {
        '"': 'String Literal',
        '//': 'Single-line Comment',
        '/*': 'Multi-line Comment',
        '{': 'Left Curly Brace',
        '}': 'Right Curly Brace',
        '(': 'Left Parenthesis',
        ')': 'Right Parenthesis',
        '[': 'Left Square Bracket',
        ']': 'Right Square Bracket',
        ';': 'Semicolon',
        ',': 'Comma',
    };

    const tokens = javaCode.match(regex) || [];

    const tokenTypeArray = tokens.map(token => {
        if (tokenTypes[token]) {
            return tokenTypes[token];
        } else if (token.match(/^\d/)) {
            return 'Number Literal';
        } else if (token.match(/^"([^"\\]*(?:\\.[^"\\]*)*)"$/)) {
            return 'String Literal';
        } else if (token.match(/^(\/\/|\/\*).*(\/\/|\/\*)$/)) {
            return 'Comment';
        } else if (token.match(/^\b(abstract|Assert|boolean|date|Date|break|byte|catch|char|continue|default|do|double|enum|extends|final|finally|float|implements|import|instanceOf|interface|long|native|new|null|package|private|short|strictfp|super|synchronised|this|throw|throws|transient|try|volatile|true|false|protected|ArrayList|HashMap|class|public|static|void|int|while|if|else|for|switch|case|break|return|System\.out\.println)\b$/)) {
            return 'Keyword';
        } else if (token.match(/^\b[a-zA-Z_]\w*\b$/)) {
            return 'Identifier';
        } else {
            return 'Other';
        }
    });

    const tokenObjects = tokens.map((token, index) => ({ token, type: tokenTypeArray[index] }));

    return tokenObjects;
}

function tokenizeCCode(cCode) {
    // Regular expression for C tokens
    const regex = /("([^"\\]*(?:\\.[^"\\]*)*)"|\/\/[^\n]*|\/\*[\s\S]*?\*\/|([()\[\]{};,.+\-*/%&|^!=<>?~"'#:]|->)|\b(if|else|while|for|switch|case|break|return|typedef|struct|union|enum|char|short|int|long|float|double|void|sizeof|auto|static|register|extern|const|volatile|signed|unsigned|continue|goto|default|do|include)\b|\d+(\.\d*)?|\.\d+|\b[a-zA-Z_]\w*\b|[#]\s*include\s*[<"][^>"]*[>"])/g;

    // Token types mapping
    const tokenTypes = {
        '"': 'String Literal',
        'Identifier': 'Identifier',
        'Keyword': 'Keyword',
        'Number': 'Number Literal',
        'Punctuation': 'Punctuation',
        'Single-line Comment': 'Single-line Comment',
        'Multi-line Comment': 'Multi-line Comment',
        'Preprocessor Directive': 'Preprocessor Directive',
        '{': 'Left Curly Brace',
        '}': 'Right Curly Brace',
        '(': 'Left Parenthesis',
        ')': 'Right Parenthesis',
        '[': 'Left Square Bracket',
        ']': 'Right Square Bracket',
        ';': 'Semicolon',
        ',': 'Comma'
    };

    // Use the regular expression to find all tokens in the input
    const tokens = cCode.match(regex) || [];

    // Determine the type of each token
    const tokenTypeArray = tokens.map(token => {
        if (tokenTypes[token]) {
            return tokenTypes[token];
        }
        else if (token.match(/^"/)) {
            return tokenTypes['"'];
        } else if (token.match(/^\d/)) {
            return tokenTypes['Number'];
        } else if (token.match(/^(\/\/)/)) {
            return tokenTypes['Single-line Comment'];
        } else if (token.match(/^(\/\*)/)) {
            return tokenTypes['Multi-line Comment'];
        } else if (token.match(/^[()\[\]{};,.+\-*/%&|^!=<>?~"'#]/)) {
            return tokenTypes['Punctuation'];
        } else if (token.match(/^\b(if|else|while|for|switch|case|break|return|typedef|struct|union|enum|char|short|int|long|float|double|void|sizeof|auto|static|register|extern|const|volatile|signed|unsigned|continue|goto|default|do|include)\b$/)) {
            return tokenTypes['Keyword'];
        } else if (token.match(/^\b[#]\s*include\s*[<"][^>"]*[>"]$/)) {
            return tokenTypes['Preprocessor Directive'];
        } else if (token.match(/^\b[a-zA-Z_]\w*\b$/)) {
            return tokenTypes['Identifier'];
        } else {
            return tokenTypes['Identifier']; // Fallback for unrecognized tokens
        }
    });

    // Combine tokens with their respective types
    const tokenObjects = tokens.map((token, index) => ({ token, type: tokenTypeArray[index] }));

    return tokenObjects;
}

// for java code 


let selectedItem = "Java";
function getSelectedValue() {
    selectedItem = document.getElementById('lang-names').value;
    // console.log(selectedItem)
    
        my_button.addEventListener('click', function () {

            let my_div = document.createElement('div');
            let arr = [];
            if (selectedItem == "Java") { 
                arr = tokenizeJavaCode(my_text.value); 
                arr.forEach((value) => {
                    let str = "";
    
                    for (let x in value) {
                        str = str + value[x] + " : ";
                    }
    
                    let my_para = document.createElement('p');
                    let new_line = document.createElement('br');
                    my_para.textContent = str.slice(0, str.length - 2) + "\n";
                    my_div.appendChild(my_para);
                    my_div.appendChild(new_line);
                })
                right_div.appendChild(my_div);

            }
            if (selectedItem === "C"){ 
                arr = tokenizeCCode(my_text.value); 
                console.log(arr);
                arr.forEach((value) => {
                    let str = "";
    
                    for (let x in value) {
                        str = str + value[x] + " : ";
                    }
    
                    let my_para = document.createElement('p');
                    let new_line = document.createElement('br');
                    my_para.textContent = str.slice(0, str.length - 2) + "\n";
                    my_div.appendChild(my_para);
                    my_div.appendChild(new_line);
                })
                right_div.appendChild(my_div);

            }

            // arr.forEach((value) => {
            //     let str = "";

            //     for (let x in value) {
            //         str = str + value[x] + " : ";
            //     }

            //     let my_para = document.createElement('p');
            //     let new_line = document.createElement('br');
            //     my_para.textContent = str.slice(0, str.length - 2) + "\n";
            //     my_div.appendChild(my_para);
            //     my_div.appendChild(new_line);
            // })

            // right_div.appendChild(my_div);
        });
    

}












// my_button.addEventListener('click', function () {

//     let my_div = document.createElement('div');

//     const arr = [];
//     if (selectedItem == "Java") {
//         arr = tokenizeJavaCode(my_text.value);
//         //console.log("Java is selected");
//     }
//     else if (selectedItem == "C") {
//         arr = tokenizeCCode(my_text.value);
//         //console.log("C is selected");
//     }
//     else if (selectedItem == "C++") {
//         console.log("C++ is selected");
//     }
//     else if (selectedItem == "Python") {
//         console.log("Python is selected");
//     }
//     else {
//         console.log("Choose the available languages")
//     }


//     arr.forEach((value) => {
//         let str = "";

//         for (let x in value) {
//             str = str + value[x] + " : ";
//         }

//         let my_para = document.createElement('p');
//         let new_line = document.createElement('br');
//         my_para.textContent = str.slice(0, str.length - 2) + "\n";
//         my_div.appendChild(my_para);
//         my_div.appendChild(new_line);
//     })

//     right_div.appendChild(my_div);
// });