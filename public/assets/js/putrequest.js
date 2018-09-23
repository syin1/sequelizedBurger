// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $('.burgerAvailable').on('click', function(event) {
    var id = $(this).attr('id');

    // Send the PUT request.
    $.ajax('/api/burgers/' + id, {
      type: 'PUT',
      data: true
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
