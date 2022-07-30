//################################################################################################//
//                    PROJET PAINT APP - JAVASCRIPT
//                THÉO TELLIEZ - RENDU EN NOVEMBRE 2020
//              PROJET DEMANDÉ, SOUTENU ET ÉVALUÉ PAR JULIEN LE GALES
//################################################################################################//

//---------------------------Début du JAVASCRIPT------------------------------------------------------

//---------------------------Général------------------------------------------------------------------

	//Créer un canevas temporaire et obtenir son contexte

	var canvas = document.querySelector('#canvas');
	var ctx = canvas.getContext('2d');
	var tmp_canvas = document.createElement('canvas');	
	tmp_canvas.id = 'tmp_canvas';
	var tmp_ctx = tmp_canvas.getContext('2d');
	var	dessin = document.querySelector('#container');


	//Récupérer les objets via leurs ID
	var clearBtn = document.getElementById('clearbtn'), //Bouton de clear
	
		fillBtn = document.getElementById('fillcolor'), //Input color pour le remplissage
		
		strokeBtn = document.getElementById('strokecolor'), //Input color pour le pinceau
		
		sizeBtn = document.getElementById('lineweight'), //Input pour la taille du pinceau
		
		saveEl = document.getElementById('save'), //Bouton pour sauvegarder
		
		undo = document.getElementById("undo"), //Bouton pour undo
		redo = document.getElementById("redo"), //Bouton pour redo
		
		coul1= document.getElementById("coul1"), //Bouton pour la couleur 1
		coul2= document.getElementById("coul2"), //Bouton pour la couleur 2
		coul3= document.getElementById("coul3"), //Bouton pour la couleur 3
		coul4= document.getElementById("coul4"), //Bouton pour la couleur 4
		coul5= document.getElementById("coul5"), //Bouton pour la couleur 5
		
		coul6= document.getElementById("coul6"), //Bouton pour la couleur 6
		coul7= document.getElementById("coul7"), //Bouton pour la couleur 7
		coul8= document.getElementById("coul8"), //Bouton pour la couleur 8
		coul9= document.getElementById("coul9"), //Bouton pour la couleur 9
		coul10= document.getElementById("coul10"), //Bouton pour la couleur 10

		menu= document.getElementById("menu"), //Bouton du menu
		controles= document.getElementById("controles"), //Bouton d'affichage des contrôles

		coulPredefRemp= document.getElementById("coulPredefRemp"), //Texte qui défini les palettes et le changement entre remplissage et pinceau - Ici c'est l'affichage du texte de remplissage
		coulPredefPinc= document.getElementById("coulPredefPinc"), //Texte qui défini les palettes et le changement entre remplissage et pinceau - Ici c'est l'affichage du texte de pinceau
		smallPredef= document.getElementById("smallPredef"); //Petit texte en dessous des h1 qui définissent les palettes et le changement entre remplissage et pinceau

	//Réglage de la couleur, de la taille de la ligne et de la couleur de remplissage
	var strokeColo = strokeBtn.value, //Couleur du pinceau
		lineSiz = sizeBtn.value, //Taille du pinceau
		fillColo = fillBtn.value; //Couleur de remplissage

	
	//Récupérer les styles de l'élément "dessin" et définir la largeur et la hauteur du canevas de base
	var dessin_style = getComputedStyle(dessin);
	canvas.width = parseInt(dessin_style.getPropertyValue('width'));
	canvas.height = parseInt(dessin_style.getPropertyValue('height'));
	
	//Définition de la largeur et de la hauteur du canevas temporaire à la largeur et à la hauteur du canevas réel
	tmp_canvas.width = canvas.width;
	tmp_canvas.height = canvas.height;

	//On ajoute un nœud à la fin de la liste des enfants d'un nœud parent spécifié (dessin et canevas temporaire).
	dessin.appendChild(tmp_canvas);

	//Récupération des coordonnées de la souris
	var mouse = {x: 0, y: 0};
	var start_mouse = {x: 0, y: 0};
	var last_mouse = {x: 0, y: 0};
	
	//Définition d'une variable ppts qui agira comme bouton et comme liste pour stocker les valeurs
	var ppts = [];

	/* Fonction de dessin */
	tmp_ctx.lineWidth = lineSiz;
	tmp_ctx.lineJoin = 'round';
	tmp_ctx.lineCap = 'round';
	tmp_ctx.strokeStyle = strokeColo;
	tmp_ctx.fillStyle = fillColo;

	/* Réglages des oninput listeners */
	fillBtn.oninput = function() { //Pour le remplissage
		fillColo = this.value;
	}

	strokeBtn.oninput = function() { //Pour le pinceau
		strokeColo = this.value;
	}

	sizeBtn.oninput = function() { //Pour la taille
		lineSiz = sizeBtn.value;
		document.getElementById("rangeSize").value = lineSiz;
	}
	
//---------------------------Fin Général---------------------------------------











//---------------------------Écoute du clic sur le boutons d'outils / formes ---------------------------------------

	value = "pinceau"; //On défini par défaut la valeur à "pinceau" afin que l'utilisateur puisse directement dessiner
	console.log(value); //On affiche dans la console la valeur actuelle (l'outil actuel)

	$("#ligne").click(function () { //Quand on clique sur la ligne
		value = "ligne"; //On défini la valeur à "ligne"
		console.log(value);
	});


	$("#pinceau").click(function () { //Quand on clique sur le pinceau
		value = "pinceau"; //On défini la valeur à "pinceau"
		console.log(value);
	});


	$("#carre").click(function () { //Quand on clique sur le carré
		value = "carre"; //On défini la valeur à "carre"
		console.log(value);
	});


	$("#rectangle").click(function () { //Quand on clique sur le rectangle
		value = "rectangle"; //On défini la valeur à "rectangle"
		console.log(value);

	});


	$("#cercle").click(function () { //Quand on clique sur le cercle
		value = "cercle"; //On défini la valeur à "cercle"
		console.log(value);

	});


	$("#ellipse").click(function () { //Quand on clique sur l'ellipse
		value = "ellipse"; //On défini la valeur à "ellipse"
		console.log(value);

	});

