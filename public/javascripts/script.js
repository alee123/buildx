$(function () {
  $("#carousel").rcarousel({
    visible: 1,
    step: 1,
    speed: 400,
    height: 453,
    width: 1400,
    auto: {enabled: true}
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