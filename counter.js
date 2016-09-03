function counter(list,
	timeout,
	backgroundStyle,
	contentDivStyle,
	textStyle
) {
	var toHyphencase = function(word) {
		return word.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	var overlay = document.createElement('div');
	var overlayContent = document.createElement('div');
	var overlayContentText = document.createElement('h1');

	document.body.style.margin = 0;

	var overlayStyle = {
		'height' :'100vh',
		'width' :'100vw',
		'z-index': 1000,
		'position': 'fixed',
	    'left' :0,
	    'top' :0,
	    'background-color' :'rgb(0,0,0)',
	    'overflow-x' :'hidden',
	    'overflow-y' :'hidden',
    	'transition' :'0.3s',
    	'opacity': '1'
	}

    if(backgroundStyle) {
		for (var key in backgroundStyle) {
			overlayStyle[key] = backgroundStyle[key];
		}    	
    }
    var overlayStyleString = JSON.stringify(overlayStyle).slice(1,-1).replace(/,/g,';').replace(/"/g,'').replace(/'/g, '')
    overlay.setAttribute('style', overlayStyleString);

    var overlayContentStyle = {
		'position' :'relative',
	    'top' :'25%',
	    'width' :'100%',
	    'text-align' : 'center',
	    'margin-top' : '17vh',
    	'transition' :'0.3s'
	}

    if(contentDivStyle) {
    	for (var key in contentDivStyle) {
    		overlayContentStyle[key] = contentDivStyle[key];
    	}
    }
    var overlayContentStyleString = JSON.stringify(overlayContentStyle).slice(1,-1).replace(/,/g,';').replace(/"/g,'').replace(/'/g,'');
    overlayContent.setAttribute('style', overlayContentStyleString);

    overlayContentTextStyle = {
    	'transition': '0.3s'
    }

    if (textStyle){
    	for (var key in textStyle) {
			var key1 = toHyphencase(key);
    		overlayContentTextStyle[key1] = textStyle[key];
    	}
    }
    var overlayContentTextStyleString = JSON.stringify(overlayContentTextStyle).slice(1,-1).replace(/,/g,';').replace(/"/g,'').replace(/'/g, '');
    overlayContentText.setAttribute('style', overlayContentTextStyleString);

	overlayContent.appendChild(overlayContentText);
	overlay.appendChild(overlayContent);
	document.body.appendChild(overlay);

	var updateOverlay = function(e) {
		overlayContentText.innerHTML = String(e);
	}

	updateOverlay(list[0]);

	var c = list.length;
	var i = 1;

	var id = setInterval(function() {
		updateOverlay(list[i]);
		i++;
		if (i === c) {
			clearInterval(id);
			setTimeout(function() {
				overlay.style.opacity = 0;
				overlayContentText.style.opacity = 0;
				overlayContent.style.opacity = 0;
			}, timeout);
		}
	}, timeout);

}

counter(
	["Hey, I just met you..", "And this is crazy !", "But here's my software...", "So use that, maybe!!"],
	2500,
	{
		'background-color': "#111",
	},
	{
		'color': '#eee'
	},
	{
		'font-size': '60px',
		'font-family': "'Roboto', sans-serif",
		'font-weight': '500'
	});

