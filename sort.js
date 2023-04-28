/**
 * checks if a given char is a-z or A-Z.
 * 
 * @param {char} c a string with only one element
 */
function is_lat_char(c) {
    let ascii = c[0].charCodeAt(0);

    if ((ascii > 96 && ascii < 123) || (ascii > 64 && ascii < 91)) {
        return true;
    }
    return false;
}

/**
 * Get NatDex number for a given Pokémon.
 *
 * @param {string} s the string to check
 * @returns {number} the natdex num
 */
function natdex_num(s) {
    const json = require('data/pokedex.json');
    const data = JSON.parse(json);
    
    let match = data.find((val) => val.species === s);
    return match.natdex;
}

/**
 * Checks if a string is smaller (alphabetically before) than another string.
 * 
 * @param {string} lhs 
 * @param {string} rhs 
 */
function is_smaller(lhs, rhs) {
    let lhs_num = natdex_num(lhs);
    let rhs_num = natdex_num(rhs);
    
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

                if (is_lat_char(char_left) && is_lat_char(char_right)) {
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
        // if two words are equal to the length of them return is_smaller based on the length
        return lhs.length <= rhs.length;
    }
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
        if (is_smaller(left[0], right[0])) {
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
function merge_sort(array) {
    const half = array.length / 2;

    // Base case or terminating case
    if (array.length < 2) {
        return array;
    }
    const left = array.splice(0, half);
    return merge(merge_sort(left), merge_sort(array));
}

/**
 * the regex, which checks if a string contains only whitespace.
 */
const whitespace_regex = new RegExp("^[\\n\\r\\s]+$");

/**
 * returns if a strings contains only whitespace or is empty.
 * 
 * @param {string} str 
 */
function is_whitespace(str) {
    return str.match(whitespace_regex) || !(str.length > 0);
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
        if (is_whitespace(str)) {
            lines.splice(i, 1);
            --i;
        }
    }

    // sort the array
    let sorted = merge_sort(lines);

    // combine sorted string array into single string
    let txt = "";
    sorted.forEach(str => {
        txt += str + "\n";
    });

    return txt;
}



function reset_form(form_id) {
    var answer = window.confirm("Do you want to Reset the Input?");
    if (answer) {
        document.getElementById(form_id).reset();
    }
}