//---------------------------Fin Écoute du clic sur le boutons d'outils / formes ---------------------------------------
	
	
	
	
	
	
	
	
	
	
//---------------------------Mouvements et actions de la souris ---------------------------------------
	
	/* addEventListener qui capturent les mouvements et actions de la souris */
	tmp_canvas.addEventListener('mousemove', function(e) { //Mouvement de la souris
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX; //On récupére la position en direct du x
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY; //On récupére la position en direct du y
		
		x1.innerHTML = "<span style=\"color:white\">" + mouse.x + "</span>"; //On défini l'intérieur du span (dans la section coordonnées) à x au lieu de 0
		y1.innerHTML = "<span style=\"color:white\">" + mouse.y + "</span>"; //On défini l'intérieur du span (dans la section coordonnées) à y au lieu de 0
		
	}, false);
		
	tmp_canvas.addEventListener('mousedown', function(e) { //Souris appuyée
		//Contrôle de ce qui est stocké dans la value pour déterminer quelle fonction activer
		if (value === "rectangle") {
			tmp_canvas.addEventListener('mousemove', onPaintRect, false); //Fonction pour le rectangle
		} else if (value === "ellipse") {
			tmp_canvas.addEventListener('mousemove', onPaintEllipse, false); //Fonction pour l'éllipse
		} else if (value === "cercle") {
			tmp_canvas.addEventListener('mousemove', onPaintCircle, false); //Fonction pour le cercle
		} else if (value === "ligne") {
			tmp_canvas.addEventListener('mousemove', onPaintLine, false); //Fonction pour la ligne
		} else if (value === "carre") {
			tmp_canvas.addEventListener('mousemove', onPaintSquare, false); //Fonction pour le carré
		} else {
			tmp_canvas.addEventListener('mousemove', onPaintPencil, false); //Fonction pour le pinceau
		}
				
		mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX; //On récupére la position en direct du x
		mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY; //On récupére la position en direct du y

		start_mouse.x = mouse.x; //On dit que le point de départ de la souris c'est sa position a t0
		start_mouse.y = mouse.y; //On dit que le point de départ de la souris c'est sa position a t0
		ppts.push({x: mouse.x, y: mouse.y}); //On donne les coordonnées de la souris à la liste de points ppts

		//Appeler les fonctions en fonction de la value définie précédemment
		if (value === "rectangle") {
			onPaintRect(); //Fonction pour le rectangle
		} else if (value === "ellipse") {
			onPaintEllipse(); //Fonction pour l'éllipse
		} else if (value === "cercle") {
			onPaintCircle(); //Fonction pour le cercle
		} else if (value === "ligne") {
			onPaintLine(); //Fonction pour la ligne
		} else if (value === "carre") {
			onPaintSquare(); //Fonction pour le carré
		} else {
			onPaintPencil(); //Fonction pour le pinceau
		}
	}, false);
	
	tmp_canvas.addEventListener('mouseup', function() { //Souris relachée
		if (value === "rectangle") {
			tmp_canvas.removeEventListener('mousemove', onPaintRect, false); //On enlève l'écouteur du rectangle vu qu'il est défini
			cPush(); //On push à chaque fois que la souris est relachée pour pouvoir undo et redo
		} else if (value === "ellipse") {
			tmp_canvas.removeEventListener('mousemove', onPaintEllipse, false); //On enlève l'écouteur de l'ellipse vu qu'il est défini
			cPush(); //On push à chaque fois que la souris est relachée pour pouvoir undo et redo
		} else if (value === "cercle") {
			tmp_canvas.removeEventListener('mousemove', onPaintCircle, false); //On enlève l'écouteur du cerlce vu qu'il est défini
			cPush(); //On push à chaque fois que la souris est relachée pour pouvoir undo et redo
		} else if (value === "ligne") {
			tmp_canvas.removeEventListener('mousemove', onPaintLine, false); //On enlève l'écouteur de la ligne vu qu'il est défini
			cPush(); //On push à chaque fois que la souris est relachée pour pouvoir undo et redo
		} else if (value === "carre") {
			tmp_canvas.removeEventListener('mousemove', onPaintSquare, false); //On enlève l'écouteur du carré vu qu'il est défini
			cPush(); //On push à chaque fois que la souris est relachée pour pouvoir undo et redo
		} else {
			tmp_canvas.removeEventListener('mousemove', onPaintPencil, false); //On enlève l'écouteur du pinceau vu qu'il est défini
			cPush(); //On push à chaque fois que la souris est relachée pour pouvoir undo et redo
		}		
		// On envoi l'image sur le vrai canevas
		ctx.drawImage(tmp_canvas, 0, 0);
		// On clear le canevas temporaire
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);
		// On vide la liste de points ppts
		ppts = [];		
	}, false);
	
