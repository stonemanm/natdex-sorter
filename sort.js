import cache from 'data/pokedex.json' assert { type: 'json' };
console.log(data);

/**
 * Get NatDex number for a given Pokémon.
 *
 * @param {string} s the string to check
 * @returns {number} the natdex num
 */
function dexNum(s) {
    console.log(cache);
    let match = cache["pokedex"].find((val) => val.species === s);
    return match.natdex;
}

/**
 * Checks if a given char is a-z or A-Z.
 * 
 * @param {char} c a string with only one element
 */
function isLatChar(c) {
    let ascii = c[0].charCodeAt(0);
    return ((ascii > 96 && ascii < 123) ||
            (ascii > 64 && ascii < 91));
}

/**
 * Checks if a string is smaller than (should come before) another string.
 * 
 * @param {string} lhs 
 * @param {string} rhs 
 */
function isSmaller(lhs, rhs) {
    let lhs_num = dexNum(lhs);
    let rhs_num = dexNum(rhs);
    
    if (lhs_num !== -1 && rhs_num !== -1) {
        return lhs_num < rhs_num;
    } else if (lhs_num !== -1 && rhs_num === -1) {
        return true;
    } else if (lhs_num === -1 && rhs_num !== -1) {
        return false;
    } else {
        // iterate every character of the two strings (break when out of bounds of one string)
        for (let i = 0; i < lhs.length && i < rhs.length; i++) {
            // if not equals
            if (lhs[i] != rhs[i]) {
                // get char from string
                const char_left = lhs[i];
                const char_right = rhs[i];

                if (isLatChar(char_left) && isLatChar(char_right)) {
                    // get ascii code from char
                    let left_ascii = char_left.charCodeAt(0);
                    let right_ascii = char_right.charCodeAt(0);

                    // is lower chase norm to upper case, but one less important (A -> b)
                    if (left_ascii > 96) {
                        left_ascii = (left_ascii % 97) * 2 + 1;
                    } else {
                        left_ascii = (left_ascii % 65) * 2;
                    }

                    // is lower chase norm to upper case, but one less important (A -> b)
                    if (right_ascii > 96) {
                        right_ascii = (right_ascii % 97) * 2 + 1;
                    } else {
                        right_ascii = (right_ascii % 65) * 2;
                    }

                    // compare latin letters on ascii code
                    return left_ascii < right_ascii;
                }
                else {
                    // not an ascii code => make a default comparison
                    return lhs < rhs;
                }
            }
        }
        // if two words are equal to the length of them return isSmaller based on the length
        return lhs.length <= rhs.length;
    }
}


// The regex, which checks if a string contains only whitespace.
const whitespace_regex = new RegExp("^[\\n\\r\\s]+$");

/**
 * Returns if a string is empty or contains only whitespace.
 * 
 * @param {string} str 
 */
function isWhitespace(str) {
    return str.match(whitespace_regex) || !(str.length > 0);
}

/**
 * Merge Sort from https://stackabuse.com/merge-sort-in-javascript/
 * @param {array} left 
 * @param {array} right 
 */
function merge(left, right) {
    let arr = [];

    // Break out of loop if any one of the array gets empty
    while (left.length && right.length) {
        // Pick the smaller among the smallest element of left and right sub arrays 
        if (isSmaller(left[0], right[0])) {
            arr.push(left.shift());
        } else {
            arr.push(right.shift());
        }
    }

    // Concatenating the leftover elements
    // (in case we didn't go through the entire left or right array)
    return [...arr, ...left, ...right];
}

/**
 * Merge Sort from https://stackabuse.com/merge-sort-in-javascript/
 * @param {array} array 
 */
function mergeSort(array) {
    const half = array.length / 2;

    // Base case or terminating case
    if (array.length < 2) {
        return array;
    }
    const left = array.splice(0, half);
    return merge(mergeSort(left), mergeSort(array));
}

/**
 * Resets the form.
 */
function resetForm(form_id) {
    var answer = window.confirm("Do you want to Reset the Input?");
    if (answer) {
        document.getElementById(form_id).reset();
    }
}

/**
 * Sorts a text by line breaks alphabetically and prints it into a given value of an id.
 * 
 * @param {string} text 
 * @param {string} out_id 
 */
function sort(text) {
    // split the arrays into subarray
    let lines = text.split("\n");
    
    // remove empty lines
    for (let i = 0; i < lines.length; i++) {
        const str = lines[i];
        if (isWhitespace(str)) {
            lines.splice(i, 1);
            --i;
        }
    }

    // sort the array
    let sorted = mergeSort(lines);

    // combine sorted string array into single string
    let txt = "";
    sorted.forEach(str => {
        txt += str + "\n";
    });

    return txt;
}
