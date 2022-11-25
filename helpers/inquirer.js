const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿What you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Create task`
            },
            {
                value: '2',
                name: `${'2.'.green}List tasks`
            },
            {
                value: '3',
                name: `${'3.'.green}List Completed Tasks`
            },
            {
                value: '4',
                name: `${'4.'.green}List Pending Tasks`
            },
            {
                value: '5',
                name: `${'5.'.green}Complete Tasks`
            },
            {
                value: '6',
                name: `${'6.'.green}Delete Task`
            },
            {
                value: '0',
                name: `${'0.'.green}Exit`
            },
    ]


    }

];


const inquirerMenu= async() => {
    console.clear();
    console.log('===================='.green);
    console.log (' Select an Option'.white);
    console.log('====================\n'.green);

    const {option} = await inquirer.prompt(menuOpts);

    return option;
}

const pausa= async() => {
    const q= [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.green} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(q)
}

const readInput = async(message)=>{
    const question =[
        {
            type:'input',
            name: 'desc',
            message,
            validate(value){
                if(value.length===0){
                    return 'Please insert a value'
                }
                return true;
            }
        }
    ];

    const {desc}= await inquirer.prompt(question);
    return desc;
}

const listTaskDelete= async(tareas= [])=>{
    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}
const confirm = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}   

const showChecklistList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports= {
    inquirerMenu,
    pausa,
    readInput,
    listTaskDelete,
    confirm,
    showChecklistList
}