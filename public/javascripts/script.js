$(function () {
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