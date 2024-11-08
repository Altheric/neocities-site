//Helper functions go here.

/** Return the given input capitalized per word*/
export const capitalize = (input) => {
    if(input.indexOf(' ') == -1){
        return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    } else {
        const strArr = input.split(' ')
        let newStr = ''
        strArr.forEach(str => {
            newStr += (str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() + ' ')
        });
        return newStr.substring(0, newStr.length - 1);
    }
}