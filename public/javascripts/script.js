$(function () {
  $("#carousel").rcarousel({
    visible: 1,
    step: 1,
    speed: 1000,
    height: 453,
    width: 1400,
    auto: {enabled: true,direction: "next", interval: 5000}
  })
  $('#projectForm').submit(function (event) {
    console.log('called');
    event.preventDefault();
    $.post("/submit/project", $('#projectForm').serialize());

    document.getElementById("names").value = "";
    document.getElementById("projdescription").value = "";
    document.getElementById("collaborators").value = "";
  })
  $('#ideaForm').submit(function (event) {
    console.log('called');
    event.preventDefault();
    $.post("/submit/idea", $('#ideaForm').serialize());
    document.getElementById("ideas").value = "";
    document.getElementById("ideadescription").value = "";

  })
})