//---------------------------Fin des Mouvements et actions de la souris ---------------------------------------		
	
	
	
	
	
	
	
	
	
	
//---------------------------Fonctions pour dessiner les formes - Compliqué ---------------------------------------
	
	var onPaintRect = function() {	//Fonction pour dessiner le rectangle
		//console.log("fonction rectangle");
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height); //On clear le canevas temporaire avant de dessiner
		var x = Math.min(mouse.x, start_mouse.x); //Math.min renvoie le plus petit nombre d'une série de 0 ou plusieurs nombres ou bien NaN si au moins un des arguments fourni n'est pas un nombre ou ne peut pas être converti en nombre
		var y = Math.min(mouse.y, start_mouse.y); //Math.min renvoie le plus petit nombre d'une série de 0 ou plusieurs nombres ou bien NaN si au moins un des arguments fourni n'est pas un nombre ou ne peut pas être converti en nombre
		var width = Math.abs(mouse.x - start_mouse.x); //Math.abs retourne la valeur absolue d'un nombre, c'est-à-dire ici la valeur absolue de mouse.x - start_mouse.x qu'on set dans la variable de largeur
		var height = Math.abs(mouse.y - start_mouse.y); //Math.abs retourne la valeur absolue d'un nombre, c'est-à-dire ici la valeur absolue de mouse.y - start_mouse.y qu'on set dans la variable de hauteur
		tmp_ctx.fillStyle = fillColo; //On défini la couleur de remplissage du rectangle (qui vaut la variable de couleur FillColo)
		tmp_ctx.fillRect(x, y, width, height); //On dessine un rectangle plein aux coordonnées (x, y), aux dimensions déterminées par largeur et hauteur et au style déterminé par l'attribut fillStyle.
		tmp_ctx.lineWidth = lineSiz; //On défini la taille des lignes du rectangle
		tmp_ctx.strokeStyle = strokeColo; //On défini la couleur des lignes extérieures du rectangle
		tmp_ctx.strokeRect(x, y, width, height); //On dessine le contour d'un rectangle aux coordonnées de l'angle haut gauche (x, y) et aux dimensions déterminées par largeur et hauteur dans la balise canvas, et en utilisant l'actuel strokeStyle.
		//En savoir plus : https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/strokeRect -> remplacer la fin "strokeRect" par ce qu'on veut (fillRect / strokeStyle / etc.)
	};

	var onPaintSquare = function() { //Fonction pour dessiner le carré
		//console.log("fonction carre");
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height); //On clear le canevas temporaire avant de dessiner
		var x = Math.min(mouse.x, start_mouse.x); //Math.min renvoie le plus petit nombre d'une série de 0 ou plusieurs nombres ou bien NaN si au moins un des arguments fourni n'est pas un nombre ou ne peut pas être converti en nombre
		var y = Math.min(mouse.y, start_mouse.y); //Math.min renvoie le plus petit nombre d'une série de 0 ou plusieurs nombres ou bien NaN si au moins un des arguments fourni n'est pas un nombre ou ne peut pas être converti en nombre
		var width = Math.abs(mouse.x - start_mouse.x); //Math.abs retourne la valeur absolue d'un nombre, c'est-à-dire ici la valeur absolue de mouse.x - start_mouse.x qu'on set dans la variable de largeur
		var height = width; //On défini ici le coté au carré car la hauteur vaut la largeur
		tmp_ctx.fillStyle = fillColo; //On défini la couleur de remplissage du carré (qui vaut la variable de couleur FillColo)
		tmp_ctx.fillRect(x, y, width, height); //On dessine un carré plein aux coordonnées (x, y), aux dimensions déterminées par largeur et hauteur et au style déterminé par l'attribut fillStyle.
		tmp_ctx.lineWidth = lineSiz; //On défini la taille des lignes du carré
		tmp_ctx.strokeStyle = strokeColo; //On défini la couleur des lignes extérieures du carré
		tmp_ctx.strokeRect(x, y, width, height);//On dessine le contour d'un carré aux coordonnées de l'angle haut gauche (x, y) et aux dimensions déterminées par largeur et hauteur dans la balise canvas, et en utilisant l'actuel strokeStyle.
		//En savoir plus : https://developer.mozilla.org/fr/docs/Web/API/CanvasRenderingContext2D/strokeRect -> remplacer la fin "strokeRect" par ce qu'on veut (fillRect / strokeStyle / etc.)
	};

	var onPaintEllipse = function () { //Fonction pour dessiner l'ellpise
		//console.log("fonction ellipse");
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height); //On clear le canevas temporaire avant de dessiner
		var x = Math.min(mouse.x, start_mouse.x); //Math.min renvoie le plus petit nombre d'une série de 0 ou plusieurs nombres ou bien NaN si au moins un des arguments fourni n'est pas un nombre ou ne peut pas être converti en nombre
		var y = Math.min(mouse.y, start_mouse.y); //Math.min renvoie le plus petit nombre d'une série de 0 ou plusieurs nombres ou bien NaN si au moins un des arguments fourni n'est pas un nombre ou ne peut pas être converti en nombre
		var w = Math.abs(mouse.x - start_mouse.x); //Math.min renvoie le plus petit nombre d'une série de 0 ou plusieurs nombres ou bien NaN si au moins un des arguments fourni n'est pas un nombre ou ne peut pas être converti en nombre
		var h = Math.abs(mouse.y - start_mouse.y); //Math.min renvoie le plus petit nombre d'une série de 0 ou plusieurs nombres ou bien NaN si au moins un des arguments fourni n'est pas un nombre ou ne peut pas être converti en nombre
		var kappa = .5522848,
			ox = (w / 2) * kappa, // Décalage du point de contrôle horizontal
	  		oy = (h / 2) * kappa, // décalage du point de contrôle vertical
		    xe = x + w,           // x-fin / xe pour xend
		    ye = y + h,           // y-fin / ye pour yend
		    xm = x + w / 2,       // x-milieu / xm pour xmiddle
		    ym = y + h / 2;       // y-milieu / ym pour ymiddle

		//Aide : https://stackoverflow.com/questions/23432808/javascript-calculate-kappa
		//En géométrie différentielle, la courbure d'une courbe est donnée par k (kappa).
		//Kappa en gros c'est calculé par 4((racine de 2) - 1 / 3)
		
		tmp_ctx.beginPath(); //Permet de commencer un nouveau chemin en vidant la liste des sous-chemins
		tmp_ctx.fillStyle = fillColo;  //On défini la couleur de remplissage de l'ellipse (qui vaut la variable de couleur FillColo)
		tmp_ctx.lineWidth = lineSiz; //On défini la taille des lignes de l'ellipse
		tmp_ctx.strokeStyle = strokeColo; //On défini la couleur des lignes extérieures de l'ellipse
		tmp_ctx.moveTo(x, ym); //Déplace le point de départ d'un nouveau sous-chemin vers les coordonnées (x, ym).
		tmp_ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y); //Dessine la courbe de Bézier
		tmp_ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym); //Dessine la courbe de Bézier
		tmp_ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye); //Dessine la courbe de Bézier
		tmp_ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym); //Dessine la courbe de Bézier
		tmp_ctx.closePath(); //Provoque le retour du stylo au point de départ du sous-traçé courant. Il le fait en ajoutant une ligne droite entre le point courant et le point rejoint. Si la figure a déjà été fermée ou n'est constituée que d'un seul point, cette méthode ne provoque rien.
		tmp_ctx.stroke(); //Dessine le chemin actuel ou donné avec le style de trait actuel utilisant la règle d'enroulement non nulle.
		tmp_ctx.fill(); //Remplit le chemin courant ou donné avec la couleur de fond en cours, en utilisant la règle de remplissage extérieur/intérieur non nul ou la règle de remplissage pair/impair.
	}

	var onPaintCircle = function() { //Fonction pour dessiner le cercle
		//console.log("fonction cercle");
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height); //On clear le canevas temporaire avant de dessiner
		var x = (mouse.x + start_mouse.x) / 2; //On défini le x en tant que valeur de x + valeur de début de x que divise 2
		var y = (mouse.y + start_mouse.y) / 2; //On défini le y en tant que valeur de y + valeur de début de y que divise 2
		var radius = Math.max( //Renvoi la valeur max entre les deux math.abs
			Math.abs(mouse.x - start_mouse.x), //Math.abs retourne la valeur absolue d'un nombre, c'est-à-dire ici la valeur absolue de mouse.x - start_mouse.x qu'on set pour définir le maximum entre les deux valeurs
			Math.abs(mouse.y - start_mouse.y) //Math.abs retourne la valeur absolue d'un nombre, c'est-à-dire ici la valeur absolue de mouse.y - start_mouse.y qu'on set pour définir le maximum entre les deux valeurs
		) / 2; //On oublie pas de diviser par deux sinon ca fait un carré bizzare
		
		tmp_ctx.beginPath(); //Permet de commencer un nouveau chemin en vidant la liste des sous-chemins
		tmp_ctx.fillStyle = fillColo;  //On défini la couleur de remplissage du cercle (qui vaut la variable de couleur FillColo)
		tmp_ctx.lineWidth = lineSiz; //On défini la taille des lignes du cercle
		tmp_ctx.strokeStyle = strokeColo; //On défini la couleur des lignes extérieures du cercle
		tmp_ctx.arc(x, y, radius, 0, Math.PI*2, false); //Permet d'ajouter un arc de cercle  au tracé, en le centrant aux positions (x, y) et avec un rayon r qui démarre à angleDépart et qui finit à angleFin, dans la direction de sensAntiHoraire (par défaut en sens horaire).
		// tmp_ctx.arc(x, y, 5, 0, Math.PI*2, false); //Ne fonctionne pas
		tmp_ctx.stroke(); //Dessine le chemin actuel ou donné avec le style de trait actuel utilisant la règle d'enroulement non nulle.
		tmp_ctx.fill(); //Remplit le chemin courant ou donné avec la couleur de fond en cours, en utilisant la règle de remplissage extérieur/intérieur non nul ou la règle de remplissage pair/impair.
		tmp_ctx.closePath(); //Provoque le retour du stylo au point de départ du sous-traçé courant. Il le fait en ajoutant une ligne droite entre le point courant et le point rejoint. Si la figure a déjà été fermée ou n'est constituée que d'un seul point, cette méthode ne provoque rien.
	};

	var onPaintLine = function() { //Fonction pour dessiner la ligne
		//console.log("fonction ligne");
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height); //On clear le canevas temporaire avant de dessiner
		tmp_ctx.beginPath(); //Permet de commencer un nouveau chemin en vidant la liste des sous-chemins
		tmp_ctx.moveTo(start_mouse.x, start_mouse.y); //Déplace le point de départ d'un nouveau sous-chemin vers les coordonnées (x, y).
		tmp_ctx.lineTo(mouse.x, mouse.y); //Connecte le dernier point du sous-chemin en cours aux coordonnées x, y spécifiées avec une ligne droite (sans tracer réellement le chemin).
		tmp_ctx.fillStyle = fillColo;  //On défini la couleur de remplissage de la ligne (qui vaut la variable de couleur FillColo)
		tmp_ctx.lineWidth = lineSiz; //On défini la taille de la ligne
		tmp_ctx.strokeStyle = strokeColo; //On défini la couleur des lignes extérieures de la ligne
		tmp_ctx.stroke(); //Dessine le chemin actuel ou donné avec le style de trait actuel utilisant la règle d'enroulement non nulle.
		tmp_ctx.closePath();//Provoque le retour du stylo au point de départ du sous-traçé courant. Il le fait en ajoutant une ligne droite entre le point courant et le point rejoint. Si la figure a déjà été fermée ou n'est constituée que d'un seul point, cette méthode ne provoque rien.
	};

	var onPaintPencil = function() { //Fonction pour dessiner au pinceau
		//console.log("fonction pinceau");
		ppts.push({x: mouse.x, y: mouse.y}); //On push x et y dans la liste de points
		if (ppts.length < 3) { //On regard le nombre de point actuel
			var b = ppts[0]; //On défini b en tant que liste contenant juste 0
			tmp_ctx.beginPath(); //Permet de commencer un nouveau chemin en vidant la liste des sous-chemins
			tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
			tmp_ctx.fillStyle = fillColo;  //On défini la couleur du pinceau (qui vaut la variable de couleur FillColo)
			tmp_ctx.lineWidth = lineSiz; //On défini la taille des lignes du pinceau (brush)
			tmp_ctx.strokeStyle = strokeColo; //On défini la couleur des lignes extérieures du pinceau
			tmp_ctx.closePath(); //Provoque le retour du stylo au point de départ du sous-traçé courant. Il le fait en ajoutant une ligne droite entre le point courant et le point rejoint. Si la figure a déjà été fermée ou n'est constituée que d'un seul point, cette méthode ne provoque rien.
			return;
		}
		tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height); //On clear le canevas temporaire avant de dessiner
		tmp_ctx.beginPath(); //Permet de commencer un nouveau chemin en vidant la liste des sous-chemins
		tmp_ctx.fillStyle = fillColo; //On défini la couleur du pinceau (qui vaut la variable de couleur FillColo)
		tmp_ctx.lineWidth = lineSiz; //On défini la taille des lignes du pinceau (brush)
		tmp_ctx.strokeStyle = strokeColo; //On défini la couleur des lignes extérieures du pinceau
		tmp_ctx.moveTo(ppts[0].x, ppts[0].y); //Déplace le point de départ d'un nouveau sous-chemin vers les coordonnées (0,x et 0,y).
		
		for (var i = 1; i < ppts.length - 2; i++) { //On boucle pour savoir le nombre de points à placer
			var c = (ppts[i].x + ppts[i + 1].x) / 2; //On regarde dans la liste les valeurs de x pour les stocker dans la valeur de c
			var d = (ppts[i].y + ppts[i + 1].y) / 2; //On regarde dans la liste les valeurs de y pour les stocker dans la valeur de d
			tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d); //Ajoute une courbe de Bézier quadratique au sous-chemin courant. Elle requiert deux points: le premier est le point de contrôle et le second est le point d'arrivée. Le point de départ est le dernier point du chemin courant, qui peut être changé au moyen de la méthode moveTo() avant de créer la courbe quadratique de Bézier.
		}
		
		// Pour les deux derniers points
		tmp_ctx.quadraticCurveTo( //Ajoute une courbe de Bézier quadratique au sous-chemin courant. Elle requiert deux points: le premier est le point de contrôle et le second est le point d'arrivée. Le point de départ est le dernier point du chemin courant, qui peut être changé au moyen de la méthode moveTo() avant de créer la courbe quadratique de Bézier.
			ppts[i].x, //On prend la valeur de i dans la liste et on transfère dans x
			ppts[i].y, //On prend la valeur de i dans la liste et on transfère dans y
			ppts[i + 1].x, //On prend la valeur de i + 1 dans la liste et on transfère dans x
			ppts[i + 1].y  //On prend la valeur de i + 1 dans la liste et on transfère dans y
		);
		tmp_ctx.stroke(); //Dessine le chemin actuel ou donné avec le style de trait actuel utilisant la règle d'enroulement non nulle.
	};
	


