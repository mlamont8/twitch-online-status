var accts = ["freecodecamp", "storbeck", "terakilobyte", "habathcx", "RobotCaleb", "thomasballinger", "noobs2ninjas", "beohoff", "ESL_SC2", "OgamingSC2"];
var status,
	streamStatus,
	logo, streamName, description, link, singleAcct;



$(document).ready(function () {
	accts.forEach(function (singleAcct) {
		$.getJSON('https://api.twitch.tv/kraken/streams/' + singleAcct + '?callback=?', function (data) {
			streamStatus = data.stream;
			stat(streamStatus, data);
		});

		function stat(steamStatus, data) {
			var logoraw;
			if (streamStatus == null) {
				status = "Offline";
				addLast(singleAcct);
			} else {
				status = "Active";
				logoraw = data.stream.channel.logo;
				logo = logoCheck(logoraw);
				streamName = data.stream.channel.display_name;
				link = "http://www.twitch.tv/" + singleAcct;
				console.log(link);
				description =
					data.stream.channel.status;
				// Put active accounts in div first
				$(".content").prepend("<a href = '" + link + "'><div class='twitchUser row' id='online'><img src='http://i.imgur.com/zOEHvqO.png' id='offIcon'><div class='col-xs-2' id='logo'><img class='img img-circle' id='image' src='" + logo + "'></div> <div class='col-xs-4'>" + streamName + "</div><div class='truncate'>" + description + "</div></div></a>");


			}

		}

	});

	function addLast(singleAcct) {
		$.getJSON('https://api.twitch.tv/kraken/channels/' + singleAcct + '?callback=?', function (data) {

			streamStatus = "Offline";
			var logoraw = data.logo;
			logo = logoCheck(logoraw);
			streamName = data.display_name;
			description =
				data.status;
			link = data.url;
			console.log(link);
			$(".content").append("<a href = '" + link + "'><div class='twitchUser row' id='offline'><img src='http://i.imgur.com/DJIetOL.png' id='offIcon'><div class='col-xs-2' id='logo'><img class='img img-circle' id='image' src='" + logo + "'></div> <div class='col-xs-4'>" + streamName + "</div><div class='truncate'>" + description + "</div></div></a>");

		});
	}

	// add placeholder logo if null

	function logoCheck(logoraw) {
		if (logoraw !== null) {
			return logoraw;
		} else {
			return "http://i.imgur.com/FJdBSoF.png";
		}

	}
});