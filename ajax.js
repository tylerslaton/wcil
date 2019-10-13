$(document).ready(function () {
	$.ajax({
		type: "get",
		url: "https://us-central1-hopeful-depot-255718.cloudfunctions.net/posts ",
		beforeSend: function () {
			$("#team").html("Loading...");
		},
		timeout: 10000,
		error: function (xhr, status, error) {
			alert("Error: " + xhr.status + " - " + error);
		},
		dataType: "json",
		success: function (data) {
			console.log(data);
			console.log(data.teammembers[0])
			$("#team").html("");
			$(data.teammembers).each(function () {
				$("#team").append("<h3>" +
					this.name +
					"</h3>" +
					"<p>" +
					this.title +
					"<br>" +
					this.bio +

					"</p>"




				)
			});
		}
	});
});