//---------------------------Fin de Fonctions pour dessiner les formes - Complqué ---------------------------------------










//---------------------------Fonction de clear du canevas---------------------------------------

	// Quand on clique sur le bouton de clear du canevas
	clearBtn.addEventListener('click', function() {
		clearCanvas(); //On lance la fonction clearCanevas
	}, false);


	var clearCanvas = function() {		
		var answer = confirm("Voulez vous vraiment effacer votre dessin ?\nAppuyez sur OK pour continuer.");
        if (answer) //Si on clique sur oui dans la pop up alors le canevas se clear
            ctx.clearRect(0, 0, canvas.width, canvas.height); //On clear
				
	};


//---------------------------Fin de Fonction de clear du canevas---------------------------------------		
	
	
	
	
	
	
	
	
	
	
	
//---------------------------Fonction de sauvegarde du dessin---------------------------------------
	
	setUpSave(); //On lance la fonction de sauvegarde afin que l'écouteur écoute si jamais on appuie sur le bouton
	
	function setUpSave() {
		saveEl.addEventListener("click", save);
	}

	function save() {
		//var savename = document.getElementById("savename").value.trim();
		var text = prompt('Vous avez fini ? Merveilleux !\nQuel nom voulez vous donner à votre dessin ?'); //On demande le nom du fichier avec une box

		if (text === null) { //Si l'utilisateur ne rentre rien
			console.log('L\'utilisateur a cliqué sur "Annuler".');
		} else if (text === "") { //Si l'utilisateur met un espace
			alert("Veuillez entrer un nom pour sauvegarder votre dessin" )
			console.log('L\'utilisateur n\'a saisi aucune valeur.');
		} else { //Si l'utilisateur mets un nom de fichier
			console.log('Bonjour ' + text + ' !'); //Test pour récupérer la valeur du nom
			let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); //On push le canevas en dataURL et on remplace l'image en png
			let link = document.createElement('a'); //On crée l'élément afin que le téléchargement puisse se faire
			link.download = text +".png"; //On n'oublie pas l'extention de fichier en .png
			link.href = image; //On récupére le dessin
			link.click(); //On télécharge le fichier
			alert("Votre dessin a bien été sauvegardé dans vos téléchargements"); //On affiche une confirmation de téléchargement
		}

	}

