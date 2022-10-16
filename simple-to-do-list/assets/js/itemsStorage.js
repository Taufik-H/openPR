
class ItemsStorage {

    constructor(name){
        this.name = name; 
        this.list = this.get();
    }

    // Méthode pour récuperer un tableau des valeurs
    get() {
        if(!localStorage.getItem(this.name)){
            localStorage.setItem(this.name, '[]');
        }   
        return JSON.parse(localStorage.getItem(this.name)); 
    }

    // Méthode pour ajouter une valeur dans un tableau
    set(value){
        this.list.push(value);
        localStorage.setItem(this.name, JSON.stringify(this.list)); 
    }

    // Méthode pour supprimer une valeur du tableau
    remove(value){
        const index = this.list.indexOf(value);
        this.list.splice(index, 1);
        localStorage.setItem(this.name, JSON.stringify(this.list));
    }

    // Méthode pour vider tout le tableau 
    clear(){
        localStorage.removeItem(this.name);
    }
}