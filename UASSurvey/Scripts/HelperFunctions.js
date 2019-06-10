
const isNullUndefinedEmptyString = (item) => {
    return (
        Object.is(item, null)
        || Object.is(item, "")
        || Object.is(item, undefined)
        || Object.is(item, "undefined")
    ) ? true : false;
};


const unhideElementById = (id, otherOptionalClasses) => {
    if (otherOptionalClasses !== null) {
        document.getElementById(id).className = otherOptionalClasses + "";
    }
    else { document.getElementById(id).className = ""; }
}


// cloneElement({idToClone:"", newId: "", destinationId: ""});
const cloneElement = (clone) => {
    var matrix_input_group_ = document.getElementById(clone.idToClone).cloneNode(true);
    matrix_input_group_.setAttribute("id", clone.newId);
    document.getElementById(clone.destinationId).appendChild(matrix_input_group_);
};

const assembleClassStringExcept = (positionFound, classString) => {
    let str = classString.split(' ');
    let finalStr = "";
    for (let s in str) {
        if (!Object.is(s, positionFound)) {
            finalStr += (str[s] + ' ');
        }
    }
    return finalStr;
};


const isClassFound = (foundClass) => {
    return !Object.is(foundClass, -1);
};


const findClassName = (classString, findClass) => {
    let classNames = classString.split(' ');
    for (let c in classNames) {
        if (Object.is(classNames[c], findClass)) {
            return c;
        }
    }
    return -1;
};

const replaceClassNameById = (idTarget, replaceTargetClass, withThisClassName) => {
    let previousClassName = document.getElementById(idTarget).className + "";
    let foundClass = findClassName(document.getElementById(idTarget).className + "", replaceTargetClass);
    let finalClass = "";
    if (isClassFound(foundClass)) {
        finalClass = assembleClassStringExcept(foundClass, previousClassName);
        finalClass += withThisClassName;
    }
    document.getElementById(idTarget).className = finalClass;
};

const updateClassName = (idFocus, transitionClassName = { oldClassName: "", newClassName: "" }) => {
    let theClassName = "";
    if (!Object.is(document.getElementById(idFocus), null)) {
        theClassName = document.getElementById(idFocus).className + "";
    }
    const theClasses = theClassName.split(' ');
    let finalClassName = "";
    for (let x in theClasses) {
        (!Object.is(transitionClassName.oldClassName, theClasses[x])) ?
            finalClassName += theClasses[x] + " " : finalClassName += transitionClassName.newClassName;

    }
    return finalClassName;
};