//---------------------------Fin de Fonction de sauvegarde du dessin---------------------------------------	










//---------------------------Fonction Gomme - Mode Gomme ---------------------------------------

btOn.disabled = false //Au départ on active le bouton On car le mode gomme de base est désactivé
btOff.disabled = true //Au départ on désactive le bouton Off car le mode gomme de base est désactivé
modeGomme = false //On set le mode gomme au départ à false

colornormal.style.display = "true"; //On affiche les couleurs normales avec les inputs color normaux
colorblanc.style.display = "none"; //On affiche les couleurs blanches dans le inputs color blancs

function setUpBlanc() { //Fonction qui permet de dire qu'on est en mode gomme
		colornormal = document.getElementById('colornormal');
		colorblanc = document.getElementById('colorblanc');
		colornormal.style.display = "none"; //On gère l'affichage des div / normales / blanches
		colorblanc.style.display = "flex"; //On gère l'affichage des div / normales / blanches
		modeGomme = true //On active le mode gomme
	}
	
function setUpNormal() { //Fonction qui permet de dire qu'on est en mode couleurs normales
		colornormal = document.getElementById('colornormal');
		colorblanc = document.getElementById('colorblanc');
		colornormal.style.display = "flex"; //On gère l'affichage des div / normales / blanches
		colorblanc.style.display = "none"; //On gère l'affichage des div / normales / blanches
		modeGomme = false //On désactive le mode gomme
	}
	
