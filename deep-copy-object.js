

const deepCopy = (obj) => {

    if (obj === null || typeof obj !== 'object') {
        return obj
    }

    if(Array.isArray(obj)){
        return obj.map(deepCopy)
    }

    let newObj = {}

    for (const key in obj) {

        newObj[key] = deepCopy(obj[key])

    }

    return newObj
}

// console.log(deepCopy(), 'deepCopy')


const exampleObject = {
    name: 'John',
    age: 30,
    address: {
        city: 'Example City',
        country: 'Example Country'
    },
    hobbies: ['reading', 'coding', 'traveling']
};

const copiedObject = deepCopy(exampleObject);


console.log(copiedObject)