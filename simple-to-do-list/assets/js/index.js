'use script'
const listTask = document.getElementById('listTask');
const inputTask = document.getElementById('inputTask');
const addTask = document.getElementById('addTask');
const clearTask = document.getElementById('clearTask')

// Nouvelle instance de ItemsStorage avec la clé 'tasks'
const storage = new ItemsStorage('tasks');

// Récuperation des tâches dans un tableau déja existant ou un tableau vide
const tasks = storage.list;

function addListTask(task){
    // Vérifie si la valeur dans le tableau est de type string et qu'elle n'est pas vide
    if(typeof task === "string" && task){
        
        const li = document.createElement('li');
        const remove = document.createElement('button');

        li.textContent = task;
        remove.textContent = 'clear';

        remove.addEventListener('click', () => {
            const value = remove.parentNode.firstChild.textContent; 
            storage.remove(value);
            listTask.removeChild(remove.parentNode);
        })

        li.appendChild(remove);

        // Ajout d'un enfant dans le parent
        listTask.insertBefore(li, listTask.firstChild);

        return true;
    }
    return false; 
}

// Affiche/Ajout la liste des items
tasks.forEach(task => addListTask(task));

// Ajout des tâches avec le bouton add et la touche ENTER
function newTask(){
    if(storage.list.indexOf(inputTask.value) === -1 && addListTask(inputTask.value)){
        storage.set(inputTask.value);
        inputTask.value = '';
    }
    inputTask.focus(); // Afin que le curseur reste sur le champ input après avoir inséré une tâche

}

addTask.addEventListener('click', newTask);

inputTask.addEventListener('keydown', e => {
    if(e.key === 'Enter'){
        newTask();
    }
});

// Efface toutes les tâches affichées
clearTask.addEventListener('click', () => {
    storage.clear();
    listTask.innerHTML = '';
})


