$(function () {
  $('#projectForm').submit(function (event) {
    console.log('called');
    event.preventDefault();
    $.post("/submit/project", $('#projectForm').serialize());

    $('#result').html("<p>Submitted!</p>")

  })
  $('#ideaForm').submit(function (event) {
    console.log('called');
    event.preventDefault();
    $.post("/submit/idea", $('#ideaForm').serialize());

    $('#result').html("<p>Submitted!</p>")

  })
})