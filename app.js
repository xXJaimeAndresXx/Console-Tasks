const { inquirerMenu, pausa, readInput, listTaskDelete,confirm,showChecklistList} = require('./helpers/inquirer');
const { guardarDB, readDB } = require('./helpers/saveFile');
const Task = require('./models/task');
const Tasks = require('./models/tasks');
require('colors');


console.clear();


const main = async()=>{
    let opt='';
    const tasks = new Tasks();
    const tasksDB= readDB();

    if(tasksDB){
        tasks.loadTasksFromArray(tasksDB);
    }

    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc= await readInput('Description: ');
                tasks.createTask(desc);
            break;

            case '2':
                tasks.completeList();
            break;

            case '3':
                tasks.listPendingComplete(true);
            break;

            case '4':
                tasks.listPendingComplete(false);
            break
            case '5': // completado | pendiente
                const ids = await showChecklistList( tasks.listadoArr );
                tasks.toggleCompleted( ids );
            break;
                       
            case '6': // Borrar
                const id = await listTaskDelete( tasks.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirm('¿Está seguro?');
                    if ( ok ) {
                        tasks.deleteTask( id );
                        console.log('Tarea borrada');
                    }
                }
            break;
        }

        guardarDB(tasks.listadoArr);
        

        await pausa();

    } while (opt !== '0');
    
}

main();