//https://www.w3schools.com/jsref/prop_style_display.asp 
//Pour de l'aide sur .style.display (pas mettre table-row, ni inherit, ni initial, flex c'est parfait)


$("#btOn").click(function () { //Quand on clique sur le btOn -> Mode gomme activé
	
    //alert("btOn activé");
	
		setUpBlanc() //On active la fonction qui permet d'activer le mode gomme
	
		strokeColo = "#ffffff"; //On défini la couleur de l'input color du pinceau à blanc
		fillColo = "#ffffff"; //On défini la couleur de l'input color du remplissage à blanc
		brush_size_box.style.backgroundColor = "#ffffff"; //On défini l'aperçu du pinceau à blanc
		//strokecolor.value = "#ffffff";
		//fillcolor.value = "#ffffff";
		
			
    //Fonctionne :
    btOn.disabled = true //On désactive le bouton On
    btOff.disabled = false //On active le bouton Off

    //Ne fonctionne pas :
    //btOff.outerHTML = "<button class=\"btn btn-primary\" type=\"button\" id=\"btOff\">Off</button>";
    //btOn.outerHTML = "<button class=\"btn btn-primary disabled\" type=\"button\" id=\"btOn\">On</button>";


});

$("#btOff").click(function () { //Quand on clique sur le btOff
    //alert("btOff activé");

	setUpNormal()
	
	strokeColo = strokeBtn.value; //On défini la couleur de l'input color du pinceau à sa couleur normale (de l'input)
	fillColo = fillBtn.value; //On défini la couleur de l'input color du remplissage à sa couleur normale (de l'input)
	brush_size_box.style.backgroundColor = strokeBtn.value; //On défini l'aperçu du pinceau à sa couleur normale (de l'input)

    //Fonctionne :
    btOn.disabled = false //On active le bouton On
    btOff.disabled = true //On désactive le bouton Off

    //Ne fonctionne pas :
    //btOff.outerHTML = "<button class=\"btn btn-primary disabled\" type=\"button\" id=\"btOff\">Off</button>";
    //btOn.outerHTML = "<button class=\"btn btn-primary\" type=\"button\" id=\"btOn\">On</button>";


});


//---------------------------Fin de Fonction Gomme - Mode Gomme ---------------------------------------










//---------------------------Taille et couleur du pinceau et de son aperçu ---------------------------------------

//colorBoxEl.style.backgroundColor = strokecolor;
brush_size_box.style.backgroundColor = strokecolor.value; //On défini la couleur de l'aperçu en fonction de la couleur de l'input color du pinceau (strokecolor) et ne pas oublier .value sinon ca ne fonctionne pas

strokecolor.addEventListener("change", () => { //On regarde quand l'input color du pinceau change, alors on définir les couleurs en conséquences
        //alert(strokecolor.value);
		brush_size_box.style.backgroundColor = strokecolor.value; //On change la couleur de l'aperçu en fonction de la couleur de l'input color du pinceau (strokecolor) et ne pas oublier .value sinon ca ne fonctionne pas
    });
	

setUpBrushSize(); //On appelle la fonction afin que l'écouteur écoute si on change

brushSizeRangeEl = document.getElementById("lineweight"); //On récupère l'ID de l'input range

function changeBrushSizeBoxSize(size) {
    brush_size_box.style.width = `${size}px`; //On défini la largeur de la boule d'aperçu avec la taille qui correspond
    brush_size_box.style.height = `${size}px`; //On défini la hauteur de la boule d'aperçu avec la taille qui correspond
}

function setUpBrushSize() {
	brushSizeRangeEl = document.getElementById("lineweight"); //On récupère l'ID de l'input range
    changeBrushSizeBoxSize(brushSizeRangeEl.value); //On change la taille par défaut de l'aperçu avec les bonnes dimensions
    
    brushSizeRangeEl.addEventListener("change", () => {
        changeBrushSizeBoxSize(brushSizeRangeEl.value); //Si la taille du pinceau change alors on change aussi l'aperçu
    });
}


//---------------------------Fin de Taille et couleur du pinceau et de son aperçu ---------------------------------------










//---------------------------Undo et redo---------------------------------------

var PushCanvasArray = []; //On défini une liste de points pour savoir quand on peut undo et redo
var currentStep = -1; //On défini l'étape actuelle à -1 pour qu'on ne puisse pas undo dans le vide et à l'inverse redo quelque chose qui n'existe pas

$("#undo").click(function () { //Quand on clique sur le bouton undo
    Undo(); //On appelle la fonction Undo

});

$("#redo").click(function () { //Quand on clique sur le bouton redo
    Redo(); //On appelle la fonction Redo

});


// à chaque fois que l'utilisateur dessine ou ajoute quelque chose au canevas cPush() est appelé
function cPush() {
    currentStep++; //On ajoute +1 à l'étape actuelle afin de pouvoir undo et redo
    if (currentStep < PushCanvasArray.length) { PushCanvasArray.length = currentStep; } //Si l'étape actuelle est inférieure à la taille de la liste, alors on peut push le canevas en dataURL et on défini la taille actuelle de la liste égale à l'étape actuelle
    PushCanvasArray.push(document.getElementById("canvas").toDataURL()); //On push le canevas en dataURL pour pouvoir le récupérer à l'instant t

}

// Action undo
function Undo() {
    if (currentStep > 0) { //Si l'étape actuelle est supérieure à 0 alors ça veut dire qu'on peut undo, sinon ce n'est pas le cas
        currentStep--; //On enlève -1 à l'étape actuelle

        ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height); //On clear le canevas rapidement
        var canvasPic = new Image(); //On défini une nouvelle fonction image
        canvasPic.src = PushCanvasArray[currentStep]; //On récupère l'image du canevas à l'étape t-1
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); } //On print l'image du canevas aux coordonnées 0 0 donc à l'origine
    }
    //else{
		//undo.disabled = true
        //alert("Vous ne pouvez plus revenir en arrière. \nEssayez la fonction \"Effacer\" pour avoir une page blanche.");

    //}
}

