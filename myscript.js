var accts = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "ESL_SC2", "OgamingSC2", "brunofin", "comster404"];
//var accts = ["freecodecamp", "brunofin", "comster404"];
var status,
	streamStatus,
	logo, streamName, description, link, singleAcct, offline = [];
// perhaps create three arrays...active, undefined and offline, then fill DOM in the wanted order.


// get account status
$(document).ready(function () {
  
	accts.forEach(function (singleAcct) {
		$.getJSON('https://api.twitch.tv/kraken/streams/' + singleAcct + '?callback=?', function (data) {
			streamStatus = data.stream;
            if (streamStatus === undefined){
			//$(".content").prepend("<a href = 'http://twitch.tv'><div class='twitchUser row' id='offline'><img src='http://dishofsoul.com/extfiles/DJIetOL.png' id='offIcon'><div class='col-xs-2' id='logo'><img class='img img-circle' id='image' src='http://dishofsoul.com/extfiles/FJdBSoF.png'></div> <div class='col-xs-4'>" + singleAcct + "</div><div class='truncate'><p>Account Not Found!</p></div></div></a>"); 
            // if account not found, push name to array to append last
      console.log(singleAcct, streamStatus);
                           }else{
// continue with all other accounts
			stat(streamStatus, data);
            }
		});
// determine if offline or online
		function stat(steamStatus, data) {
			var logoraw;
			if (streamStatus == null) {
				status = "Offline";
				addLast(singleAcct, status);
			} else {
				status = "Active";
				logoraw = data.stream.channel.logo;
				logo = logoCheck(logoraw);
				streamName = data.stream.channel.display_name;
				link = "http://www.twitch.tv/" + singleAcct;

				description =
					data.stream.channel.status;
				// Put active accounts in div first
				$(".content").prepend("<a href = '" + link + "'><div class='twitchUser row' id='online'><img src='http://dishofsoul.com/extfiles/zOEHvqO.png' id='offIcon'><div class='col-xs-2' id='logo'><img class='img img-circle' id='image' src='" + logo + "'></div> <div class='col-xs-4'>" + streamName + "</div><div class='truncate'>" + description + "</div></div></a>");


			}

		}

	});
    
//end new function
	function addLast(singleAcct, status) {
		$.getJSON('https://api.twitch.tv/kraken/channels/' + singleAcct + '?callback=?', function (data) {
// next, add offline accounts after online
          
            if (status === "Offline"){
			streamStatus = status;
			var logoraw = data.logo;
			logo = logoCheck(logoraw);
			streamName = data.display_name;
			description =
				data.status;
			link = data.url;

			$(".content").append("<a href = '" + link + "'><div class='twitchUser row' id='offline'><img src='http://dishofsoul.com/extfiles/DJIetOL.png' id='offIcon'><div class='col-xs-2' id='logo'><img class='img img-circle' id='image' src='" + logo + "'></div> <div class='col-xs-4'>" + streamName + "</div><div class='truncate'>" + description + "</div></div></a>");
            }else{
                offline.push(singleAcct);
                console.log(offline);
            }
		});

	}

	// add placeholder logo if null

	function logoCheck(logoraw) {
		if (logoraw !== null) {
			return logoraw;
		} else {
			return "http://dishofsoul.com/extfiles/FJdBSoF.png";
		}

	}

    });
            //finally, add accounts not found last
   
       console.log(offline);