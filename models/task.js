const { v4: uuidv4 } = require('uuid');

class Task{
    id= '';
    desc= '';
    completedIn= null

    constructor(desc){
        this.desc= desc;
        this.id = uuidv4();
        this.completedIn= null
    }


}

module.exports= Task