// Action redo
function Redo() {

    if (currentStep < PushCanvasArray.length-1) { //Si l'étape actuelle est inférieure à la longeur de la liste de push -1 forcément car on ne peut pas être en -5 par exemple alors ça veut dire qu'on peut redo, sinon ce n'est pas le cas
        currentStep++; //On ajout +1 à l'étape actuelle

        ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height); //On clear le canevas rapidement
        var canvasPic = new Image(); //On défini une nouvelle fonction image
        canvasPic.src = PushCanvasArray[currentStep]; //On récupère l'image du canevas à l'étape t+1
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); } //On print l'image du canevas aux coordonnées 0 0 donc à l'origine
    }
	//else{
		//redo.disabled = true
        //alert("Redooo");

    //}
}

//---------------------------Fin Undo et redo---------------------------------------










//---------------------------Couleurs---------------------------------------

//Je crée des variables de couleurs afin que si je veux les changer je les change uniquement ici et dans le css forcément
couleur1 = "#000000"
couleur2 = "#FFFFFF"
couleur3 = "#880015"
couleur4 = "#ED1C24"
couleur5 = "#FF7F27"
couleur6 = "#FFF200"
couleur7 = "#22B14C"
couleur8 = "#00A2E8"
couleur9 = "#3F48CC"
couleur10 = "#A349A4"

$("#coul1").click(function () { //Quand on clique sur le coul1
    //alert("coul1 activé");

	//strokecolor.outerHTML = "<input type=\"color\" id=\"strokecolor\" value=\"#000000\">";
	//Ne fonctionne pas car n'écoute plus le changement si par la suite on rechange la couleur via l'input
	//C'est à dire ne détecte plus le " addEventListener("change" blablabla " donc ça ne marche plus

	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {  //Si c'est la palette de couleurs qui change le pinceau
		//Ici je n'ai pas réussi à faire avec une variable donc j'ai fais un truc tout moche avec l'innerText du "smallPredef"
		strokeColo = couleur1; //La couleur du pinceau est égale à la couleur 1
		strokecolor.value = couleur1; //La couleur de fond de l'input color du pinceau est égale à la couleur 1
		brush_size_box.style.backgroundColor = couleur1; //La couleur de l'aperçu du pinceau est égale à la couleur 1
	}
	else{ //Si c'est la palette de couleur qui change le remplissage
		fillColo = couleur1; //La couleur de remplissage est égale à la couleur 1
		fillcolor.value = couleur1; //La couleur de fond de l'input remplissage du pinceau est égale à la couleur 1
		//On ne défini pas le backgroundColor de brush_size_box car celui-ci représente la couleur du pinceau et non celle du remplissage
	}

});


$("#coul2").click(function () { //Quand on clique sur le coul2
	//alert("coul2 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur2;
		strokecolor.value = couleur2;
		brush_size_box.style.backgroundColor = couleur2;
	}
	else{
		fillColo = couleur2;
		fillcolor.value = couleur2;
	}

});


$("#coul3").click(function () { //Quand on clique sur le coul3
    //alert("coul3 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur3;
		strokecolor.value = couleur3;
		brush_size_box.style.backgroundColor = couleur3;
	}
	else{
		fillColo = couleur3;
		fillcolor.value = couleur3;
	}

});


$("#coul4").click(function () { //Quand on clique sur le coul4
    //alert("coul4 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur4;
		strokecolor.value = couleur4;
		brush_size_box.style.backgroundColor = couleur4;
	}
	else{
		fillColo = couleur4;
		fillcolor.value = couleur4;
	}

});


$("#coul5").click(function () { //Quand on clique sur le coul5
    //alert("coul5 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur5;
		strokecolor.value = couleur5;
		brush_size_box.style.backgroundColor = couleur5;
	}
	else{
		fillColo = couleur5;
		fillcolor.value = couleur5;
	}

});


$("#coul6").click(function () { //Quand on clique sur le coul6
    //alert("coul6 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur6;
		strokecolor.value = couleur6;
		brush_size_box.style.backgroundColor = couleur6;
	}
	else{
		fillColo = couleur6;
		fillcolor.value = couleur6;
	}

});


$("#coul7").click(function () { //Quand on clique sur le coul7
    //alert("coul7 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur7;
		strokecolor.value = couleur7;
		brush_size_box.style.backgroundColor = couleur7;
	}
	else{
		fillColo = couleur7;
		fillcolor.value = couleur7;
	}
});


$("#coul8").click(function () { //Quand on clique sur le coul8
    //alert("coul8 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur8;
		strokecolor.value = couleur8;
		brush_size_box.style.backgroundColor = couleur8;
	}
	else{
		fillColo = couleur8;
		fillcolor.value = couleur8;
	}

});


$("#coul9").click(function () { //Quand on clique sur le coul9
    //alert("coul9 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur9;
		strokecolor.value = couleur9;
		brush_size_box.style.backgroundColor = couleur9;
	}
	else{
		fillColo = couleur9;
		fillcolor.value = couleur9;
	}

});


$("#coul10").click(function () { //Quand on clique sur le coul10
    //alert("coul10 activé");
	//Les commentaires sont les mêmes que pour coul1, s'y référer si besoin !!
	if (smallPredef.innerText == "Attention : Cette action changera la couleur actuelle de votre pinceau") {
		strokeColo = couleur10;
		strokecolor.value = couleur10;
		brush_size_box.style.backgroundColor = couleur10;
	}
	else{
		fillColo = couleur10;
		fillcolor.value = couleur10;
	}
});

//---------------------------Fin Couleurs---------------------------------------










