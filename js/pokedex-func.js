
function obtenerentrada() {
    const entrada = document.getElementById("buscador").value.toLowerCase();
    if (entrada.length == 0) {
        console.log("error");
    } else {
        console.log(entrada);
        const pokeurl = "https://pokeapi.co/api/v2/pokemon/" + entrada;
        console.log(pokeurl);
        fetch(pokeurl)
            .then(resphttp => {
                if (resphttp.status != 200) {
                    pokeimagen("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Qs5nmyya_BkqQOSK9Xdpb2kPDQWtn5mFgg&usqp=CAU");
                    //alert("ERROR");
                    document.getElementById("numpokemon").innerHTML = "error";
                    document.getElementById("nombpokemon").innerHTML = "error";
                    document.getElementById("tipopokemon").innerHTML = "error";
                    document.getElementById("altpokemon").innerHTML = "error";
                    document.getElementById("pesopokemon").innerHTML = "error";
                    document.getElementById("cuad-carac").innerHTML =  "error";
                    document.getElementById("cuad-atak").innerHTML = "error";
                } else {
                    let datos = resphttp.json();
                    console.log(datos);

                    datos.then(data => {
                        document.getElementById("numpokemon").innerHTML = data.id;
                        document.getElementById("nombpokemon").innerHTML = data.name;
                        document.getElementById("tipopokemon").innerHTML = data.types[0].type.name;
                        document.getElementById("altpokemon").innerHTML = data.height;
                        document.getElementById("pesopokemon").innerHTML = data.weight;

                        //Imagen pokemon
                        let imgfront = data.sprites.front_default;
                        //let imgtras = data.sprites.back_default;
                        pokeimagen(imgfront);

                        // Estadisticas del pokémon
                        let hp = data.stats[0].base_stat;
                        let attack = data.stats[1].base_stat;
                        let defense = data.stats[2].base_stat;
                        let specialattack = data.stats[3].base_stat;
                        let specialdefense = data.stats[4].base_stat;
                        let speed = data.stats[5].base_stat;
                        // Elementos a incorporar los <li>
                        document.getElementById("cuad-carac").innerHTML = "";
                        const lista = document.getElementById("cuad-carac");
                        // Creamos los <li>
                        const li_hp = document.createElement("li");
                        const li_attack = document.createElement("li");
                        const li_defense = document.createElement("li");
                        const li_specialattack = document.createElement("li");
                        const li_specialdefense = document.createElement("li");
                        const li_speed = document.createElement("li");
                        // Agregamos el contenido al <li>
                        li_hp.innerHTML = "<b>HP:</b>" + " " + hp;
                        li_attack.innerHTML = "<b>Ataque:</b>" + " " + attack;
                        li_defense.innerHTML = "<b>Defensa:</b>" + " " + defense;
                        li_specialattack.innerHTML = "<b>Ataque Especial:</b>" + " " + specialattack;
                        li_specialdefense.innerHTML = "<b>Defensa Especial:</b>" + " " + specialdefense;
                        li_speed.innerHTML = "<b>Velocidad:</b>" + " " + speed;
                        // Incorporamos al <ul>
                        lista.appendChild(li_hp);
                        lista.appendChild(li_attack);
                        lista.appendChild(li_defense);
                        lista.appendChild(li_specialattack);
                        lista.appendChild(li_specialdefense);
                        lista.appendChild(li_speed);

                        // Movimientos del pokemon
                        let moves = data.moves.map((typ) => typ.move.name);
				        document.getElementById("cuad-atak").innerHTML = "";
				        // Colocar cada movimiento en un <li>
				        moves.forEach(function (el) {
					        document.getElementById("cuad-atak").innerHTML += "<li>" + el + "</li>";
				        });
                    });
                };
            });
    }
};




const pokeimagen = (url) => {
    const imagenpokemon = document.getElementById("pokeimg");
    imagenpokemon.src = url;
}
