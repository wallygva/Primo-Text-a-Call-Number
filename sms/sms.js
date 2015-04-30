// JavaScript Document

// set this to be the URL for the SMS script
// move this to the config.php one of these days
var smsurl = "http://lso.gmu.edu/primo/sms.php?";

function showsms(sms_result_id) {
   
	/*   This function shows the SMS layer and creates the form   */

	try {

		var title = '';
		var availability = '';
		var debug = 0;
		
		if(sms_result_id >= 0)
		{
			$(".EXLResultTitle").each(function( index ){
				if(index == sms_result_id)
				{
					title = $(this).text().trim();
				}
			});
		}
		else
		{
			$(".EXLResultTitle").each(function( index ){
				title = $(this).text().trim();
			});
		}
		
		var sms = document.getElementById('sms');	// this is the DIV that we're going to put the text into
		// we'll load the 'out' variable with all the html and then put it into the sms div
		var out = "<div id='smstop'>Send the title, location, and call number of this item to your cell phone</div><div id='smsmain'><div id='smsinput'><form name='sms_form' method=post><p><b>Title</b>: "+ title +"</p>";

		out += '<input type=hidden name="title" value=\"'+title+'\">';	//dump the title into a hidden form variable
		out += '<p style="padding:5px 0;"><b>Enter your cell phone #</b>: <input name=phone type=text>';	// input for the phone #
		out += "<p style='padding:5px 0;'><b>Select your provider:</b> <select name=provider>";	// pull-down for each of phone carriers the values will be parsed by the perl script
		out += "<option value=cingular>AT&amp;T</option>";
		out += "<option value=cricket>Cricket</option>";
		out += "<option value=sprint>Sprint</option>";
		out += "<option value=tmobile>T-Mobile</option>";
		out += "<option value=verizon>Verizon</option>";
		out += "<option value=virgin>Virgin</option>";
		out += "</select></p>";
		out += "<p><ol>";
	 
	
		// display availability
		if(sms_result_id >= 0)
			availability = $("#RTADivTitle_"+sms_result_id).text().trim();
		else
			availability = $(".EXLResultStatusAvailable").text().trim();
			
		out += '<li style="margin-left:30px; margin-bottom:10px;"><input checked="1" type="radio" name="loc" value="'+availability+'">'+availability+'</li>';

		// close the list and add note
		out += "</ol>";
		out += "<p style='padding:5px 0;'><strong>NOTE:</strong> Carrier charges may apply if your cell phone service plan does not include free text messaging.</p></div>";
		// add buttons at bottom.  note the return false which stops the forms from actually doing anything
		out += "<p style='margin: 10px 0; text-align:center;'><a href='#here' id='sendmessage' class='smsbutton' onClick='sendSMS();return false;'>Send Text</a>&nbsp;&nbsp;<a href='#here' class='smsbutton' id='clearmessage' onClick='clearsms();return false;'>Cancel</a></p>";
		// we use the innerHTML property to actually set the HTML into the page
		sms.innerHTML = out+"</form></div>";

		// now we make the div visible
		sms.style.visibility = 'visible';
		sms.style.display = 'block';
		// some fancy positioning
		//findPos(document.getElementById('smsbutton'),sms,25,-320);
	} catch (e) {
		// doesn't work?  hide the SMS buttons
		// console.log("doesn't work... potentially hide the sms feature " + e);
		//document.getElementById('smsfeatures').style.visibility='hidden';
	}
	
	//return false;
	//e.preventDefault();
}


function sendSMS(location) {
    var frm = document.sms_form;			// get the SMS form
	var phone = frm.phone.value;			// get the phone #
	phone = phone.replace(/[^\d]/ig,"");	// remove all non-digit characters
	if (phone.length == 10) {				// if 10 chars, we're good
	var url = smsurl;						// start creating the URL
		url += "&number="+encodeURIComponent(phone);	// html escape #
		url += "&title="+encodeURIComponent(frm.title.value);
		url += "&provider="+encodeURIComponent(frm.provider.options[frm.provider.selectedIndex].value);	// html escpae provider
		for (i=0;i<frm.loc.length;i++) {		// for each item, get the checked one 
			if (frm.loc[i].checked == true) {	// if checked, add it to the URL
				url += "&item="+encodeURIComponent(frm.loc[i].value);
			}
		}
		if (frm.loc.length == undefined) {		// if just one, should not come to this
			url += "&item="+encodeURIComponent(frm.loc.value);		
		}

	var bodyRef = document.getElementsByTagName("body")[0]; //get the bib number out of the <body>, add it to the url
	var bodyText = bodyRef.innerHTML;
	var bibNum = bodyText.match(/b[\d]{7}/m);
	url += "&bib="+bibNum;
	 
	 var head = document.getElementsByTagName("head")[0];		// now we create a <SCRIPT> tag in the <HEAD> to get the response
   	 var script = document.createElement('script');
   	 script.setAttribute('type','text/javascript');
   	 script.setAttribute('src',url);							// the script is actually the PERL script 
   	 head.appendChild(script);									// append the script
	} else {		// invalid phone #, send message
	  alert('please enter a valid phone #');
      }
   }
	
// clear/hide the SMS DIV
function clearsms() {
	var sms = document.getElementById('sms');
	sms.style.visibility = 'hidden';
	sms.style.display = 'none';
}
	 

/*
// get the position of an item, good for putting the SMS form in a useful place
function findPos(obj,obj2,lofset,tofset) {
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	obj2.style.left = curleft+lofset;
	obj2.style.top = curtop+tofset;
//	return [curleft,curtop];
}
*/

// Grab the bib number of the item
   function getbib() {
     var buttonBlock = document.getElementById('navigationRow').innerHTML;
	 sms.style.visibility = 'hidden';
	 sms.style.display = 'none';
	 }