//---------------------------Raccourcis claviers---------------------------------------
//console.log(strokecolor)

	//On écoute la frappe du clavier et on lance la fonction handleKeyDown
	document.addEventListener("keydown", handleKeyDown);


	function handleKeyDown(e) {
		if ((e.key && e.key == "U") || (e.keyCode && e.keyCode == 85)) Undo(); //Si on appuie sur U ou que le code de la touche est 85 alors on lance la fonction Undo()
		if ((e.key && e.key == "R") || (e.keyCode && e.keyCode == 82)) Redo(); //Si on appuie sur R ou que le code de la touche est 82 alors on lance la fonction Redo()
		if ((e.key && e.key == "C") || (e.keyCode && e.keyCode == 67)) controles(); //Si on appuie sur C ou que le code de la touche est 67 alors on lance la fonction controles()
		if ((e.key && e.key == "M") || (e.keyCode && e.keyCode == 77)) menu(); //Si on appuie sur M ou que le code de la touche est 77 alors on lance la fonction menu()
		if ((e.key && e.key == "S") || (e.keyCode && e.keyCode == 83)) save(); //Si on appuie sur S ou que le code de la touche est 83 alors on lance la fonction save()
		if ((e.key && e.key == "E") || (e.keyCode && e.keyCode == 69)) clearCanvas(); //Si on appuie sur E ou que le code de la touche est 69 alors on lance la fonction clearCanvas()
		if ((e.key && e.key == "G") || (e.keyCode && e.keyCode == 71)) toucherG(); //Si on appuie sur G ou que le code de la touche est 71 alors on lance la fonction toucherG()
		if ((e.key && e.key == "+") || (e.keyCode && e.keyCode == 107)) augTaille(); //Si on appuie sur + ou que le code de la touche est 107 alors on lance la fonction augTaille()
		if ((e.key && e.key == "-") || (e.keyCode && e.keyCode == 109)) dimTaille(); //Si on appuie sur - ou que le code de la touche est 109 alors on lance la fonction dimTaille()
	}

	var controles = function() { //Ici c'est l'affichage de l'alert "Contrôles" avec le texte qui correspond
		alert("Augmenter la taille du pinceau (bêta) : + \nDiminuer la taille du pinceau (bêta) : - \nAfficher / Cacher le menu : M  \nMode Gomme : G  \nSauvegarder : S \nContrôles : C \nEffacer : E \nUndo : U \nRedo : R   ");
	};

	var menu = function() {
		btMenu.click(); //Ici on fait en sorte que si la touche M est appelée alors on lance la fonction menu qui fait elle en sorte de simuler l'appuie sur le bouton btMenu
	};

	var toucherG = function() {
		//alert(modeGomme)
		if (modeGomme == true) {
			//alert("Mode gomme activé")
			btOff.click(); //Si c'est activé on le désactive -> Similation d'appuie sur le Bouton OFF pour ne pas tout réécrire le code
		}
		else{
			//alert("Pas de mode gomme activé")
			btOn.click(); //Si c'est pas activé on l'active -> Similation d'appuie sur le Bouton ON pour ne pas tout réécrire le code

		}
	};


	var augTaille = function() { //Ici c'est la fonction qui permet d'augmenter la taille de l'aperçu du pinceau si on appuie sur la touche +
		//alert("Test +");
		lineweight.value ++  ;
		//console.log(brushSizeRangeEl.value);

		changeBrushSizeBoxSize(brushSizeRangeEl.value); //On change la taille de l'aperçu avec la fonction changeBrushSizeBoxSize
		lineSiz ++; //On augmente de +1 la taille du pinceau
		document.getElementById("rangeSize").value = brushSizeRangeEl.value;  //On récupère l'ID de l'input et on l'affecte à la valeur de la taille du pinceau

	};

	var dimTaille = function() { //Ici c'est la fonction qui permet de diminuer la taille de l'aperçu du pinceau si on appuie sur la touche -
		//alert("Test -");
		lineweight.value --  ; //On réduit de 1 la valeur de l'input range lineweight
		//console.log(brushSizeRangeEl.value);

		changeBrushSizeBoxSize(brushSizeRangeEl.value); //On change la taille de l'aperçu avec la fonction changeBrushSizeBoxSize
		lineSiz --; //On réduit de -1 la taille du pinceau
		document.getElementById("rangeSize").value = brushSizeRangeEl.value; //On récupère l'ID de l'input et on l'affecte à la valeur de la taille du pinceau
	};



	$("#btControles").click(function () { //Quand on clique sur le controles (bt)
		controles(); //On lance simplement la fonction controles() qui elle lance l'alert avec le texte et les touches (M / S / C / U / R / etc.)
	});


//---------------------------Fin Racourcis clavier---------------------------------------









//---------------------------Couleurs prédéfinies---------------------------------------
	//Ici on effectue le changement de div pour les palettes de couleurs -> Savoir en fonction du titre si au clic de l'utilisateur la couleur doit changer la couleur du pinceau ou celle de remplissage
	coulPredefRemp.style.display = "none"; //Par défaut les couleurs de remplissages sont cachées
	//console.log(smallPredef);


	$("#flechePinceau").click(function () { //Quand on clique sur la fleche de droite (bt)
		coulPredefPinc.style.display = "none"; //On cache le texte pour dire que ca change entre pinceau et remplissage
		coulPredefRemp.style.display = "block"; //On affiche le texte pour dire que ca change entre pinceau et remplissage
		smallPredef.innerText = "Attention : Cette action changera la couleur actuelle de remplissage" //On change le texte du small juste en dessous du h1


	});

	$("#flecheRemp").click(function () { //Quand on clique sur la fleche de gauche (bt)
		coulPredefPinc.style.display = "block"; //On affiche le texte pour dire que ca change entre pinceau et remplissage
		coulPredefRemp.style.display = "none"; //On cache le texte pour dire que ca change entre pinceau et remplissage
		smallPredef.innerText = "Attention : Cette action changera la couleur actuelle de votre pinceau" //On change le texte du small juste en dessous du h1


	});

//---------------------------Fin de Couleurs prédéfinies---------------------------------------


//---------------------------Fin du JAVASCRIPT---------------------------------------
