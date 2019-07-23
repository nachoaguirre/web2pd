function objetus(file) {
    xmlhttp              = false;
    this.requestFile     = file;
    this.encodeURIString = true;
    this.execute         = false;
    
    if(window.XMLHttpRequest) { 
        this.xmlhttp = new XMLHttpRequest();
        if(this.xmlhttp.overrideMimeType) {
			this.xmlhttp.overrideMimeType('text/xml');
        }
    } 
    else if(window.ActiveXObject) { // IE
        try {
            this.xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch(e) {
            try {
                this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch(e) {
                this.xmlhttp = null;
            }
        }
        if(!this.xmlhttp && typeof XMLHttpRequest != 'undefined') {
            this.xmlhttp = new XMLHttpRequest();
            if (!this.xmlhttp){
                this.failed = true; 
            }
        } 
    }
    return this.xmlhttp ;
}

function web2pd(message) { 
	pagina = "web2pd.php";
    ajax    = objetus(pagina);
    
    if(message != ""){
        ajax.open("POST", pagina+"?value="+message,true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.send(message);
        
        var tm = new Date();
		var date = tm.getFullYear()+'-'+(tm.getMonth()+1)+'-'+tm.getDate()+' '+tm.getHours()+":"+tm.getMinutes()+":"+tm.getSeconds();
        var el = document.getElementById('verbose'),
		elChild = document.createElement('li');
		elChild.innerHTML = '['+date+'] Sent: ' + message;
		el.insertBefore(elChild, el.firstChild);
    } else {
        ajax.send(null);
    }


} 
