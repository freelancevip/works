window.onload = function() {
	function getXmlHttp(){
		var xmlhttp;
		try {
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (E) {
				xmlhttp = false;
			}
		}
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
			xmlhttp = new XMLHttpRequest();
		}
		return xmlhttp;
	}
	
	/* Popup */
	function makePopup() {
		//overlay
		var overlay = document.createElement("div");
		overlay.setAttribute("id", 'overlay');
		overlay.setAttribute("class", 'overlay hidden');
		document.body.appendChild(overlay); 
		// popup
		var popup = document.createElement("div");
		popup.setAttribute("id", 'popup');
		popup.setAttribute("class", 'popup hidden');
		document.body.appendChild(popup);
		// popup-inner (relative)
		var popupInner = document.createElement("div");
		popupInner.setAttribute("id", 'popup-inner');
		popupInner.setAttribute("class", 'popup-inner');
		document.getElementById("popup").appendChild(popupInner);
	}
	
	function showPopup(content) {
		document.getElementById("overlay").className = "overlay";
		document.getElementById("popup").className = "popup";
		document.getElementById("popup-inner").innerHTML = content;
	}
	
	function closePopup () {
		document.getElementById("overlay").className = "overlay hidden";
		document.getElementById("popup").className = "popup hidden";
		document.getElementById("popup-inner").innerHTML = '';
	}

	/* Send reques */
	function getArticle() {
		var elemId = this.getAttribute("date-link");
        var url = elemId.replace(/-st-.*/, '') + '.php?mode=one_article&articleId='+ elemId;
		url = url.trim();

		var req = getXmlHttp();
		req.onreadystatechange = function() {
			
			if (req.readyState == 4) {
				
				if(req.status == 200) {
					showPopup(req.responseText);
				}
			}

		}

		req.open('GET', url, true);

		req.send(null);
		
	}
	
	function attachEventsToLinks() {
		
		var links = document.getElementsByClassName("open-law");

		for(var i=0;i<links.length;i++){
			links[i].addEventListener('click', getArticle, false);
		}
	}
	
	function attachEventToClosePopup() {
		document.getElementById("overlay").addEventListener('click', closePopup, false);
	}
	
	makePopup();
	attachEventsToLinks();
	attachEventToClosePopup();


}