const Task = require("./task");

class Tasks{

    _listado = {};

    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key =>{
            const task = this._listado[key]
            listado.push(task)
        })
        return listado;
    }
    constructor(){
        this._listado = {};
    }

    deleteTask( id = '' ) {

        if ( this._listado[id] ) {
            delete this._listado[id];
        }

    }

    loadTasksFromArray(tasks =[]){
        tasks.forEach(task=>{
            this._listado[task.id]= task;
        })
    }

    createTask(desc=''){

        const task= new Task(desc);
        this._listado[task.id] = task;

    }

    completeList(){
        console.log();
        this.listadoArr.forEach( (tarea, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;

            console.log(`${ idx } ${ desc } :: ${ estado }`);

        });
    }

    listPendingComplete( completadas = true ) {

        console.log();
        let contador = 0;
        this.listadoArr.forEach( tarea => {

            const { desc, completadoEn } = tarea;
            const estado = ( completadoEn ) 
                                ? 'Completada'.green
                                : 'Pendiente'.red;
            if ( completadas ) {
                // mostrar completadas
                if ( completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ completadoEn.green }`);
                }
            } else {
                // mostrar pendientes
                if ( !completadoEn ) {
                    contador += 1;
                    console.log(`${ (contador + '.').green } ${ desc } :: ${ estado }`);
                }
            }

        });     

    }

    toggleCompleted( ids = [] ) {

        ids.forEach( id => {

            const tarea = this._listado[id];
            if ( !tarea.completadoEn ) {
                tarea.completadoEn = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( tarea => {

            if ( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }

        });


    }

}

module.exports = Tasks